import {
    licenses,
    getLicenseById,
    getSubjectById,
    getLessonById,
    getTotalLessonsCount,
} from "../../data";
import type { LicenseId, License, Subject, Lesson } from "../../types/lesson";
import type { LicenseProgress, SubjectProgress } from "../../types/progress";

export const useLessonData = () => {
    const { progress, isLessonCompleted } = useProgressState();
    const { profile } = useUserProfile();

    const activeLicenseId = computed<LicenseId>(
        () => profile.value?.activeLicense || "ppl",
    );

    const allLicenses = licenses;

    const activeLicense = computed(() => getLicenseById(activeLicenseId.value));

    const getLicenseProgressData = (licenseId: LicenseId): LicenseProgress => {
        const license = getLicenseById(licenseId);
        if (!license) {
            return { licenseId, totalLessons: 0, completedLessons: 0, totalXP: 0, earnedXP: 0, subjects: [] };
        }

        const completedLessons = Object.values(progress.value).filter(
            (p) => p.licenseId === licenseId && p.completed,
        ).length;

        const totalLessons = getTotalLessonsCount(licenseId);

        const totalXP = license.subjects.reduce(
            (sum, subject) => sum + subject.lessons.reduce((ls, l) => ls + l.xpReward, 0),
            0,
        );

        const earnedXP = Object.values(progress.value)
            .filter((p) => p.licenseId === licenseId && p.completed)
            .reduce((sum, p) => {
                const lesson = getLessonById(p.lessonId);
                return sum + (lesson?.xpReward || 0);
            }, 0);

        const subjects: SubjectProgress[] = license.subjects.map((subject) => {
            const subjectEntries = Object.values(progress.value).filter(
                (p) => p.subjectId === subject.id,
            );
            const completedSubject = subjectEntries.filter((p) => p.completed).length;
            const avgScore =
                subjectEntries.length > 0
                    ? subjectEntries.reduce((s, p) => s + p.score, 0) / subjectEntries.length
                    : 0;

            return {
                subjectId: subject.id,
                totalLessons: subject.lessons.length,
                completedLessons: completedSubject,
                averageScore: avgScore,
            };
        });

        return { licenseId, totalLessons, completedLessons, totalXP, earnedXP, subjects };
    };

    const getSubjectProgressData = (subjectId: string): SubjectProgress => {
        const subject = getSubjectById(subjectId);
        if (!subject) {
            return { subjectId, totalLessons: 0, completedLessons: 0, averageScore: 0 };
        }

        const entries = Object.values(progress.value).filter((p) => p.subjectId === subjectId);
        const completedLessons = entries.filter((p) => p.completed).length;
        const avgScore =
            entries.length > 0
                ? entries.reduce((s, p) => s + p.score, 0) / entries.length
                : 0;

        return { subjectId, totalLessons: subject.lessons.length, completedLessons, averageScore: avgScore };
    };

    const isLessonLocked = (lesson: Lesson, subject: Subject): boolean => {
        const index = subject.lessons.findIndex((l) => l.id === lesson.id);
        if (index === 0) return false;
        const prev = subject.lessons[index - 1];
        return !isLessonCompleted(prev.id);
    };

    const getNextLesson = (licenseId: LicenseId): Lesson | null => {
        const license = getLicenseById(licenseId);
        if (!license) return null;
        for (const subject of license.subjects) {
            for (const lesson of subject.lessons) {
                if (!isLessonCompleted(lesson.id)) {
                    return lesson;
                }
            }
        }
        return null;
    };

    return {
        allLicenses,
        activeLicense,
        activeLicenseId,
        getLicenseById,
        getSubjectById,
        getLessonById,
        getLicenseProgressData,
        getSubjectProgressData,
        isLessonCompleted,
        isLessonLocked,
        getNextLesson,
    };
};
