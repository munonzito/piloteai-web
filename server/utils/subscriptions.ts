import { firestoreDb } from "~~/server/lib/firebase";

// --- Monthly Subscription (PreApproval) ---

export async function createSubscription(
    email: string,
    preapprovalId: string,
    planPrice: number
) {
    const doc = firestoreDb.collection("subscriptions").doc(preapprovalId);

    await doc.set({
        email: email.toLowerCase().trim(),
        planType: "mensual",
        planPrice,
        preapprovalId,
        createdAt: new Date(),
        status: "pending",
    });
}

export async function updateSubscription(
    preapprovalId: string,
    data: {
        status?: string;
        last_charged_date?: string;
        next_payment_date?: string;
        payer_email?: string;
        hasCompletedFirstPayment?: boolean;
        cancelledAt?: Date;
    }
) {
    const updateData: Record<string, unknown> = {};

    if (data.status !== undefined) updateData.status = data.status;
    if (data.last_charged_date !== undefined) updateData.last_charged_date = data.last_charged_date;
    if (data.next_payment_date !== undefined) updateData.next_payment_date = data.next_payment_date;
    if (data.payer_email !== undefined) updateData.payer_email = data.payer_email.toLowerCase().trim();
    if (data.hasCompletedFirstPayment !== undefined) updateData.hasCompletedFirstPayment = data.hasCompletedFirstPayment;
    if (data.cancelledAt !== undefined) updateData.cancelledAt = data.cancelledAt;

    await firestoreDb.collection("subscriptions").doc(preapprovalId).set(updateData, { merge: true });
}

// --- One-Time Payment (Checkout Pro) ---

export async function createOneTimePayment(
    email: string,
    preferenceId: string,
    planPrice: number
) {
    const doc = firestoreDb.collection("payments").doc(preferenceId);

    await doc.set({
        email: email.toLowerCase().trim(),
        planType: "anual",
        planPrice,
        preferenceId,
        createdAt: new Date(),
        status: "pending",
    });
}

export async function approveOneTimePayment(
    preferenceId: string,
    paymentId: string
) {
    const now = new Date();
    const accessExpiresAt = new Date(now);
    accessExpiresAt.setMonth(accessExpiresAt.getMonth() + 12);

    await firestoreDb.collection("payments").doc(preferenceId).set(
        {
            paymentId,
            status: "approved",
            paidAt: now,
            accessExpiresAt,
        },
        { merge: true }
    );
}

// --- Subscription Details ---

export interface SubscriptionDetails {
    status: "authorized" | "cancelled" | "none"
    planType?: "mensual" | "anual"
    planPrice?: number
    nextPaymentDate?: string
    accessExpiresAt?: string
    cancelledAt?: string
    source: "subscription" | "payment" | "none"
}

export async function getSubscriptionDetailsByEmail(email: string): Promise<SubscriptionDetails> {
    if (!email) return { status: "none", source: "none" }

    const normalizedEmail = email.toLowerCase().trim()

    const subsSnapshot = await firestoreDb
        .collection("subscriptions")
        .where("email", "==", normalizedEmail)
        .get()

    for (const doc of subsSnapshot.docs) {
        const data = doc.data()
        const status = data?.status as string | undefined

        if (status === "authorized") {
            return {
                status: "authorized",
                planType: "mensual",
                planPrice: data.planPrice ?? 9990,
                nextPaymentDate: data.next_payment_date ?? undefined,
                source: "subscription",
            }
        }

        if (status === "cancelled") {
            const lastCharged = data?.last_charged_date as string | undefined
            const planType = data?.planType as string | undefined
            const cancelledAt = data?.cancelledAt

            let accessUntil: string | undefined

            if (lastCharged && planType) {
                const lastChargedDate = new Date(lastCharged)
                const planDuration = 30 * 24 * 60 * 60 * 1000
                const accessExpiryDate = new Date(lastChargedDate.getTime() + planDuration)
                if (accessExpiryDate > new Date()) {
                    accessUntil = accessExpiryDate.toISOString()
                }
            }

            if (!accessUntil && !lastCharged && data?.hasCompletedFirstPayment === true) {
                const nextPayment = data?.next_payment_date as string | undefined
                if (nextPayment) {
                    const nextPaymentDate = new Date(nextPayment)
                    if (nextPaymentDate > new Date()) {
                        accessUntil = nextPaymentDate.toISOString()
                    }
                }
            }

            return {
                status: accessUntil ? "authorized" : "cancelled",
                planType: "mensual",
                planPrice: data.planPrice ?? 9990,
                accessExpiresAt: accessUntil,
                cancelledAt: cancelledAt?.toDate ? cancelledAt.toDate().toISOString() : cancelledAt?.toISOString?.() ?? undefined,
                source: "subscription",
            }
        }
    }

    const paymentsSnapshot = await firestoreDb
        .collection("payments")
        .where("email", "==", normalizedEmail)
        .get()

    for (const doc of paymentsSnapshot.docs) {
        const data = doc.data()

        if (data?.status === "approved" && data?.accessExpiresAt) {
            const expiresAt = data.accessExpiresAt.toDate
                ? data.accessExpiresAt.toDate()
                : new Date(data.accessExpiresAt)

            return {
                status: expiresAt > new Date() ? "authorized" : "none",
                planType: "anual",
                planPrice: data.planPrice ?? 47990,
                accessExpiresAt: expiresAt.toISOString(),
                source: "payment",
            }
        }
    }

    return { status: "none", source: "none" }
}

// --- Unified Status Check ---

const PLAN_DURATION_MS: Record<string, number> = {
    mensual: 30 * 24 * 60 * 60 * 1000,
};

export async function getSubscriptionStatusByEmail(email: string): Promise<string | null> {
    if (!email) return null;

    const normalizedEmail = email.toLowerCase().trim();

    const subsSnapshot = await firestoreDb
        .collection("subscriptions")
        .where("email", "==", normalizedEmail)
        .get();

    for (const doc of subsSnapshot.docs) {
        const data = doc.data();
        const status = data?.status as string | undefined;

        if (status === "authorized") {
            return "authorized";
        }

        if (status === "cancelled") {
            const lastCharged = data?.last_charged_date as string | undefined;
            const planType = data?.planType as string | undefined;

            if (lastCharged && planType) {
                const lastChargedDate = new Date(lastCharged);
                const planDuration = PLAN_DURATION_MS[planType];
                if (planDuration) {
                    const accessExpiryDate = new Date(lastChargedDate.getTime() + planDuration);
                    if (accessExpiryDate > new Date()) {
                        return "authorized";
                    }
                }
            }

            if (!lastCharged && data?.hasCompletedFirstPayment === true) {
                const nextPayment = data?.next_payment_date as string | undefined;
                if (nextPayment) {
                    const nextPaymentDate = new Date(nextPayment);
                    if (nextPaymentDate > new Date()) {
                        return "authorized";
                    }
                }
            }
        }
    }

    const paymentsSnapshot = await firestoreDb
        .collection("payments")
        .where("email", "==", normalizedEmail)
        .get();

    for (const doc of paymentsSnapshot.docs) {
        const data = doc.data();

        if (data?.status === "approved" && data?.accessExpiresAt) {
            const expiresAt = data.accessExpiresAt.toDate
                ? data.accessExpiresAt.toDate()
                : new Date(data.accessExpiresAt);

            if (expiresAt > new Date()) {
                return "authorized";
            }
        }
    }

    if (!subsSnapshot.empty) {
        for (const doc of subsSnapshot.docs) {
            if (doc.data()?.status === "cancelled") {
                return "cancelled";
            }
        }
    }

    return null;
}
