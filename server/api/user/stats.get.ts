import { firestoreDb } from "../../lib/firebase";

export default defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) {
        throw createError({ statusCode: 401, statusMessage: "No autorizado" });
    }

    const [userDoc, progressSnapshot] = await Promise.all([
        firestoreDb.collection("users").doc(user.uid).get(),
        firestoreDb.collection("progress").where("userId", "==", user.uid).get(),
    ]);
    const userData = userDoc.data();

    let lessonsCompleted = 0;
    let totalScore = 0;

    progressSnapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (data.completed) {
            lessonsCompleted++;
            totalScore += data.score || 0;
        }
    });

    return {
        totalXP: userData?.totalXP || 0,
        streak: userData?.streak || 0,
        displayName: userData?.displayName || "Piloto",
        activeLicense: userData?.activeLicense || "ppl",
        lastActivityDate: userData?.lastActivityDate || "",
        onboardingCompleted: userData?.onboardingCompleted || false,
        lessonsCompleted,
        averageScore: lessonsCompleted > 0 ? Math.round(totalScore / lessonsCompleted) : 0,
    };
});
