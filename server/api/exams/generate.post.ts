import { firestoreDb } from "../../lib/firebase";
import type { ExamQuestion } from "../../../types/exam";

export default defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) {
        throw createError({ statusCode: 401, statusMessage: "No autorizado" });
    }

    const body = await readBody(event);
    const { license, theme, questionCount } = body as {
        license: string;
        theme?: string | null;
        questionCount: number;
    };

    if (!license || !questionCount || questionCount < 1 || questionCount > 100) {
        throw createError({ statusCode: 400, statusMessage: "Parámetros inválidos" });
    }

    let query: FirebaseFirestore.Query = firestoreDb
        .collection("questions")
        .where("license", "==", license);

    if (theme) {
        query = query.where("theme", "==", theme);
    }

    const snapshot = await query.get();

    if (snapshot.empty) {
        throw createError({ statusCode: 404, statusMessage: "No se encontraron preguntas" });
    }

    const allQuestions: ExamQuestion[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        question: doc.data().question,
        options: doc.data().options,
        license: doc.data().license,
        theme: doc.data().theme,
        originalNumber: doc.data().originalNumber,
        correctAnswer: doc.data().correctAnswer,
        explanation: doc.data().explanation,
    }));

    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    return { questions: selected };
});
