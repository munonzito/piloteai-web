import { mercadopago } from "~~/server/lib/mercadoPago";
import { Preference } from "mercadopago";
import { createOneTimePayment } from "~~/server/utils/subscriptions";

const ANNUAL_PRICE = 47990;

export default defineEventHandler(async (event) => {
    const { email } = await readBody(event);

    if (!email) {
        throw createError({
            statusCode: 400,
            statusMessage: "Email es requerido",
        });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const preference = new Preference(mercadopago);

    const response = await preference.create({
        body: {
            items: [
                {
                    id: "annual-plan",
                    title: "Piloteai Premium - Plan Anual (12 meses)",
                    quantity: 1,
                    unit_price: ANNUAL_PRICE,
                    currency_id: "CLP",
                },
            ],
            payer: {
                email: normalizedEmail,
            },
            back_urls: {
                success: process.env.APP_URL! + "/pago/exito",
                failure: process.env.APP_URL! + "/pago/error",
                pending: process.env.APP_URL! + "/pago/pendiente",
            },
            auto_return: "approved",
            notification_url: process.env.APP_URL! + "/api/payments/webhook",
            external_reference: normalizedEmail,
        },
    });

    await createOneTimePayment(normalizedEmail, response.id!, ANNUAL_PRICE);

    return { url: response.init_point };
});
