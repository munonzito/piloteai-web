import { firestoreDb } from "../../lib/firebase";
import type { UserProgress } from "../../../types/progress";

export default defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) {
        throw createError({ statusCode: 401, statusMessage: "No autorizado" });
    }

    const snapshot = await firestoreDb
        .collection("progress")
        .where("userId", "==", user.uid)
        .get();

    const progress: Record<string, UserProgress> = {};
    snapshot.docs.forEach((doc) => {
        const data = doc.data();
        progress[data.lessonId] = {
            id: doc.id,
            lessonId: data.lessonId,
            subjectId: data.subjectId,
            licenseId: data.licenseId,
            completed: data.completed,
            score: data.score,
            attempts: data.attempts,
            lastAttemptAt: data.lastAttemptAt?.toDate?.()?.toISOString() || "",
            quizResults: data.quizResults || [],
        };
    });

    return { progress };
});
