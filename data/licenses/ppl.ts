import type { License, Subject, Lesson } from "../../types/lesson";

const regulacionesLessons: Lesson[] = [
    {
        id: "ppl-reg-1",
        subjectId: "ppl-regulaciones",
        title: "Introducción a las Regulaciones Aeronáuticas",
        description: "Conoce la estructura del sistema regulatorio aeronáutico chileno",
        estimatedMinutes: 10,
        xpReward: 50,
        order: 1,
        steps: [
            {
                type: "lesson",
                id: "ppl-reg-1-step-1",
                title: "La DGAC y su Rol",
                content: `# Dirección General de Aeronáutica Civil

La **DGAC** (Dirección General de Aeronáutica Civil) es el organismo encargado de regular la aviación civil en Chile.

## Funciones Principales

- Emitir y renovar licencias de pilotos
- Certificar aeronaves
- Regular el espacio aéreo chileno
- Establecer normas de seguridad operacional
- Investigar accidentes aéreos

## Marco Legal

La aviación civil en Chile se rige por:

- **Código Aeronáutico** (Ley)
- **DAR** (Regulaciones Aeronáuticas)
- **DAN** (Normas Técnicas)

> Las regulaciones chilenas están alineadas con los estándares de la OACI (Organización de Aviación Civil Internacional).`,
            },
            {
                type: "quiz",
                id: "ppl-reg-1-quiz-1",
                question: "¿Qué significa DGAC?",
                options: [
                    { id: "a", text: "Dirección General de Aviación Comercial" },
                    { id: "b", text: "Dirección General de Aeronáutica Civil" },
                    { id: "c", text: "Departamento General de Aviación Civil" },
                    { id: "d", text: "Dirección General de Aeropuertos Civiles" },
                ],
                correctOptionId: "b",
                explanation: "DGAC significa Dirección General de Aeronáutica Civil, el organismo regulador de la aviación civil en Chile.",
            },
            {
                type: "lesson",
                id: "ppl-reg-1-step-2",
                title: "Estructura de las Regulaciones",
                content: `# DAR y DAN

## DAR - Regulaciones Aeronáuticas de Chile

Las DAR son el marco regulatorio principal que establece:

- Requisitos para licencias
- Reglas de operación
- Estándares de seguridad

### DAR Principales para Pilotos

- **DAR 01**: Certificaciones Médicas
- **DAR 61**: Licencias para Pilotos
- **DAR 91**: Reglas de Operación

## DAN - Normas Técnicas

Las DAN complementan las DAR con:

- Procedimientos específicos
- Requisitos técnicos detallados
- Guías de implementación

> Siempre consulta la versión más reciente de las regulaciones en el sitio oficial de la DGAC.`,
            },
            {
                type: "quiz",
                id: "ppl-reg-1-quiz-2",
                question: "¿Cuál DAR establece los requisitos para las licencias de piloto?",
                options: [
                    { id: "a", text: "DAR 01" },
                    { id: "b", text: "DAR 61" },
                    { id: "c", text: "DAR 91" },
                    { id: "d", text: "DAR 121" },
                ],
                correctOptionId: "b",
                explanation: 'El DAR 61 "Licencias para Pilotos y sus Habilitaciones" establece todos los requisitos para obtener y mantener las diferentes licencias de piloto.',
            },
        ],
    },
    {
        id: "ppl-reg-2",
        subjectId: "ppl-regulaciones",
        title: "Requisitos para la Licencia PPL",
        description: "Conoce todos los requisitos para obtener tu licencia de piloto privado",
        estimatedMinutes: 15,
        xpReward: 75,
        order: 2,
        steps: [
            {
                type: "lesson",
                id: "ppl-reg-2-step-1",
                title: "Requisitos Básicos",
                content: `# Requisitos para PPL en Chile

## Requisitos de Edad y Documentación

- **Edad mínima**: 18 años
- Cédula de identidad vigente
- Certificado de nacimiento

## Requisitos Médicos

- **Certificación Médica Clase 2**
- Validez: 2 años (menores de 40 años)
- Validez: 1 año (mayores de 40 años)

## Competencia Lingüística

- Leer, hablar, escribir y comprender español
- Nivel mínimo operacional

## Horas de Vuelo

- **Mínimo 40 horas** de vuelo como piloto al mando
- Incluye instrucción dual y vuelo solo`,
            },
            {
                type: "quiz",
                id: "ppl-reg-2-quiz-1",
                question: "¿Cuál es la edad mínima para obtener una licencia PPL en Chile?",
                options: [
                    { id: "a", text: "16 años" },
                    { id: "b", text: "17 años" },
                    { id: "c", text: "18 años" },
                    { id: "d", text: "21 años" },
                ],
                correctOptionId: "c",
                explanation: "En Chile, la edad mínima para obtener una Licencia de Piloto Privado (PPL) es de 18 años, según el DAR 61.",
            },
            {
                type: "quiz",
                id: "ppl-reg-2-quiz-2",
                question: "¿Cuántas horas de vuelo mínimas se requieren para la licencia PPL?",
                options: [
                    { id: "a", text: "30 horas" },
                    { id: "b", text: "40 horas" },
                    { id: "c", text: "50 horas" },
                    { id: "d", text: "60 horas" },
                ],
                correctOptionId: "b",
                explanation: "Se requieren un mínimo de 40 horas de vuelo como piloto al mando para obtener la licencia PPL.",
            },
        ],
    },
];

