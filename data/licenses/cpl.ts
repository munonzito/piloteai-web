import type { License, Subject, Lesson } from "../../types/lesson";

const operacionesComerciales: Lesson[] = [
    {
        id: "cpl-ops-1",
        subjectId: "cpl-operaciones",
        title: "Introducción a las Operaciones Comerciales",
        description: "Conoce las diferencias entre vuelo privado y comercial",
        estimatedMinutes: 15,
        xpReward: 75,
        order: 1,
        steps: [
            {
                type: "lesson",
                id: "cpl-ops-1-step-1",
                title: "Vuelo Privado vs Comercial",
                content: `# Operaciones Comerciales

## ¿Qué es una Operación Comercial?

Una operación comercial es aquella donde:
- Se recibe **remuneración** por los servicios de vuelo
- Se transportan pasajeros o carga **a cambio de pago**

## Diferencias Clave

### Piloto Privado (PPL)
- No puede recibir remuneración
- Vuela por placer o necesidad personal
- Puede compartir gastos con pasajeros

### Piloto Comercial (CPL)
- Puede recibir pago por volar
- Trabaja para empresas de aviación
- Mayores responsabilidades y requisitos

## Regulaciones Aplicables

- **DAN 91**: Operaciones Generales
- **DAN 121**: Transporte Aéreo Comercial
- **DAN 135**: Transporte Aéreo No Regular

> El CPL es el primer paso para una carrera profesional en aviación.`,
            },
            {
                type: "quiz",
                id: "cpl-ops-1-quiz-1",
                question: "¿Qué diferencia principal tiene un CPL sobre un PPL?",
                options: [
                    { id: "a", text: "Puede volar más alto" },
                    { id: "b", text: "Puede recibir remuneración por volar" },
                    { id: "c", text: "Puede volar de noche" },
                    { id: "d", text: "Puede volar sobre el océano" },
                ],
                correctOptionId: "b",
                explanation: "La principal diferencia es que un piloto comercial (CPL) puede recibir remuneración por sus servicios de vuelo, mientras que un piloto privado no puede.",
            },
        ],
    },
];

const crmLessons: Lesson[] = [
    {
        id: "cpl-crm-1",
        subjectId: "cpl-crm",
        title: "Fundamentos del CRM",
        description: "Gestión de recursos de tripulación para vuelos seguros",
        estimatedMinutes: 12,
        xpReward: 65,
        order: 1,
        steps: [
            {
                type: "lesson",
                id: "cpl-crm-1-step-1",
                title: "¿Qué es CRM?",
                content: `# Crew Resource Management (CRM)

## Definición

**CRM** es el uso efectivo de todos los recursos disponibles:
- Tripulación de vuelo
- Sistemas de la aeronave
- Información disponible
- Personas en tierra

## Historia

El CRM surgió después de analizar accidentes donde:
- La tripulación tenía las habilidades técnicas necesarias
- Los errores fueron de **comunicación** y **coordinación**

## Pilares del CRM

1. **Comunicación**
2. **Trabajo en equipo**
3. **Toma de decisiones**
4. **Gestión de la carga de trabajo**
5. **Conciencia situacional**

> El CRM no reemplaza las habilidades técnicas, las complementa.`,
            },
            {
                type: "quiz",
                id: "cpl-crm-1-quiz-1",
                question: "¿Qué significa CRM en aviación?",
                options: [
                    { id: "a", text: "Control de Recursos Mecánicos" },
                    { id: "b", text: "Crew Resource Management" },
                    { id: "c", text: "Control de Riesgos Múltiples" },
                    { id: "d", text: "Certificación de Requisitos Mínimos" },
                ],
                correctOptionId: "b",
                explanation: "CRM significa Crew Resource Management (Gestión de Recursos de Tripulación), un enfoque para mejorar la seguridad a través de comunicación efectiva y trabajo en equipo.",
            },
        ],
    },
];

const cplSubjects: Subject[] = [
    {
        id: "cpl-operaciones",
        licenseId: "cpl",
        name: "Operaciones Comerciales",
        description: "DAN 91, 121, 135 y procedimientos de operación comercial",
        icon: "💼",
        lessons: operacionesComerciales,
        order: 1,
    },
    {
        id: "cpl-aerodinamica-avanzada",
        licenseId: "cpl",
        name: "Aerodinámica Avanzada",
        description: "Aerodinámica de alta velocidad y multimotor",
        icon: "🔬",
        lessons: [],
        order: 2,
    },
    {
        id: "cpl-performance-avanzada",
        licenseId: "cpl",
        name: "Performance Avanzada",
        description: "Performance comercial y limitaciones operacionales",
        icon: "📈",
        lessons: [],
        order: 3,
    },
    {
        id: "cpl-mercancias-peligrosas",
        licenseId: "cpl",
        name: "Mercancías Peligrosas",
        description: "DAN 382 y transporte seguro de mercancías peligrosas",
        icon: "☢️",
        lessons: [],
        order: 4,
    },
    {
        id: "cpl-crm",
        licenseId: "cpl",
        name: "CRM",
        description: "Crew Resource Management y factores humanos avanzados",
        icon: "👥",
        lessons: crmLessons,
        order: 5,
    },
];

export const cplLicense: License = {
    id: "cpl",
    name: "CPL",
    fullName: "Piloto Comercial de Avión",
    description: "Licencia para volar profesionalmente y recibir remuneración por servicios de vuelo.",
    icon: "✈️",
    color: "#2196F3",
    subjects: cplSubjects,
    requiredLicenses: ["ppl"],
    order: 2,
};
