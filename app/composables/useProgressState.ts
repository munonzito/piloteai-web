import type { UserProgress, QuizResult } from "../../types/progress";

export const useProgressState = () => {
    const progress = useState<Record<string, UserProgress>>("lessonProgress", () => ({}));
    const loading = useState("progressLoading", () => false);

    const fetchProgress = async () => {
        loading.value = true;
        try {
            const data = await $fetch("/api/progress");
            progress.value = data.progress;
        } catch {
            progress.value = {};
        } finally {
            loading.value = false;
        }
    };

    const getProgress = (lessonId: string): UserProgress | undefined => {
        return progress.value[lessonId];
    };

    const isLessonCompleted = (lessonId: string): boolean => {
        return progress.value[lessonId]?.completed ?? false;
    };

    const completeLesson = async (params: {
        lessonId: string;
        subjectId: string;
        licenseId: string;
        score: number;
        completed: boolean;
        quizResults: QuizResult[];
    }) => {
        const result = await $fetch("/api/progress/update", {
            method: "POST",
            body: params,
        });

        progress.value = {
            ...progress.value,
            [params.lessonId]: {
                id: `${params.lessonId}`,
                lessonId: params.lessonId,
                subjectId: params.subjectId,
                licenseId: params.licenseId as any,
                completed: params.completed,
                score: params.score,
                attempts: (progress.value[params.lessonId]?.attempts || 0) + 1,
                lastAttemptAt: new Date().toISOString(),
                quizResults: params.quizResults,
            },
        };

        return result;
    };

    return {
        progress,
        loading,
        fetchProgress,
        getProgress,
        isLessonCompleted,
        completeLesson,
    };
};
