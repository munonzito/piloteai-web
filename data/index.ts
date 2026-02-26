import { pplLicense } from "./licenses/ppl";
import { cplLicense } from "./licenses/cpl";
import { ifrLicense } from "./licenses/ifr";
import { atplLicense } from "./licenses/atpl";
import type { License, Subject, Lesson, LicenseId } from "../types/lesson";

export const licenses: License[] = [pplLicense, cplLicense, ifrLicense, atplLicense];

export const getLicenseById = (id: LicenseId): License | undefined => {
    return licenses.find((license) => license.id === id);
};

export const getSubjectById = (subjectId: string): Subject | undefined => {
    for (const license of licenses) {
        const subject = license.subjects.find((s) => s.id === subjectId);
        if (subject) return subject;
    }
    return undefined;
};

export const getLessonById = (lessonId: string): Lesson | undefined => {
    for (const license of licenses) {
        for (const subject of license.subjects) {
            const lesson = subject.lessons.find((l) => l.id === lessonId);
            if (lesson) return lesson;
        }
    }
    return undefined;
};

export const getAllLessons = (): Lesson[] => {
    const allLessons: Lesson[] = [];
    for (const license of licenses) {
        for (const subject of license.subjects) {
            allLessons.push(...subject.lessons);
        }
    }
    return allLessons;
};

export const getTotalLessonsCount = (licenseId: LicenseId): number => {
    const license = getLicenseById(licenseId);
    if (!license) return 0;
    return license.subjects.reduce((total, subject) => total + subject.lessons.length, 0);
};
