import { sendSignInLinkEmail } from "~~/server/utils/authEmail";
import { getSubscriptionStatusByEmail } from "~~/server/utils/subscriptions";

export default defineEventHandler(async (event) => {
    const { email } = await readBody(event);

    if (!email) {
        throw createError({
            statusCode: 400,
            statusMessage: "Email es requerido",
        });
    }

    const status = await getSubscriptionStatusByEmail(email);

    if (status !== "authorized") {
        throw createError({
            statusCode: 403,
            statusMessage: "No tienes una suscripción activa",
        });
    }

    try {
        const result = await sendSignInLinkEmail({ email });
        return result;
    } catch (error) {
        console.error("Error enviando email:", error);
        throw createError({
            statusCode: 500,
            statusMessage: "Error al enviar el enlace de acceso",
        });
    }
});
