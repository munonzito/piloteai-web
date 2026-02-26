import { mercadopago } from "~~/server/lib/mercadoPago";
import { PreApproval } from "mercadopago";
import { createSubscription } from "~~/server/utils/subscriptions";

const PLAN_CONFIG = {
    frequency: 1,
    frequency_type: "months" as const,
    transaction_amount: 9990,
    currency_id: "CLP",
};

export default defineEventHandler(async (event) => {
    const { email } = await readBody(event);

    if (!email) {
        throw createError({
            statusCode: 400,
            statusMessage: "Email es requerido",
        });
    }

    const normalizedEmail = email.toLowerCase().trim();

    try {
        const preApproval = new PreApproval(mercadopago);

        const response = await preApproval.create({
            body: {
                back_url: process.env.APP_URL! + "/pago/exito",
                reason: "Piloteai Premium - Plan Mensual",
                auto_recurring: PLAN_CONFIG,
                payer_email: normalizedEmail,
                status: "pending",
            },
        });

        await createSubscription(normalizedEmail, response.id!, PLAN_CONFIG.transaction_amount);

        return { url: response.init_point };
    } catch (err: any) {
        console.error("[create-subscription] Error:", err?.message || err, err?.cause || "");
        throw createError({
            statusCode: err?.status || 500,
            statusMessage: err?.message || "Error creating subscription",
        });
    }
});
