import type { LicenseId } from "./lesson";

export interface UserProgress {
    id: string;
    lessonId: string;
    subjectId: string;
    licenseId: LicenseId;
    completed: boolean;
    score: number;
    attempts: number;
    lastAttemptAt: string;
    quizResults: QuizResult[];
}

export interface QuizResult {
    questionId: string;
    correct: boolean;
    selectedOptionId: string;
    timeSpentMs: number;
}

export interface LicenseProgress {
    licenseId: LicenseId;
    totalLessons: number;
    completedLessons: number;
    totalXP: number;
    earnedXP: number;
    subjects: SubjectProgress[];
}

export interface SubjectProgress {
    subjectId: string;
    totalLessons: number;
    completedLessons: number;
    averageScore: number;
}

export interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    activeLicense: LicenseId;
    onboardingCompleted: boolean;
    streak: number;
    lastActivityDate: string;
    totalXP: number;
    lessonsCompleted: number;
}
