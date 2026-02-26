import { firestoreDb } from "../../lib/firebase";

export default defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) {
        throw createError({ statusCode: 401, statusMessage: "No autorizado" });
    }

    const body = await readBody(event);
    const { displayName, activeLicense } = body as { displayName: string; activeLicense: string };

    if (!displayName || displayName.trim().length < 2 || displayName.trim().length > 80) {
        throw createError({ statusCode: 400, statusMessage: "El nombre debe tener entre 2 y 80 caracteres" });
    }

    const validLicenses = ["ppl", "cpl", "ifr", "atpl"];
    if (!activeLicense || !validLicenses.includes(activeLicense)) {
        throw createError({ statusCode: 400, statusMessage: "Licencia inválida" });
    }

    await firestoreDb.collection("users").doc(user.uid).set(
        {
            displayName: displayName.trim(),
            activeLicense,
            onboardingCompleted: true,
            totalXP: 0,
            streak: 0,
            lastActivityDate: "",
        },
        { merge: true },
    );

    return { success: true };
});
