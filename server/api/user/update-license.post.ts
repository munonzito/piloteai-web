import { firestoreDb } from "../../lib/firebase";

export default defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) {
        throw createError({ statusCode: 401, statusMessage: "No autorizado" });
    }

    const body = await readBody(event);
    const { licenseId } = body as { licenseId: string };

    const validLicenses = ["ppl", "cpl", "ifr", "atpl"];
    if (!licenseId || !validLicenses.includes(licenseId)) {
        throw createError({ statusCode: 400, statusMessage: "Licencia inválida" });
    }

    await firestoreDb.collection("users").doc(user.uid).update({
        activeLicense: licenseId,
    });

    return { success: true };
});
