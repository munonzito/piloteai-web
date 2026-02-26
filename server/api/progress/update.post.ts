import { firestoreDb } from "../../lib/firebase";
import { FieldValue } from "firebase-admin/firestore";

export default defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) {
        throw createError({ statusCode: 401, statusMessage: "No autorizado" });
    }

    const body = await readBody(event);
    const { lessonId, subjectId, licenseId, score, completed, quizResults } = body as {
        lessonId: string;
        subjectId: string;
        licenseId: string;
        score: number;
        completed: boolean;
        quizResults: Array<{
            questionId: string;
            correct: boolean;
            selectedOptionId: string;
            timeSpentMs: number;
        }>;
    };

    if (!lessonId || !subjectId || !licenseId) {
        throw createError({ statusCode: 400, statusMessage: "Parámetros inválidos" });
    }

    const progressRef = firestoreDb.collection("progress").doc(`${user.uid}_${lessonId}`);
    const progressDoc = await progressRef.get();
    const now = FieldValue.serverTimestamp();

    if (progressDoc.exists) {
        const existing = progressDoc.data()!;
        await progressRef.update({
            score: Math.max(existing.score || 0, score),
            completed: completed || existing.completed,
            attempts: (existing.attempts || 0) + 1,
            lastAttemptAt: now,
            quizResults,
        });
    } else {
        await progressRef.set({
            id: `${user.uid}_${lessonId}`,
            userId: user.uid,
            lessonId,
            subjectId,
            licenseId,
            score,
            completed,
            attempts: 1,
            lastAttemptAt: now,
            quizResults,
        });
    }

    let xpEarned = 0;
    let newStreak = 0;

    if (completed) {
        const userRef = firestoreDb.collection("users").doc(user.uid);
        const userDoc = await userRef.get();
        const userData = userDoc.data();

        if (userData) {
            const today = new Date().toISOString().split("T")[0];
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split("T")[0];

            newStreak = userData.streak || 0;
            if (userData.lastActivityDate === yesterdayStr) {
                newStreak += 1;
            } else if (userData.lastActivityDate !== today) {
                newStreak = 1;
            }

            xpEarned = Math.round((score / 100) * 50);

            await userRef.update({
                totalXP: (userData.totalXP || 0) + xpEarned,
                streak: newStreak,
                lastActivityDate: today,
                lastLoginAt: now,
            });
        }
    }

    return { xpEarned, newStreak };
});
