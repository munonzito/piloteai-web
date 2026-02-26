import { firestoreDb } from "../../lib/firebase";

export default defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) {
        throw createError({ statusCode: 401, statusMessage: "No autorizado" });
    }

    const snapshot = await firestoreDb.collection("licenses").get();

    const licenses = snapshot.docs.map((doc) => ({
        name: doc.data().name as string,
        slug: doc.data().slug as string,
        totalQuestions: doc.data().totalQuestions as number,
        themes: (doc.data().themes || []) as string[],
    }));

    return { licenses };
});
