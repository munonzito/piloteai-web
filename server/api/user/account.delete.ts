import { firestoreDb, firebaseAuth } from "../../lib/firebase";

export default defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) {
        throw createError({ statusCode: 401, statusMessage: "No autorizado" });
    }

    const batch = firestoreDb.batch();
    batch.delete(firestoreDb.collection("users").doc(user.uid));

    const progressSnapshot = await firestoreDb
        .collection("progress")
        .where("userId", "==", user.uid)
        .get();

    progressSnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });

    await batch.commit();
    await firebaseAuth.deleteUser(user.uid);

    deleteCookie(event, "session");

    return { success: true };
});
