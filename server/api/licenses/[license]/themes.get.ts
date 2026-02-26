import { firestoreDb } from "../../../lib/firebase";

export default defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) {
        throw createError({ statusCode: 401, statusMessage: "No autorizado" });
    }

    const license = getRouterParam(event, "license");
    if (!license) {
        throw createError({ statusCode: 400, statusMessage: "Licencia requerida" });
    }

    const snapshot = await firestoreDb
        .collection("themes")
        .where("license", "==", decodeURIComponent(license))
        .get();

    const themes = snapshot.docs.map((doc) => ({
        name: doc.data().name as string,
        slug: doc.data().slug as string,
        questionCount: doc.data().questionCount as number,
    }));

    return { themes };
});