const aerodinamicaLessons: Lesson[] = [
    {
        id: "ppl-aero-1",
        subjectId: "ppl-aerodinamica",
        title: "Principios del Vuelo",
        description: "Entiende cómo un avión genera sustentación y vuela",
        estimatedMinutes: 12,
        xpReward: 60,
        order: 1,
        steps: [
            {
                type: "lesson",
                id: "ppl-aero-1-step-1",
                title: "Las Cuatro Fuerzas del Vuelo",
                content: `# Las Cuatro Fuerzas

Todo vuelo involucra cuatro fuerzas fundamentales:

## 1. Sustentación (Lift)
- Actúa perpendicular al viento relativo
- Generada por las alas
- Depende de la velocidad y ángulo de ataque

## 2. Peso (Weight)
- Fuerza de gravedad
- Actúa hacia el centro de la Tierra
- Constante durante el vuelo (excepto consumo de combustible)

## 3. Empuje (Thrust)
- Generado por el motor/hélice
- Actúa hacia adelante
- Vence la resistencia

## 4. Resistencia (Drag)
- Opuesta al movimiento
- Causada por fricción y forma
- Aumenta con la velocidad

> En vuelo nivelado: Sustentación = Peso, Empuje = Resistencia`,
            },
            {
                type: "quiz",
                id: "ppl-aero-1-quiz-1",
                question: "¿Cuál fuerza se opone directamente al peso del avión?",
                options: [
                    { id: "a", text: "Empuje" },
                    { id: "b", text: "Resistencia" },
                    { id: "c", text: "Sustentación" },
                    { id: "d", text: "Tracción" },
                ],
                correctOptionId: "c",
                explanation: "La sustentación (lift) es la fuerza que se opone al peso, manteniendo al avión en el aire.",
            },
            {
                type: "lesson",
                id: "ppl-aero-1-step-2",
                title: "El Ángulo de Ataque",
                content: `# Ángulo de Ataque

## Definición

El **ángulo de ataque** es el ángulo entre:
- La cuerda del ala
- El viento relativo

## Importancia

- Determina la cantidad de sustentación
- Demasiado alto = pérdida (stall)
- Ángulo crítico ≈ 15-20°

## Relación con la Sustentación

Al aumentar el ángulo de ataque:
1. La sustentación aumenta (hasta cierto punto)
2. La resistencia también aumenta
3. Pasado el ángulo crítico, la sustentación cae bruscamente

> El ángulo de ataque NO es el ángulo de cabeceo del avión.`,
            },
            {
                type: "quiz",
                id: "ppl-aero-1-quiz-2",
                question: "¿Qué ocurre cuando se excede el ángulo de ataque crítico?",
                options: [
                    { id: "a", text: "La sustentación aumenta exponencialmente" },
                    { id: "b", text: "El avión entra en pérdida (stall)" },
                    { id: "c", text: "La resistencia disminuye" },
                    { id: "d", text: "El motor se apaga" },
                ],
                correctOptionId: "b",
                explanation: "Cuando se excede el ángulo de ataque crítico (aproximadamente 15-20°), el flujo de aire se separa del ala y se produce una pérdida de sustentación (stall).",
            },
        ],
    },
];

const meteorologiaLessons: Lesson[] = [
    {
        id: "ppl-met-1",
        subjectId: "ppl-meteorologia",
        title: "La Atmósfera",
        description: "Conoce las capas de la atmósfera y sus propiedades",
        estimatedMinutes: 10,
        xpReward: 50,
        order: 1,
        steps: [
            {
                type: "lesson",
                id: "ppl-met-1-step-1",
                title: "Estructura de la Atmósfera",
                content: `# La Atmósfera Terrestre

## Capas de la Atmósfera

### Tropósfera (0-12 km)
- Donde ocurre el clima
- Temperatura disminuye con la altitud
- Contiene el 75% de la masa atmosférica

### Estratósfera (12-50 km)
- Contiene la capa de ozono
- Temperatura aumenta con la altitud
- Vuelos de largo alcance

### Mesósfera y Termósfera
- Por encima de los vuelos comerciales

## Propiedades del Aire

- Presión: disminuye con la altitud
- Temperatura: -2°C cada 1000 ft
- Densidad: disminuye con la altitud

> La aviación general opera principalmente en la tropósfera.`,
            },
            {
                type: "quiz",
                id: "ppl-met-1-quiz-1",
                question: "¿En qué capa de la atmósfera ocurre el clima?",
                options: [
                    { id: "a", text: "Estratósfera" },
                    { id: "b", text: "Tropósfera" },
                    { id: "c", text: "Mesósfera" },
                    { id: "d", text: "Termósfera" },
                ],
                correctOptionId: "b",
                explanation: "La tropósfera es la capa más baja de la atmósfera (0-12 km) donde ocurren todos los fenómenos meteorológicos.",
            },
        ],
    },
];

