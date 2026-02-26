import type { License, Subject, Lesson } from "../../types/lesson";

const procedimientosIFR: Lesson[] = [
    {
        id: "ifr-proc-1",
        subjectId: "ifr-procedimientos",
        title: "Introducción al Vuelo IFR",
        description: "Fundamentos del vuelo por instrumentos",
        estimatedMinutes: 15,
        xpReward: 80,
        order: 1,
        steps: [
            {
                type: "lesson",
                id: "ifr-proc-1-step-1",
                title: "VFR vs IFR",
                content: `# Vuelo Visual vs Vuelo por Instrumentos

## VFR (Visual Flight Rules)

- El piloto navega por **referencias visuales externas**
- Requiere condiciones meteorológicas mínimas
- Separación visual de otros tráficos y terreno

## IFR (Instrument Flight Rules)

- El piloto navega por **instrumentos de cabina**
- Puede volar en nubes e IMC
- Separación proporcionada por ATC

## ¿Por qué obtener la Habilitación IFR?

1. **Mayor utilidad del avión**
   - Volar en mal tiempo
   - Mayor confiabilidad de vuelos

2. **Mayor seguridad**
   - Entrenamiento en situaciones adversas
   - Mejor comprensión de los instrumentos

3. **Requisito para CPL/ATPL**
   - Necesario para avanzar en la carrera

> IFR no significa volar sin ver, significa poder hacerlo cuando sea necesario.`,
            },
            {
                type: "quiz",
                id: "ifr-proc-1-quiz-1",
                question: "¿Qué significa IMC?",
                options: [
                    { id: "a", text: "Instrument Meteorological Conditions" },
                    { id: "b", text: "Instrument Manual Control" },
                    { id: "c", text: "International Minimum Ceiling" },
                    { id: "d", text: "Internal Monitoring Computer" },
                ],
                correctOptionId: "a",
                explanation: "IMC significa Instrument Meteorological Conditions (Condiciones Meteorológicas Instrumentales), condiciones donde se requiere volar por instrumentos.",
            },
        ],
    },
];

const navegacionIFR: Lesson[] = [
    {
        id: "ifr-nav-1",
        subjectId: "ifr-navegacion",
        title: "Radionavegación Básica",
        description: "VOR, NDB y DME para navegación IFR",
        estimatedMinutes: 18,
        xpReward: 90,
        order: 1,
        steps: [
            {
                type: "lesson",
                id: "ifr-nav-1-step-1",
                title: "El Sistema VOR",
                content: `# VOR - VHF Omnidirectional Range

## ¿Qué es el VOR?

El VOR es una radioayuda que proporciona:
- Información de **azimut** (dirección) hacia/desde la estación
- Opera en frecuencias VHF (108.0-117.95 MHz)

## Indicador CDI

El Course Deviation Indicator muestra:
- **TO/FROM**: Si vuelas hacia o desde la estación
- **Desviación lateral**: Izquierda o derecha del radial seleccionado
- Cada punto = 2° de desviación

## Radiales

- Un radial es una línea magnética **desde** el VOR
- Hay 360 radiales (uno por cada grado)
- Se identifican como "R-090" (Radial 090°)

> El VOR sigue siendo fundamental para la navegación IFR en Chile.`,
            },
            {
                type: "quiz",
                id: "ifr-nav-1-quiz-1",
                question: "¿Cuántos radiales tiene un VOR?",
                options: [
                    { id: "a", text: "180" },
                    { id: "b", text: "270" },
                    { id: "c", text: "360" },
                    { id: "d", text: "720" },
                ],
                correctOptionId: "c",
                explanation: "Un VOR tiene 360 radiales, uno por cada grado del compás, irradiando desde la estación.",
            },
            {
                type: "lesson",
                id: "ifr-nav-1-step-2",
                title: "NDB y ADF",
                content: `# NDB - Non-Directional Beacon

## ¿Qué es el NDB?

- Radioayuda que transmite en todas direcciones
- Opera en frecuencias LF/MF (190-535 kHz)
- Más antiguo que el VOR pero aún en uso

## ADF - Automatic Direction Finder

Es el receptor a bordo que:
- Apunta hacia el NDB
- Indica el **bearing relativo** a la estación

## Ventajas y Desventajas

### Ventajas
- Mayor alcance que VOR
- Útil en zonas remotas

### Desventajas
- Menos preciso
- Susceptible a errores

> Aunque menos usado, el NDB es parte del examen IFR.`,
            },
            {
                type: "quiz",
                id: "ifr-nav-1-quiz-2",
                question: "¿Qué instrumento se usa para recibir señales NDB?",
                options: [
                    { id: "a", text: "VOR" },
                    { id: "b", text: "ADF" },
                    { id: "c", text: "DME" },
                    { id: "d", text: "GPS" },
                ],
                correctOptionId: "b",
                explanation: "El ADF (Automatic Direction Finder) es el receptor a bordo que capta las señales NDB y apunta hacia la estación.",
            },
        ],
    },
];

const ifrSubjects: Subject[] = [
    {
        id: "ifr-procedimientos",
        licenseId: "ifr",
        name: "Procedimientos IFR",
        description: "Reglas, planes de vuelo y comunicaciones IFR",
        icon: "📡",
        lessons: procedimientosIFR,
        order: 1,
    },
    {
        id: "ifr-navegacion",
        licenseId: "ifr",
        name: "Navegación IFR",
        description: "VOR, NDB, DME, GPS/RNAV y procedimientos de navegación",
        icon: "🛰️",
        lessons: navegacionIFR,
        order: 2,
    },
    {
        id: "ifr-aproximaciones",
        licenseId: "ifr",
        name: "Aproximaciones Instrumentales",
        description: "ILS, aproximaciones de no precisión y procedimientos frustrados",
        icon: "🎯",
        lessons: [],
        order: 3,
    },
];

export const ifrLicense: License = {
    id: "ifr",
    name: "IFR",
    fullName: "Habilitación de Vuelo por Instrumentos",
    description: "Habilitación para volar en condiciones meteorológicas instrumentales (IMC) usando instrumentos de cabina.",
    icon: "🌧️",
    color: "#9C27B0",
    subjects: ifrSubjects,
    requiredLicenses: ["ppl"],
    order: 3,
};
