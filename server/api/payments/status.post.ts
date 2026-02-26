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

    return { status };
});
