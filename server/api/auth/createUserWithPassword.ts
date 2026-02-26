import { firebaseAuth } from "~~/server/lib/firebase";
import { getSubscriptionStatusByEmail } from "~~/server/utils/subscriptions";

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event);

    if (!email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: "Email y contraseña son requeridos",
        });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (password.length < 6) {
        throw createError({
            statusCode: 400,
            statusMessage: "La contraseña debe tener al menos 6 caracteres",
        });
    }

    const subscriptionStatus = await getSubscriptionStatusByEmail(normalizedEmail);

    if (subscriptionStatus !== "authorized") {
        throw createError({
            statusCode: 403,
            statusMessage: "No tienes una suscripción activa",
        });
    }

    try {
        let existingUser;
        try {
            existingUser = await firebaseAuth.getUserByEmail(normalizedEmail);
        } catch (err: any) {
            if (err.code !== "auth/user-not-found") throw err;
        }

        if (existingUser) {
            const hasActualPassword = !!existingUser.passwordHash;

            if (hasActualPassword) {
                return {
                    success: false,
                    exists: true,
                    hasPassword: true,
                    message: "Ya tienes una contraseña configurada. Usa 'Recuperar contraseña' para cambiarla",
                };
            }

            const updatedUser = await firebaseAuth.updateUser(existingUser.uid, { password });

            return {
                success: true,
                exists: true,
                updated: true,
                uid: updatedUser.uid,
                email: normalizedEmail,
                message: "Contraseña agregada exitosamente",
            };
        }

        const userRecord = await firebaseAuth.createUser({
            email: normalizedEmail,
            password,
            emailVerified: true,
        });

        return {
            success: true,
            exists: false,
            uid: userRecord.uid,
            email: normalizedEmail,
        };
    } catch (error: any) {
        if (error.code === "auth/email-already-exists") {
            return {
                success: false,
                exists: true,
                message: "Usuario ya está registrado, por favor inicia sesión",
            };
        }

        if (error.code === "auth/invalid-email") {
            throw createError({ statusCode: 400, statusMessage: "Email inválido" });
        }

        if (error.code === "auth/weak-password") {
            throw createError({ statusCode: 400, statusMessage: "Contraseña muy débil" });
        }

        throw createError({
            statusCode: 500,
            statusMessage: "Error al crear usuario. Por favor, intenta de nuevo.",
        });
    }
});
