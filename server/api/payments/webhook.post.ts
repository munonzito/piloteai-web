import { mercadopago } from "~~/server/lib/mercadoPago";
import { Payment, PreApproval } from "mercadopago";
import { validateWebhook } from "~~/server/utils/webhook";
import { updateSubscription, approveOneTimePayment } from "~~/server/utils/subscriptions";
import { firestoreDb } from "~~/server/lib/firebase";
import { sendSignInLinkEmail } from "~~/server/utils/authEmail";

export default defineEventHandler(async (event) => {
    const isValid = await validateWebhook(event);

    if (!isValid) {
        throw createError({
            statusCode: 401,
            statusMessage: "Invalid signature",
        });
    }

    const query = getQuery(event);
    const id = query["data.id"] as string;
    const type = query["type"] as string;

    // Monthly subscription status updates
    if (type === "subscription_preapproval") {
        const preApproval = new PreApproval(mercadopago);
        const response = await preApproval.get({ id });

        const subDocBefore = await firestoreDb.collection("subscriptions").doc(id).get();
        const previousStatus = subDocBefore.exists ? subDocBefore.data()?.status : null;

        await updateSubscription(id, {
            status: response.status ?? undefined,
            last_charged_date: response.summarized?.last_charged_date ?? undefined,
            next_payment_date: response.next_payment_date ?? undefined,
            payer_email: response.payer_email ?? undefined,
            hasCompletedFirstPayment: response.status === "authorized" ? true : undefined,
        });

        // Send magic link email on first authorization
        if (response.status === "authorized" && previousStatus !== "authorized") {
            try {
                const subData = subDocBefore.data();
                const subscriptionEmail = subData?.email;
                if (subscriptionEmail) {
                    await sendSignInLinkEmail({
                        email: subscriptionEmail,
                        isSubscriptionConfirmation: true,
                    });
                    console.log(`[webhook] Correo de acceso enviado a: ${subscriptionEmail}`);
                }
            } catch (emailErr) {
                console.error("[webhook] Error enviando correo de acceso:", emailErr);
            }
        }

        return { message: "Subscription updated" };
    }

    // Monthly subscription payment records
    if (type === "subscription_authorized_payment") {
        try {
            const payment = new Payment(mercadopago);
            const paymentData = await payment.get({ id });

            const preapprovalId =
                (paymentData.metadata as Record<string, string>)?.preapproval_id ||
                (paymentData as Record<string, any>).point_of_interaction?.transaction_data?.subscription_id;

            if (preapprovalId) {
                await firestoreDb
                    .collection("subscriptions")
                    .doc(preapprovalId)
                    .collection("payments")
                    .doc(id)
                    .set({
                        paymentId: id,
                        amount: paymentData.transaction_amount ?? null,
                        currency: paymentData.currency_id ?? null,
                        status: paymentData.status ?? null,
                        dateCreated: paymentData.date_created ?? null,
                        dateApproved: paymentData.date_approved ?? null,
                    });
            }
        } catch (err) {
            console.error(`[webhook] Error recording subscription payment ${id}:`, err);
        }

        return { message: "Payment recorded" };
    }

    // One-time payment (semestral plan via Checkout Pro)
    if (type === "payment") {
        try {
            const payment = new Payment(mercadopago);
            const paymentData = await payment.get({ id });

            if (paymentData.status === "approved") {
                const externalReference = paymentData.external_reference;

                if (externalReference) {
                    const snapshot = await firestoreDb
                        .collection("payments")
                        .where("email", "==", externalReference)
                        .where("status", "==", "pending")
                        .limit(1)
                        .get();

                    if (!snapshot.empty && snapshot.docs[0]) {
                        await approveOneTimePayment(snapshot.docs[0].id, id);

                        try {
                            await sendSignInLinkEmail({
                                email: externalReference,
                                isSubscriptionConfirmation: true,
                            });
                            console.log(`[webhook] Correo de acceso enviado a: ${externalReference}`);
                        } catch (emailErr) {
                            console.error("[webhook] Error enviando correo de acceso:", emailErr);
                        }
                    }
                }
            }
        } catch (err) {
            console.error(`[webhook] Error processing one-time payment ${id}:`, err);
        }

        return { message: "Payment processed" };
    }

    return { message: "Webhook received" };
});
