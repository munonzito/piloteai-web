import { mercadopago } from "~~/server/lib/mercadoPago";
import { PreApproval } from "mercadopago";
import { updateSubscription } from "~~/server/utils/subscriptions";
import { firestoreDb } from "~~/server/lib/firebase";

export default defineEventHandler(async (event) => {
    const { preapprovalId, preferenceId, collectionStatus, externalReference } = await readBody(event);

    // Monthly subscription confirmation
    if (preapprovalId) {
        try {
            const preApproval = new PreApproval(mercadopago);
            const response = await preApproval.get({ id: preapprovalId });

            await updateSubscription(preapprovalId, {
                status: response.status ?? undefined,
                last_charged_date: response.summarized?.last_charged_date ?? undefined,
                next_payment_date: response.next_payment_date ?? undefined,
                payer_email: response.payer_email ?? undefined,
                hasCompletedFirstPayment: response.status === "authorized" ? true : undefined,
            });

            const subDoc = await firestoreDb.collection("subscriptions").doc(preapprovalId).get();
            const subData = subDoc.data();

            return {
                status: response.status ?? "unknown",
                email: subData?.email || response.payer_email || "",
                planPrice: subData?.planPrice || 0,
            };
        } catch (error) {
            console.error("[confirm] Error confirming subscription:", error);
            throw createError({
                statusCode: 500,
                statusMessage: "Error al confirmar la suscripción",
            });
        }
    }

    // One-time payment confirmation (semestral via Checkout Pro)
    if (preferenceId) {
        try {
            const paymentDoc = await firestoreDb.collection("payments").doc(preferenceId).get();
            const paymentData = paymentDoc.data();

            if (paymentData) {
                const status = paymentData.status === "approved"
                    ? "approved"
                    : collectionStatus === "approved" ? "approved" : paymentData.status || "pending";

                return {
                    status,
                    email: paymentData.email || externalReference || "",
                    planPrice: paymentData.planPrice || 0,
                };
            }

            if (collectionStatus === "approved" && externalReference) {
                return {
                    status: "approved",
                    email: externalReference,
                    planPrice: 47990,
                };
            }

            throw createError({ statusCode: 404, statusMessage: "Pago no encontrado" });
        } catch (error: any) {
            if (error.statusCode) throw error;
            console.error("[confirm] Error confirming payment:", error);
            throw createError({
                statusCode: 500,
                statusMessage: "Error al confirmar el pago",
            });
        }
    }

    throw createError({
        statusCode: 400,
        statusMessage: "Se requiere preapprovalId o preferenceId",
    });
});
