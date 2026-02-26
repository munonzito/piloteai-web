import { sendPasswordRecoveryEmail } from "~~/server/utils/passwordRecoveryEmail";
import { getSubscriptionStatusByEmail } from "~~/server/utils/subscriptions";

export default defineEventHandler(async (event) => {
    const { email } = await readBody(event);

    if (!email) {
        throw createError({
            statusCode: 400,
            statusMessage: "El correo electrónico es requerido",
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw createError({
            statusCode: 400,
            statusMessage: "El formato del correo electrónico no es válido",
        });
    }

    const status = await getSubscriptionStatusByEmail(email);

    if (status !== "authorized") {
        throw createError({
            statusCode: 403,
            statusMessage: "No tienes una suscripción activa para realizar esta acción.",
        });
    }

    try {
        const result = await sendPasswordRecoveryEmail({ email });
        return { success: true, message: result.message };
    } catch (error: any) {
        if (error.statusCode) throw error;

        throw createError({
            statusCode: 500,
            statusMessage: "Error al enviar el correo de recuperación.",
        });
    }
});
