export type LicenseId = "ppl" | "cpl" | "ifr" | "atpl";

export interface License {
    id: LicenseId;
    name: string;
    fullName: string;
    description: string;
    icon: string;
    color: string;
    subjects: Subject[];
    requiredLicenses: LicenseId[];
    order: number;
}

export interface Subject {
    id: string;
    licenseId: LicenseId;
    name: string;
    description: string;
    icon: string;
    lessons: Lesson[];
    order: number;
}

export interface Lesson {
    id: string;
    subjectId: string;
    title: string;
    description: string;
    estimatedMinutes: number;
    xpReward: number;
    steps: LessonStep[];
    order: number;
}

export type LessonStep = LessonContentStep | QuizStep | InteractiveStep;

export interface LessonContentStep {
    type: "lesson";
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
}

export interface QuizStep {
    type: "quiz";
    id: string;
    question: string;
    imageUrl?: string;
    options: QuizOption[];
    correctOptionId: string;
    explanation: string;
}

export interface QuizOption {
    id: string;
    text: string;
}

export interface InteractiveStep {
    type: "interactive";
    id: string;
    title: string;
    componentType: "calculator" | "map" | "diagram" | "slider";
    config: Record<string, any>;
}