const navegacionLessons: Lesson[] = [
    {
        id: "ppl-nav-1",
        subjectId: "ppl-navegacion",
        title: "Fundamentos de Navegación",
        description: "Aprende los conceptos básicos de navegación aérea",
        estimatedMinutes: 12,
        xpReward: 55,
        order: 1,
        steps: [
            {
                type: "lesson",
                id: "ppl-nav-1-step-1",
                title: "Coordenadas y Referencias",
                content: `# Navegación Aérea Básica

## Sistema de Coordenadas

### Latitud
- Líneas paralelas al Ecuador
- 0° a 90° Norte o Sur
- Santiago: ~33° S

### Longitud
- Líneas de polo a polo
- 0° a 180° Este u Oeste
- Santiago: ~70° W

## Norte Verdadero vs Norte Magnético

- **Norte Verdadero**: Polo norte geográfico
- **Norte Magnético**: Hacia donde apunta la brújula
- **Variación Magnética**: Diferencia entre ambos

> En Chile, la variación magnética varía según la ubicación.`,
            },
            {
                type: "quiz",
                id: "ppl-nav-1-quiz-1",
                question: "¿Qué es la variación magnética?",
                options: [
                    { id: "a", text: "El error del instrumento" },
                    { id: "b", text: "La diferencia entre norte verdadero y magnético" },
                    { id: "c", text: "La desviación de la brújula por el avión" },
                    { id: "d", text: "El ángulo de deriva" },
                ],
                correctOptionId: "b",
                explanation: "La variación magnética es la diferencia angular entre el norte verdadero (geográfico) y el norte magnético (hacia donde apunta la brújula).",
            },
        ],
    },
];

const pplSubjects: Subject[] = [
    {
        id: "ppl-regulaciones",
        licenseId: "ppl",
        name: "Regulaciones Aeronáuticas",
        description: "DAR/DAN, responsabilidades del piloto y normativa chilena",
        icon: "📋",
        lessons: regulacionesLessons,
        order: 1,
    },
    {
        id: "ppl-aerodinamica",
        licenseId: "ppl",
        name: "Aerodinámica",
        description: "Principios del vuelo, fuerzas y control de la aeronave",
        icon: "✈️",
        lessons: aerodinamicaLessons,
        order: 2,
    },
    {
        id: "ppl-meteorologia",
        licenseId: "ppl",
        name: "Meteorología",
        description: "Clima, fenómenos atmosféricos e informes meteorológicos",
        icon: "🌤️",
        lessons: meteorologiaLessons,
        order: 3,
    },
    {
        id: "ppl-navegacion",
        licenseId: "ppl",
        name: "Navegación Aérea",
        description: "Cartas, planificación de vuelo y radionavegación básica",
        icon: "🧭",
        lessons: navegacionLessons,
        order: 4,
    },
    {
        id: "ppl-instrumentos",
        licenseId: "ppl",
        name: "Instrumentos de Vuelo",
        description: "Instrumentos de cabina y sus principios de funcionamiento",
        icon: "🎛️",
        lessons: [],
        order: 5,
    },
    {
        id: "ppl-motores",
        licenseId: "ppl",
        name: "Motores y Sistemas",
        description: "Motor de pistón, sistemas del avión y procedimientos",
        icon: "⚙️",
        lessons: [],
        order: 6,
    },
    {
        id: "ppl-performance",
        licenseId: "ppl",
        name: "Performance",
        description: "Cálculos de performance, peso y balance",
        icon: "📊",
        lessons: [],
        order: 7,
    },
    {
        id: "ppl-factores-humanos",
        licenseId: "ppl",
        name: "Factores Humanos",
        description: "Fisiología del vuelo, toma de decisiones y CRM básico",
        icon: "🧠",
        lessons: [],
        order: 8,
    },
];

export const pplLicense: License = {
    id: "ppl",
    name: "PPL",
    fullName: "Piloto Privado de Avión",
    description: "Licencia para volar aeronaves pequeñas de forma privada, sin fines comerciales.",
    icon: "🛩️",
    color: "#4CAF50",
    subjects: pplSubjects,
    requiredLicenses: [],
    order: 1,
};
