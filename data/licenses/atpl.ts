import type { License, Subject, Lesson } from "../../types/lesson";

const operacionesLinea: Lesson[] = [
    {
        id: "atpl-ops-1",
        subjectId: "atpl-operaciones",
        title: "Introducción a las Operaciones de Línea Aérea",
        description: "Conoce el mundo de las aerolíneas comerciales",
        estimatedMinutes: 15,
        xpReward: 100,
        order: 1,
        steps: [
            {
                type: "lesson",
                id: "atpl-ops-1-step-1",
                title: "El Rol del ATPL",
                content: `# Piloto de Transporte de Línea Aérea

## ¿Qué es el ATPL?

El **ATPL** (Airline Transport Pilot License) es:
- La licencia más alta para pilotos
- Requerida para ser Capitán en aerolíneas
- El "doctorado" de la aviación

## Requisitos Principales

- **Licencia CPL** vigente
- **Habilitación IFR**
- **1500 horas** de vuelo total mínimo
- Certificación Médica Clase 1

## Privilegios

Con el ATPL puedes:
- Actuar como Piloto al Mando (PIC) en cualquier aeronave
- Ser Capitán de aerolíneas
- Transportar pasajeros y carga comercialmente

## Responsabilidades

El Capitán tiene:
- Autoridad final sobre la operación
- Responsabilidad por seguridad
- Toma de decisiones críticas

> "El Capitán es la última autoridad en la aeronave."`,
            },
            {
                type: "quiz",
                id: "atpl-ops-1-quiz-1",
                question: "¿Cuántas horas de vuelo mínimas se requieren para el ATPL?",
                options: [
                    { id: "a", text: "500 horas" },
                    { id: "b", text: "1000 horas" },
                    { id: "c", text: "1500 horas" },
                    { id: "d", text: "2000 horas" },
                ],
                correctOptionId: "c",
                explanation: "Se requieren un mínimo de 1500 horas de vuelo total para obtener la Licencia de Piloto de Transporte de Línea Aérea (ATPL).",
            },
        ],
    },
];

const atplSubjects: Subject[] = [
    {
        id: "atpl-operaciones",
        licenseId: "atpl",
        name: "Operaciones de Línea Aérea",
        description: "MEL, CDL, despacho y operaciones ETOPS",
        icon: "🏢",
        lessons: operacionesLinea,
        order: 1,
    },
    {
        id: "atpl-sistemas",
        licenseId: "atpl",
        name: "Sistemas de Aeronaves de Transporte",
        description: "FMS, EFIS, autopilot y sistemas complejos",
        icon: "🖥️",
        lessons: [],
        order: 2,
    },
    {
        id: "atpl-performance",
        licenseId: "atpl",
        name: "Performance de Transporte",
        description: "V-speeds, runway analysis y limitaciones de certificación",
        icon: "📐",
        lessons: [],
        order: 3,
    },
];

export const atplLicense: License = {
    id: "atpl",
    name: "ATPL",
    fullName: "Piloto de Transporte de Línea Aérea",
    description: "La licencia más alta para pilotos, requerida para ser Capitán en aerolíneas comerciales.",
    icon: "🛫",
    color: "#FF9800",
    subjects: atplSubjects,
    requiredLicenses: ["ppl", "cpl", "ifr"],
    order: 4,
};
