export interface ExamQuestion {
    id: string;
    question: string;
    options: Record<string, string>;
    license: string;
    theme: string;
    originalNumber?: number;
    correctAnswer?: string;
    explanation?: string;
}

export interface ExamPreset {
    id: string;
    name: string;
    description: string;
    questionCount: number;
    timeMinutes: number;
    icon: string;
}

export interface ExamConfig {
    preset: ExamPreset;
    license: string;
    theme: string | null;
}

export interface ExamAnswer {
    questionId: string;
    selectedOption: string;
    timeSpentMs: number;
}

export interface ExamSession {
    id: string;
    config: ExamConfig;
    questions: ExamQuestion[];
    answers: ExamAnswer[];
    startedAt: string;
    finishedAt?: string;
    currentQuestionIndex: number;
    timeRemainingSeconds: number;
}

export interface ExamResult {
    examId: string;
    totalQuestions: number;
    answeredQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    omittedAnswers: number;
    score: number;
    timeTakenSeconds: number;
    license: string;
    theme: string | null;
    completedAt: string;
}

export const EXAM_PRESETS: ExamPreset[] = [
    {
        id: "complete",
        name: "Examen Completo",
        description: "Simula el examen real DGAC",
        questionCount: 50,
        timeMinutes: 90,
        icon: "🏆",
    },
    {
        id: "medium",
        name: "Examen Medio",
        description: "Practica con tiempo moderado",
        questionCount: 25,
        timeMinutes: 45,
        icon: "🎯",
    },
    {
        id: "quick",
        name: "Examen Rápido",
        description: "Repaso rápido de conocimientos",
        questionCount: 10,
        timeMinutes: 15,
        icon: "⚡",
    },
];
