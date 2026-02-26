import type {
    ExamSession,
    ExamConfig,
    ExamQuestion,
    ExamAnswer,
    ExamResult,
} from "../../types/exam";

export const useExamState = () => {
    const currentExam = useState<ExamSession | null>("currentExam", () => null);
    const examHistory = useState<ExamResult[]>("examHistory", () => []);
    const examLoading = useState("examLoading", () => false);
    const examError = useState<string | null>("examError", () => null);

    const generateAndStartExam = async (config: ExamConfig) => {
        examLoading.value = true;
        examError.value = null;
        try {
            const data = await $fetch("/api/exams/generate", {
                method: "POST",
                body: {
                    license: config.license,
                    theme: config.theme,
                    questionCount: config.preset.questionCount,
                },
            });

            if (data.questions.length === 0) {
                throw new Error("No se encontraron preguntas");
            }

            currentExam.value = {
                id: `exam_${Date.now()}`,
                config,
                questions: data.questions,
                answers: [],
                startedAt: new Date().toISOString(),
                currentQuestionIndex: 0,
                timeRemainingSeconds: config.preset.timeMinutes * 60,
            };

            return true;
        } catch (err: any) {
            examError.value = err.data?.message || err.message || "Error al generar el examen";
            return false;
        } finally {
            examLoading.value = false;
        }
    };

    const answerQuestion = (answer: ExamAnswer) => {
        if (!currentExam.value) return;

        const existing = currentExam.value.answers.findIndex(
            (a) => a.questionId === answer.questionId,
        );

        const updatedAnswers = [...currentExam.value.answers];
        if (existing >= 0) {
            updatedAnswers[existing] = answer;
        } else {
            updatedAnswers.push(answer);
        }

        currentExam.value = {
            ...currentExam.value,
            answers: updatedAnswers,
        };
    };

    const goToQuestion = (index: number) => {
        if (!currentExam.value) return;
        const valid = Math.max(0, Math.min(index, currentExam.value.questions.length - 1));
        currentExam.value = { ...currentExam.value, currentQuestionIndex: valid };
    };

    const nextQuestion = () => {
        if (!currentExam.value) return;
        goToQuestion(currentExam.value.currentQuestionIndex + 1);
    };

    const previousQuestion = () => {
        if (!currentExam.value) return;
        goToQuestion(currentExam.value.currentQuestionIndex - 1);
    };

    const updateTimeRemaining = (seconds: number) => {
        if (!currentExam.value) return;
        currentExam.value = {
            ...currentExam.value,
            timeRemainingSeconds: Math.max(0, seconds),
        };
    };

    const finishExam = (): ExamResult | null => {
        if (!currentExam.value) return null;

        const exam = currentExam.value;
        const timeTaken = exam.config.preset.timeMinutes * 60 - exam.timeRemainingSeconds;

        let correctAnswers = 0;
        let incorrectAnswers = 0;
        let omittedAnswers = 0;

        exam.questions.forEach((q) => {
            const answer = exam.answers.find((a) => a.questionId === q.id);
            if (!answer) {
                omittedAnswers++;
            } else if (q.correctAnswer && answer.selectedOption === q.correctAnswer) {
                correctAnswers++;
            } else {
                incorrectAnswers++;
            }
        });

        const score =
            exam.questions.length > 0
                ? Math.round((correctAnswers / exam.questions.length) * 100)
                : 0;

        const result: ExamResult = {
            examId: exam.id,
            totalQuestions: exam.questions.length,
            answeredQuestions: exam.answers.length,
            correctAnswers,
            incorrectAnswers,
            omittedAnswers,
            score,
            timeTakenSeconds: timeTaken,
            license: exam.config.license,
            theme: exam.config.theme,
            completedAt: new Date().toISOString(),
        };

        currentExam.value = { ...exam, finishedAt: new Date().toISOString() };
        examHistory.value = [result, ...examHistory.value].slice(0, 50);

        return result;
    };

    const clearExam = () => {
        currentExam.value = null;
        examError.value = null;
    };

    const getCurrentQuestion = () => {
        if (!currentExam.value) return null;
        return currentExam.value.questions[currentExam.value.currentQuestionIndex];
    };

    const getAnswerForQuestion = (questionId: string) => {
        if (!currentExam.value) return null;
        return currentExam.value.answers.find((a) => a.questionId === questionId) || null;
    };

    const getProgress = () => {
        if (!currentExam.value) return { answered: 0, total: 0, percentage: 0 };
        const answered = currentExam.value.answers.length;
        const total = currentExam.value.questions.length;
        return { answered, total, percentage: total > 0 ? Math.round((answered / total) * 100) : 0 };
    };

    const getExamResults = () => {
        if (!currentExam.value) return null;

        let correctAnswers = 0;
        let incorrectAnswers = 0;
        let omittedAnswers = 0;

        currentExam.value.questions.forEach((q) => {
            const answer = currentExam.value!.answers.find((a) => a.questionId === q.id);
            if (!answer) {
                omittedAnswers++;
            } else if (q.correctAnswer && answer.selectedOption === q.correctAnswer) {
                correctAnswers++;
            } else {
                incorrectAnswers++;
            }
        });

        const score =
            currentExam.value.questions.length > 0
                ? Math.round((correctAnswers / currentExam.value.questions.length) * 100)
                : 0;

        return {
            correctAnswers,
            incorrectAnswers,
            omittedAnswers,
            score,
            total: currentExam.value.questions.length,
        };
    };

    return {
        currentExam,
        examHistory,
        examLoading,
        examError,
        generateAndStartExam,
        answerQuestion,
        goToQuestion,
        nextQuestion,
        previousQuestion,
        updateTimeRemaining,
        finishExam,
        clearExam,
        getCurrentQuestion,
        getAnswerForQuestion,
        getProgress,
        getExamResults,
    };
};
