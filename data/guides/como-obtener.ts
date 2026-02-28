export interface GuideRequirement {
  label: string
  value: string
  icon: string
}

export interface GuideStep {
  title: string
  description: string
}

export interface GuideFAQ {
  question: string
  answer: string
}

export interface LicenseGuide {
  licenseId: string
  pageTitle: string
  heroDescription: string
  requirements: GuideRequirement[]
  steps: GuideStep[]
  prerequisites: string[]
  attributes: string[]
  medicalClass: string
  validity: string
  renewalInfo: string
  faqs: GuideFAQ[]
}

const guides: Record<string, LicenseGuide> = {
  ppa: {
    licenseId: 'ppa',
    pageTitle: 'Cómo Obtener la Licencia de Piloto Privado de Avión (PPA)',
    heroDescription: 'Guía completa con todos los requisitos, pasos y costos para obtener tu licencia de Piloto Privado de Avión en Chile ante la DGAC.',
    requirements: [
      { label: 'Edad mínima', value: '17 años', icon: '🎂' },
      { label: 'Escolaridad', value: 'Enseñanza Básica completa', icon: '📚' },
      { label: 'Certificado médico', value: 'MAE Clase 2', icon: '🏥' },
      { label: 'Horas de vuelo', value: '40 horas mínimas', icon: '✈️' },
      { label: 'Regulación', value: 'DAN 61', icon: '📋' },
      { label: 'Idioma', value: 'Español (leer, hablar, escribir)', icon: '🗣️' },
    ],
    steps: [
      { title: 'Obtener certificado médico aeronáutico', description: 'Realiza el examen médico aeronáutico (MAE) Clase 2 en un centro autorizado por la DGAC. Se evalúa tu aptitud física y mental para volar.' },
      { title: 'Inscribirse en un CIAC', description: 'Matricúlate en un Centro de Instrucción de Aeronáutica Civil (CIAC) aprobado por la DGAC. Allí recibirás instrucción teórica y práctica.' },
      { title: 'Completar instrucción teórica', description: 'Estudia las materias del examen teórico: aerodinámica, meteorología, navegación, reglamentación, performance y factores humanos.' },
      { title: 'Acumular horas de vuelo', description: 'Completa un mínimo de 40 horas de vuelo, incluyendo vuelo solo, navegación y vuelo nocturno según los requisitos de la DAN 61.' },
      { title: 'Aprobar examen teórico DGAC', description: 'Rinde el examen teórico ante la DGAC con un mínimo de 75% de aprobación. Incluye preguntas de todas las materias del programa.' },
      { title: 'Aprobar examen práctico (pericia de vuelo)', description: 'Realiza el chequeo práctico con un inspector de la DGAC, demostrando competencia en maniobras normales y de emergencia.' },
      { title: 'Solicitar la licencia', description: 'Presenta toda la documentación en el Departamento de Licencias de la DGAC para obtener tu licencia de Piloto Privado de Avión.' },
    ],
    prerequisites: [
      'No se requiere licencia previa',
    ],
    attributes: [
      'Volar aeronaves monomotor de pistón en condiciones VFR',
      'Transportar pasajeros sin remuneración',
      'Volar de día y de noche (con habilitación nocturna)',
      'Operar dentro del territorio nacional',
    ],
    medicalClass: 'Clase 2',
    validity: '2 años (menores de 40) / 1 año (mayores de 40)',
    renewalInfo: 'Para renovar se requiere certificado médico vigente. Si han pasado más de 24 meses sin actividad como piloto, se requiere reentrenamiento con instructor. Más de 24 meses sin actividad requiere rendir todos los exámenes nuevamente.',
    faqs: [
      { question: '¿Cuánto cuesta obtener la licencia PPA en Chile?', answer: 'El costo total varía entre $4.000.000 y $8.000.000 CLP aproximadamente, incluyendo instrucción teórica, horas de vuelo, examen médico y derechos DGAC. Las horas de vuelo representan el mayor costo.' },
      { question: '¿Cuánto tiempo toma obtener la licencia PPA?', answer: 'Generalmente entre 6 y 12 meses, dependiendo de la frecuencia de vuelo y estudio. Algunos estudiantes con dedicación intensiva pueden completarla en 4-5 meses.' },
      { question: '¿Puedo volar comercialmente con la PPA?', answer: 'No. La licencia PPA solo permite vuelos privados sin remuneración. Para volar comercialmente necesitas la licencia de Piloto Comercial de Avión (PCA).' },
      { question: '¿Dónde puedo estudiar para piloto privado en Chile?', answer: 'En cualquier Centro de Instrucción de Aeronáutica Civil (CIAC) aprobado por la DGAC. Existen escuelas en Santiago, Concepción, Temuco, Iquique y otras ciudades.' },
    ],
  },

  pca: {
    licenseId: 'pca',
    pageTitle: 'Cómo Obtener la Licencia de Piloto Comercial de Avión (PCA)',
    heroDescription: 'Requisitos completos, pasos y experiencia de vuelo necesaria para obtener tu licencia de Piloto Comercial de Avión en Chile.',
    requirements: [
      { label: 'Edad mínima', value: '18 años', icon: '🎂' },
      { label: 'Escolaridad', value: 'Enseñanza Media completa', icon: '📚' },
      { label: 'Certificado médico', value: 'MAE Clase 1', icon: '🏥' },
      { label: 'Horas de vuelo', value: '200 horas (150 en CIAC)', icon: '✈️' },
      { label: 'Licencia previa', value: 'PPA vigente', icon: '📄' },
      { label: 'Regulación', value: 'DAN 61', icon: '📋' },
    ],
    steps: [
      { title: 'Obtener licencia PPA', description: 'Debes contar con la Licencia de Piloto Privado de Avión vigente como requisito previo.' },
      { title: 'Obtener certificado médico Clase 1', description: 'Realiza el examen MAE Clase 1, más exigente que el Clase 2. Se requiere para operaciones comerciales.' },
      { title: 'Inscribirse en curso comercial', description: 'Matricúlate en un CIAC para el programa de Piloto Comercial. Si estudias en un CIAC, las horas mínimas bajan de 200 a 150.' },
      { title: 'Acumular experiencia de vuelo', description: 'Completa un mínimo de 200 horas de vuelo (o 150 horas en CIAC), incluyendo vuelo por instrumentos, nocturno y travesía.' },
      { title: 'Aprobar examen teórico DGAC', description: 'Rinde el examen teórico con un mínimo de 75%. Las materias incluyen meteorología avanzada, performance, regulación y navegación.' },
      { title: 'Aprobar examen práctico', description: 'Realiza la pericia de vuelo ante un inspector DGAC demostrando competencia en operaciones comerciales, IFR básico y emergencias.' },
      { title: 'Solicitar la licencia', description: 'Presenta la documentación completa, incluyendo bitácora de vuelo, certificados y comprobante de pago en la DGAC.' },
    ],
    prerequisites: [
      'Licencia de Piloto Privado de Avión (PPA) vigente',
    ],
    attributes: [
      'Ejercer funciones remuneradas como piloto',
      'Operar aeronaves para trabajos aéreos y vuelos comerciales',
      'Actuar como piloto al mando en operaciones de taxi aéreo',
      'Volar bajo reglas IFR (con habilitación correspondiente)',
      'Actuar como copiloto en operaciones de línea aérea',
    ],
    medicalClass: 'Clase 1',
    validity: '1 año (menores de 40) / 6 meses (mayores de 40)',
    renewalInfo: 'Requiere certificado médico Clase 1 vigente. Sin actividad por más de 24 meses necesita reentrenamiento con instructor de vuelo. Más de 24 meses sin actividad requiere rendir todos los exámenes nuevamente ante la DGAC.',
    faqs: [
      { question: '¿Cuánto cuesta la licencia de Piloto Comercial en Chile?', answer: 'El costo total puede oscilar entre $15.000.000 y $30.000.000 CLP, considerando las horas de vuelo adicionales, instrucción IFR, exámenes y certificaciones. Las horas de vuelo son el costo principal.' },
      { question: '¿Puedo ser piloto de aerolínea con la PCA?', answer: 'Sí, puedes actuar como copiloto en aerolíneas. Para ser comandante en líneas aéreas necesitas la licencia PTLA (Piloto de Transporte de Línea Aérea).' },
      { question: '¿Cuántas horas de vuelo necesito realmente?', answer: 'El mínimo legal es 150 horas en un CIAC o 200 horas fuera de uno. Sin embargo, muchas empresas requieren entre 500 y 1.500 horas para contratar pilotos comerciales.' },
      { question: '¿Es necesaria la habilitación IFR?', answer: 'Aunque no es obligatoria para obtener la PCA, es prácticamente imprescindible para el mercado laboral. La mayoría de los trabajos comerciales requieren habilitación IFR.' },
    ],
  },

  pph: {
    licenseId: 'pph',
    pageTitle: 'Cómo Obtener la Licencia de Piloto Privado de Helicóptero (PPH)',
    heroDescription: 'Todo lo que necesitas saber para obtener tu licencia de Piloto Privado de Helicóptero en Chile: requisitos, horas de vuelo y exámenes DGAC.',
    requirements: [
      { label: 'Edad mínima', value: '17 años', icon: '🎂' },
      { label: 'Escolaridad', value: 'Enseñanza Básica completa', icon: '📚' },
      { label: 'Certificado médico', value: 'MAE Clase 2', icon: '🏥' },
      { label: 'Horas de vuelo', value: '40 horas en helicóptero', icon: '🚁' },
      { label: 'Regulación', value: 'DAN 61', icon: '📋' },
      { label: 'Idioma', value: 'Español (leer, hablar, escribir)', icon: '🗣️' },
    ],
    steps: [
      { title: 'Obtener certificado médico aeronáutico', description: 'Realiza el MAE Clase 2 en un centro autorizado. Se evalúa aptitud física y mental, incluyendo visión y audición.' },
      { title: 'Inscribirse en un CIAC de helicópteros', description: 'Elige un Centro de Instrucción que ofrezca formación en helicóptero. Hay menos escuelas que para avión, principalmente en Santiago y regiones.' },
      { title: 'Completar instrucción teórica', description: 'Estudia aerodinámica de ala rotatoria, meteorología, navegación, reglamentación y operaciones de helicóptero.' },
      { title: 'Acumular horas de vuelo', description: 'Completa mínimo 40 horas de vuelo en helicóptero, incluyendo vuelo solo, navegación y prácticas de autorrotación.' },
      { title: 'Aprobar examen teórico DGAC', description: 'Rinde el examen teórico con 75% mínimo de aprobación en todas las materias específicas de helicóptero.' },
      { title: 'Aprobar pericia de vuelo', description: 'Demuestra competencia en vuelo en helicóptero ante un inspector DGAC: hovering, autorrotación, emergencias y navegación.' },
      { title: 'Solicitar la licencia', description: 'Presenta la documentación en la DGAC para recibir tu licencia PPH.' },
    ],
    prerequisites: [
      'No se requiere licencia previa',
    ],
    attributes: [
      'Volar helicópteros de forma privada sin remuneración',
      'Transportar pasajeros sin fines comerciales',
      'Operar en condiciones VFR diurnas y nocturnas (con habilitación)',
    ],
    medicalClass: 'Clase 2',
    validity: '2 años (menores de 40) / 1 año (mayores de 40)',
    renewalInfo: 'Requiere certificado médico vigente y actividad reciente. Más de 24 meses sin volar requiere reentrenamiento y posiblemente nuevos exámenes.',
    faqs: [
      { question: '¿Es más caro aprender a volar helicóptero que avión?', answer: 'Sí, significativamente. La hora de vuelo en helicóptero puede costar entre 2 y 3 veces más que en avión, debido al mayor costo operacional.' },
      { question: '¿Puedo convalidar horas de avión para helicóptero?', answer: 'No directamente. Las horas de vuelo en avión y helicóptero se contabilizan por separado. Sin embargo, algunos conocimientos teóricos son compartidos.' },
      { question: '¿Dónde hay escuelas de helicóptero en Chile?', answer: 'Las principales escuelas de helicóptero operan en Santiago (aeródromo de Tobalaba y otros) y algunas en regiones. La oferta es más limitada que para avión.' },
    ],
  },

  pch: {
    licenseId: 'pch',
    pageTitle: 'Cómo Obtener la Licencia de Piloto Comercial de Helicóptero (PCH)',
    heroDescription: 'Guía detallada para obtener la licencia de Piloto Comercial de Helicóptero en Chile: experiencia requerida, exámenes y proceso ante la DGAC.',
    requirements: [
      { label: 'Edad mínima', value: '18 años', icon: '🎂' },
      { label: 'Escolaridad', value: 'Enseñanza Media completa', icon: '📚' },
      { label: 'Certificado médico', value: 'MAE Clase 1', icon: '🏥' },
      { label: 'Horas de vuelo', value: '150 horas en helicóptero', icon: '🚁' },
      { label: 'Licencia previa', value: 'PPH vigente', icon: '📄' },
      { label: 'Regulación', value: 'DAN 61', icon: '📋' },
    ],
    steps: [
      { title: 'Obtener licencia PPH', description: 'Debes contar con la Licencia de Piloto Privado de Helicóptero vigente como requisito previo.' },
      { title: 'Obtener certificado médico Clase 1', description: 'El MAE Clase 1 es más exigente e incluye evaluaciones cardiovasculares y neurológicas adicionales.' },
      { title: 'Acumular experiencia de vuelo', description: 'Completa mínimo 150 horas de vuelo en helicóptero en un CIAC (o 200 fuera de un CIAC).' },
      { title: 'Completar instrucción avanzada', description: 'Domina aerodinámica avanzada de rotor, performance, emergencias complejas y operaciones especiales.' },
      { title: 'Aprobar examen teórico DGAC', description: 'Rinde el examen teórico con 75% mínimo en todas las materias del programa de Piloto Comercial de Helicóptero.' },
      { title: 'Aprobar pericia de vuelo', description: 'Demuestra competencia ante un inspector DGAC en operaciones comerciales, autorrotación y emergencias avanzadas.' },
      { title: 'Solicitar la licencia', description: 'Presenta la documentación completa en la DGAC para obtener tu licencia PCH.' },
    ],
    prerequisites: [
      'Licencia de Piloto Privado de Helicóptero (PPH) vigente',
    ],
    attributes: [
      'Realizar trabajos aéreos remunerados en helicóptero',
      'Operar en taxi aéreo y servicios de transporte',
      'Volar en operaciones de rescate, contraincendios y líneas de alta tensión',
      'Actuar como copiloto en operaciones de línea aérea de helicóptero',
    ],
    medicalClass: 'Clase 1',
    validity: '1 año (menores de 40) / 6 meses (mayores de 40)',
    renewalInfo: 'Requiere certificado médico Clase 1 vigente y actividad reciente como piloto de helicóptero.',
    faqs: [
      { question: '¿Qué trabajos puedo realizar con la PCH?', answer: 'Puedes trabajar en taxi aéreo, rescate aéreo, minería, líneas de alta tensión, filmaciones, extinción de incendios, transporte offshore y muchas más operaciones.' },
      { question: '¿Cuántas horas necesito para conseguir empleo?', answer: 'El mínimo legal es 150 horas, pero la mayoría de las empresas buscan pilotos con al menos 500-1.000 horas de experiencia en helicóptero.' },
    ],
  },

  'ptla-a': {
    licenseId: 'ptla-a',
    pageTitle: 'Cómo Obtener la Licencia PTLA de Avión (Piloto de Transporte de Línea Aérea)',
    heroDescription: 'Requisitos completos para obtener la máxima licencia de piloto en Chile: PTLA. Horas de vuelo, experiencia IFR y proceso de certificación.',
    requirements: [
      { label: 'Edad mínima', value: '21 años', icon: '🎂' },
      { label: 'Certificado médico', value: 'MAE Clase 1', icon: '🏥' },
      { label: 'Horas de vuelo', value: '1.500 horas totales', icon: '✈️' },
      { label: 'Licencia previa', value: 'PCA con IFR y Multimotor', icon: '📄' },
      { label: 'Horas IFR', value: '75 horas mínimas', icon: '🌙' },
      { label: 'Regulación', value: 'DAN 61', icon: '📋' },
    ],
    steps: [
      { title: 'Cumplir con licencias previas', description: 'Debes contar con PCA vigente, habilitación IFR y habilitación multimotor como requisitos previos.' },
      { title: 'Acumular 1.500 horas de vuelo', description: 'Incluye mínimo 500 horas PIC, 200 horas de travesía, 100 horas nocturnas y 75 horas IFR.' },
      { title: 'Obtener competencia lingüística OACI', description: 'Aprueba el examen de competencia lingüística OACI nivel 4 o superior, necesario para operaciones internacionales.' },
      { title: 'Completar instrucción PTLA', description: 'Realiza el curso PTLA en un CIAC, con énfasis en performance de aeronaves de transporte, regulación 119/121 y CRM.' },
      { title: 'Aprobar examen teórico DGAC', description: 'El examen PTLA es el más extenso de la DGAC. Cubre performance avanzada, regulación, meteorología, navegación y sistemas de aeronaves de transporte.' },
      { title: 'Aprobar chequeo en simulador', description: 'Realiza el chequeo práctico en simulador de nivel aprobado o aeronave, demostrando competencia en operaciones de línea aérea.' },
      { title: 'Solicitar la licencia', description: 'Presenta toda la documentación, incluyendo bitácora actualizada y certificados, en la DGAC.' },
    ],
    prerequisites: [
      'Licencia de Piloto Comercial de Avión (PCA) vigente',
      'Habilitación de Vuelo por Instrumentos (IFR)',
      'Habilitación Multimotor',
    ],
    attributes: [
      'Actuar como Comandante en aerolíneas comerciales',
      'Operar aeronaves de transporte público bajo DAN 119/121',
      'Máxima autoridad en cabina durante operaciones de línea aérea',
      'Firmar documentación operacional como piloto al mando',
    ],
    medicalClass: 'Clase 1',
    validity: '1 año (menores de 40) / 6 meses (mayores de 40)',
    renewalInfo: 'Requiere MAE Clase 1 vigente, competencia lingüística OACI vigente y actividad reciente. La mayoría de aerolíneas realizan chequeos semestrales adicionales.',
    faqs: [
      { question: '¿Cuánto tiempo se tarda en llegar a PTLA desde cero?', answer: 'Desde cero (sin experiencia), generalmente entre 5 y 10 años. Depende de la velocidad con que acumules las 1.500 horas y obtengas las habilitaciones previas.' },
      { question: '¿Es obligatorio el PTLA para volar en aerolíneas?', answer: 'Para ser Comandante sí es obligatorio. Como Copiloto/Primer Oficial puedes trabajar con licencia PCA más habilitaciones IFR, multimotor y de tipo.' },
      { question: '¿Cuánto gana un piloto PTLA en Chile?', answer: 'Los salarios varían ampliamente. Un Comandante en aerolíneas grandes puede ganar entre $3.000.000 y $8.000.000 CLP mensuales, dependiendo de la empresa y antigüedad.' },
    ],
  },

  'ptla-h': {
    licenseId: 'ptla-h',
    pageTitle: 'Cómo Obtener la Licencia PTLA de Helicóptero',
    heroDescription: 'Guía para obtener la máxima licencia de piloto de helicóptero en Chile: requisitos, horas de vuelo y proceso DGAC.',
    requirements: [
      { label: 'Edad mínima', value: '21 años', icon: '🎂' },
      { label: 'Certificado médico', value: 'MAE Clase 1', icon: '🏥' },
      { label: 'Horas de vuelo', value: '1.000 horas en helicóptero', icon: '🚁' },
      { label: 'Licencia previa', value: 'PCH con IFR', icon: '📄' },
      { label: 'Horas IFR', value: '75 horas mínimas', icon: '🌙' },
      { label: 'Regulación', value: 'DAN 61', icon: '📋' },
    ],
    steps: [
      { title: 'Cumplir con licencias previas', description: 'Debes contar con PCH vigente y habilitación IFR como requisitos previos.' },
      { title: 'Acumular 1.000 horas de vuelo', description: 'Completa las horas mínimas en helicóptero, incluyendo experiencia IFR, nocturna y como piloto al mando.' },
      { title: 'Completar instrucción PTLA', description: 'Realiza el curso específico de PTLA de helicóptero en un CIAC aprobado.' },
      { title: 'Aprobar examen teórico DGAC', description: 'Rinde el examen con todas las materias avanzadas específicas para operaciones de transporte en helicóptero.' },
      { title: 'Aprobar chequeo práctico', description: 'Demuestra competencia ante un inspector DGAC en operaciones de transporte de línea aérea en helicóptero.' },
      { title: 'Solicitar la licencia', description: 'Presenta la documentación en la DGAC.' },
    ],
    prerequisites: [
      'Licencia de Piloto Comercial de Helicóptero (PCH) vigente',
      'Habilitación de Vuelo por Instrumentos (IFR)',
    ],
    attributes: [
      'Actuar como Comandante en operaciones de línea aérea de helicóptero',
      'Operar helicópteros de transporte público bajo normativa vigente',
      'Supervisar operaciones complejas como offshore, HEMS y SAR',
    ],
    medicalClass: 'Clase 1',
    validity: '1 año (menores de 40) / 6 meses (mayores de 40)',
    renewalInfo: 'Requiere MAE Clase 1 vigente y actividad reciente como piloto de helicóptero.',
    faqs: [
      { question: '¿Dónde trabajan los pilotos PTLA de helicóptero?', answer: 'Principalmente en operaciones offshore (petróleo y gas), servicios médicos de emergencia (HEMS), búsqueda y rescate (SAR) y transporte VIP de pasajeros.' },
      { question: '¿Cuántas horas se necesitan vs el PTLA de avión?', answer: 'Se requieren 1.000 horas en helicóptero vs 1.500 totales para avión. Sin embargo, cada hora de helicóptero suele ser más costosa.' },
    ],
  },

  ifr: {
    licenseId: 'ifr',
    pageTitle: 'Cómo Obtener la Habilitación IFR (Vuelo por Instrumentos)',
    heroDescription: 'Requisitos y proceso para obtener la habilitación de vuelo por instrumentos en Chile. Fundamental para la carrera de piloto comercial.',
    requirements: [
      { label: 'Licencia previa', value: 'PPA o PCA vigente', icon: '📄' },
      { label: 'Certificado médico', value: 'MAE Clase 1 o 2', icon: '🏥' },
      { label: 'Horas de vuelo', value: '50 horas de travesía como PIC', icon: '✈️' },
      { label: 'Horas IFR', value: '40 horas de vuelo por instrumentos', icon: '🌙' },
      { label: 'Regulación', value: 'DAN 61', icon: '📋' },
    ],
    steps: [
      { title: 'Verificar requisitos previos', description: 'Debes tener una licencia de piloto vigente y las horas mínimas de experiencia como piloto al mando.' },
      { title: 'Inscribirse en curso IFR', description: 'Matricúlate en un CIAC para el programa de habilitación IFR. El curso incluye instrucción teórica y práctica.' },
      { title: 'Completar instrucción teórica IFR', description: 'Estudia reglamentación IFR, procedimientos de aproximación, radioayudas, meteorología instrumental y planificación de vuelos IFR.' },
      { title: 'Acumular horas IFR', description: 'Completa mínimo 40 horas de vuelo por instrumentos, incluyendo instrucción dual y tiempo en simulador aprobado.' },
      { title: 'Aprobar examen teórico DGAC', description: 'Rinde el examen teórico de IFR con 75% mínimo de aprobación.' },
      { title: 'Aprobar chequeo práctico IFR', description: 'Demuestra competencia en vuelo por instrumentos ante un inspector: aproximaciones, esperas, procedimientos de emergencia IFR.' },
    ],
    prerequisites: [
      'Licencia de Piloto Privado o Comercial vigente',
      '50 horas de travesía como piloto al mando',
    ],
    attributes: [
      'Volar en condiciones meteorológicas instrumentales (IMC)',
      'Realizar aproximaciones por instrumentos a aeródromos',
      'Operar dentro del sistema de tránsito aéreo IFR',
      'Requisito fundamental para empleo como piloto comercial',
    ],
    medicalClass: 'Según licencia base (Clase 1 o 2)',
    validity: 'Según licencia base',
    renewalInfo: 'Se renueva junto con la licencia base. Requiere mantener experiencia reciente en vuelo IFR.',
    faqs: [
      { question: '¿Es obligatoria la habilitación IFR?', answer: 'No es obligatoria para la PPA, pero es prácticamente imprescindible para cualquier piloto comercial. Sin IFR, las oportunidades laborales son muy limitadas.' },
      { question: '¿Puedo obtener IFR con la licencia PPA?', answer: 'Sí, puedes obtener la habilitación IFR con licencia PPA. Sin embargo, es más común hacerlo durante o después del curso de PCA.' },
      { question: '¿Cuánto cuesta la habilitación IFR?', answer: 'El costo varía entre $3.000.000 y $6.000.000 CLP, dependiendo del CIAC y las horas necesarias de instrucción en vuelo y simulador.' },
    ],
  },

  multimotor: {
    licenseId: 'multimotor',
    pageTitle: 'Cómo Obtener la Habilitación Multimotor',
    heroDescription: 'Guía para obtener la habilitación multimotor en Chile: requisitos, entrenamiento y proceso ante la DGAC.',
    requirements: [
      { label: 'Licencia previa', value: 'PPA o PCA vigente', icon: '📄' },
      { label: 'Certificado médico', value: 'MAE vigente', icon: '🏥' },
      { label: 'Instrucción práctica', value: 'Mínimo en aeronave multimotor', icon: '✈️' },
      { label: 'Regulación', value: 'DAN 61', icon: '📋' },
    ],
    steps: [
      { title: 'Contar con licencia de piloto vigente', description: 'Debes tener una PPA o PCA vigente antes de solicitar la habilitación multimotor.' },
      { title: 'Inscribirse en curso multimotor', description: 'Matricúlate en un CIAC que ofrezca instrucción en aeronave multimotor.' },
      { title: 'Completar instrucción teórica', description: 'Estudia aerodinámica multimotor, procedimientos con motor inoperativo, performance asimétrica y emergencias.' },
      { title: 'Completar instrucción práctica', description: 'Realiza las horas de vuelo en aeronave multimotor, practicando vuelo con motor inoperativo y procedimientos de emergencia.' },
      { title: 'Aprobar examen teórico DGAC', description: 'Rinde el examen teórico de habilitación multimotor con 75% mínimo de aprobación.' },
      { title: 'Aprobar chequeo práctico', description: 'Demuestra competencia en vuelo multimotor ante un inspector, incluyendo motor inoperativo, VMC y procedimientos de emergencia.' },
    ],
    prerequisites: [
      'Licencia de Piloto Privado o Comercial vigente',
    ],
    attributes: [
      'Operar aeronaves con dos o más motores',
      'Requisito previo para la licencia PTLA',
      'Acceso a aeronaves más grandes y operaciones de mayor alcance',
    ],
    medicalClass: 'Según licencia base',
    validity: 'Según licencia base',
    renewalInfo: 'Se renueva junto con la licencia base. Requiere mantener experiencia reciente en aeronaves multimotor.',
    faqs: [
      { question: '¿Cuántas horas de vuelo multimotor necesito?', answer: 'El mínimo depende del CIAC, pero generalmente son entre 10 y 25 horas de vuelo en aeronave multimotor. Es un curso relativamente corto.' },
      { question: '¿Es necesaria para ser piloto de aerolínea?', answer: 'Sí, la habilitación multimotor es requisito obligatorio para obtener el PTLA y para operar cualquier aeronave con más de un motor.' },
    ],
  },

  rpa: {
    licenseId: 'rpa',
    pageTitle: 'Cómo Obtener la Credencial de Operador de Drones (RPA) en Chile',
    heroDescription: 'Requisitos completos para obtener tu credencial de piloto de drones en Chile: proceso DGAC, examen DAN 151 y registro del RPAS.',
    requirements: [
      { label: 'Edad mínima', value: '18 años', icon: '🎂' },
      { label: 'Instrucción', value: 'Declaración jurada ante notario', icon: '📋' },
      { label: 'Examen', value: 'DAN 151, DAN 91 y Meteorología', icon: '📝' },
      { label: 'Seguro', value: 'Seguro contra terceros (JAC)', icon: '🛡️' },
      { label: 'Registro', value: 'Dron inscrito en la DGAC', icon: '📄' },
      { label: 'Regulación', value: 'DAN 151', icon: '📋' },
    ],
    steps: [
      { title: 'Recibir instrucción teórica y práctica', description: 'Realiza un curso o instrucción sobre el modelo de RPAS que vas a operar. Puede ser en un centro de instrucción o con un instructor autorizado.' },
      { title: 'Obtener declaración jurada notarial', description: 'Presenta ante notario una declaración jurada de haber recibido instrucción teórica y práctica respecto al modelo de dron a operar.' },
      { title: 'Registrar el dron en la DGAC', description: 'Inscribe tu dron proporcionando: marca, modelo, número de serie, peso, equipamiento y foto. La DGAC entrega una tarjeta de registro.' },
      { title: 'Aprobar examen teórico DGAC', description: 'Rinde el examen escrito sobre DAN 151, DAN 91, Meteorología y Aerodinámica básica con mínimo 75% de aprobación.' },
      { title: 'Contratar seguro contra terceros', description: 'Obtén un seguro de daños contra terceros autorizado por la Junta Aeronáutica Civil (JAC).' },
      { title: 'Solicitar credencial de piloto a distancia', description: 'Presenta la documentación completa en la DGAC para obtener tu credencial de operador RPA.' },
    ],
    prerequisites: [
      'No se requiere licencia previa',
    ],
    attributes: [
      'Operar drones en zonas pobladas con autorización',
      'Realizar trabajos aéreos con RPAS (fotografía, filmación, topografía)',
      'Operar en condiciones VLOS (línea visual directa)',
    ],
    medicalClass: 'No se requiere MAE',
    validity: 'Según normativa vigente',
    renewalInfo: 'La credencial se mantiene vigente según los plazos establecidos en la DAN 151. El registro del dron también debe mantenerse actualizado.',
    faqs: [
      { question: '¿Necesito credencial para volar un dron recreativo?', answer: 'Drones de hasta 750g para uso recreativo en áreas privadas no requieren credencial, siempre que no superen 50m de altura. Para cualquier otro uso u operación en zonas pobladas, sí necesitas credencial.' },
      { question: '¿Cuánto cuesta obtener la credencial de operador RPA?', answer: 'El costo es relativamente bajo comparado con licencias de piloto. Los principales gastos son el curso de instrucción ($100.000-$500.000 CLP), el examen DGAC y la inscripción del dron.' },
      { question: '¿Puedo operar comercialmente con la credencial RPA?', answer: 'Sí, con la credencial puedes realizar operaciones comerciales como fotografía aérea, topografía, inspección de infraestructura y filmaciones, siempre con autorización previa de la DGAC.' },
      { question: '¿Dónde puedo volar mi dron?', answer: 'Debes respetar las zonas de exclusión (aeropuertos, bases militares) y solicitar autorización a la DGAC para cada operación en zonas pobladas. El vuelo siempre debe ser en condiciones VLOS.' },
    ],
  },

  planeador: {
    licenseId: 'planeador',
    pageTitle: 'Cómo Obtener la Licencia de Piloto de Planeador en Chile',
    heroDescription: 'Todo sobre la licencia de piloto de planeador: requisitos DGAC, instrucción de vuelo a vela y proceso de certificación.',
    requirements: [
      { label: 'Edad mínima', value: '16 años', icon: '🎂' },
      { label: 'Certificado médico', value: 'MAE Clase 2', icon: '🏥' },
      { label: 'Instrucción', value: 'Curso en CIAC o club de planeadores', icon: '📚' },
      { label: 'Regulación', value: 'DAN 61', icon: '📋' },
    ],
    steps: [
      { title: 'Obtener certificado médico', description: 'Realiza el MAE Clase 2 en un centro autorizado por la DGAC.' },
      { title: 'Inscribirse en un club de planeadores o CIAC', description: 'Los clubes aéreos y CIAC ofrecen formación en planeador. Recibirás instrucción teórica y práctica.' },
      { title: 'Completar instrucción teórica', description: 'Estudia aerodinámica de planeador, meteorología para vuelo a vela, navegación, técnicas de ascenso térmico y reglamentación.' },
      { title: 'Acumular vuelos y experiencia', description: 'Completa los vuelos de instrucción requeridos, incluyendo vuelos solo y navegación.' },
      { title: 'Aprobar examen teórico DGAC', description: 'Rinde el examen teórico con 75% mínimo de aprobación en las materias específicas de planeador.' },
      { title: 'Aprobar pericia de vuelo', description: 'Demuestra competencia en vuelo de planeador ante un inspector DGAC.' },
    ],
    prerequisites: [
      'No se requiere licencia previa',
    ],
    attributes: [
      'Operar planeadores en vuelo a vela',
      'Participar en competencias de vuelo sin motor',
      'Volar cross-country en planeador',
    ],
    medicalClass: 'Clase 2',
    validity: '2 años (menores de 40) / 1 año (mayores de 40)',
    renewalInfo: 'Requiere certificado médico vigente y actividad reciente en vuelo de planeador.',
    faqs: [
      { question: '¿Es la licencia de planeador más fácil de obtener?', answer: 'Es menos costosa que las licencias de avión o helicóptero, pero requiere la misma rigurosidad en conocimientos teóricos. La edad mínima es 16 años, la más baja de todas las licencias.' },
      { question: '¿Puedo luego pasar a licencia de avión?', answer: 'Sí, muchos pilotos empiezan en planeador y luego obtienen la PPA. La experiencia en planeador desarrolla excelentes habilidades de vuelo.' },
    ],
  },

  lsa: {
    licenseId: 'lsa',
    pageTitle: 'Cómo Obtener la Licencia de Piloto LSA en Chile',
    heroDescription: 'Guía para obtener la licencia de Piloto de Aeronave Deportiva Liviana (LSA) en Chile: requisitos y proceso DGAC.',
    requirements: [
      { label: 'Edad mínima', value: '17 años', icon: '🎂' },
      { label: 'Certificado médico', value: 'MAE Clase 2', icon: '🏥' },
      { label: 'Instrucción', value: 'Curso en CIAC', icon: '📚' },
      { label: 'Regulación', value: 'DAN 61', icon: '📋' },
    ],
    steps: [
      { title: 'Obtener certificado médico', description: 'Realiza el MAE Clase 2 en un centro autorizado.' },
      { title: 'Inscribirse en un CIAC', description: 'Matricúlate en un centro que ofrezca formación LSA.' },
      { title: 'Completar instrucción teórica y práctica', description: 'Estudia aerodinámica, meteorología, navegación y reglamentación específica para LSA.' },
      { title: 'Aprobar examen teórico DGAC', description: 'Rinde el examen con 75% mínimo de aprobación.' },
      { title: 'Aprobar pericia de vuelo', description: 'Demuestra competencia en vuelo de aeronave LSA ante la DGAC.' },
      { title: 'Solicitar la licencia', description: 'Presenta la documentación para obtener tu licencia.' },
    ],
    prerequisites: ['No se requiere licencia previa'],
    attributes: [
      'Operar aeronaves deportivas livianas (LSA)',
      'Volar en condiciones VFR diurnas',
      'Acceso a una categoría de aviación recreativa accesible',
    ],
    medicalClass: 'Clase 2',
    validity: '2 años (menores de 40) / 1 año (mayores de 40)',
    renewalInfo: 'Requiere certificado médico vigente y actividad reciente.',
    faqs: [
      { question: '¿Qué diferencia hay entre LSA y PPA?', answer: 'La licencia LSA permite operar solo aeronaves deportivas livianas (hasta 600kg MTOW, monomotor, biplaza). La PPA permite operar un rango más amplio de aeronaves.' },
    ],
  },

  ulm: {
    licenseId: 'ulm',
    pageTitle: 'Cómo Obtener la Licencia de Piloto ULM en Chile',
    heroDescription: 'Requisitos para la licencia de Piloto de Ultraliviano Motorizado en Chile: proceso DGAC y formación necesaria.',
    requirements: [
      { label: 'Edad mínima', value: '17 años', icon: '🎂' },
      { label: 'Certificado médico', value: 'MAE Clase 2', icon: '🏥' },
      { label: 'Instrucción', value: 'Curso en CIAC', icon: '📚' },
      { label: 'Regulación', value: 'DAN 61', icon: '📋' },
    ],
    steps: [
      { title: 'Obtener certificado médico', description: 'Realiza el MAE Clase 2.' },
      { title: 'Inscribirse en un CIAC', description: 'Matricúlate para formación en ULM.' },
      { title: 'Completar instrucción', description: 'Estudia aerodinámica, meteorología y reglamentación específica de ULM.' },
      { title: 'Aprobar examen teórico DGAC', description: 'Rinde el examen con 75% mínimo.' },
      { title: 'Aprobar pericia de vuelo', description: 'Demuestra competencia en vuelo ULM ante la DGAC.' },
      { title: 'Solicitar la licencia', description: 'Presenta la documentación.' },
    ],
    prerequisites: ['No se requiere licencia previa'],
    attributes: ['Operar aeronaves ultralivianas motorizadas', 'Volar en condiciones VFR'],
    medicalClass: 'Clase 2',
    validity: '2 años (menores de 40) / 1 año (mayores de 40)',
    renewalInfo: 'Requiere certificado médico vigente.',
    faqs: [
      { question: '¿Qué diferencia hay entre ULM y LSA?', answer: 'El ULM se refiere a aeronaves ultralivianas motorizadas con límites de peso más bajos. El LSA cubre aeronaves deportivas livianas con límites ligeramente superiores.' },
    ],
  },

  ultraliviano: {
    licenseId: 'ultraliviano',
    pageTitle: 'Cómo Obtener la Licencia de Piloto Ultraliviano (Parapente / Ala Delta)',
    heroDescription: 'Guía para obtener la licencia de piloto ultraliviano en Chile para parapente y ala delta.',
    requirements: [
      { label: 'Edad mínima', value: '16 años', icon: '🎂' },
      { label: 'Certificado médico', value: 'MAE Clase 2', icon: '🏥' },
      { label: 'Instrucción', value: 'Curso con instructor certificado', icon: '📚' },
      { label: 'Regulación', value: 'DAN 61', icon: '📋' },
    ],
    steps: [
      { title: 'Obtener certificado médico', description: 'Realiza el MAE Clase 2.' },
      { title: 'Inscribirse con un instructor certificado', description: 'Busca un instructor o escuela de parapente/ala delta certificado por la DGAC.' },
      { title: 'Completar instrucción', description: 'Aprende aerodinámica de vuelo libre, meteorología, técnicas de despegue y aterrizaje, y normativa.' },
      { title: 'Aprobar examen teórico DGAC', description: 'Rinde el examen con 75% mínimo.' },
      { title: 'Aprobar evaluación práctica', description: 'Demuestra competencia en vuelo ante un evaluador.' },
      { title: 'Solicitar la licencia', description: 'Presenta la documentación.' },
    ],
    prerequisites: ['No se requiere licencia previa'],
    attributes: ['Volar parapente y ala delta', 'Participar en vuelos de distancia y competencias'],
    medicalClass: 'Clase 2',
    validity: '2 años (menores de 40) / 1 año (mayores de 40)',
    renewalInfo: 'Requiere certificado médico vigente.',
    faqs: [
      { question: '¿A qué edad puedo empezar a volar parapente?', answer: 'La edad mínima para la licencia es 16 años, la más baja junto con la de planeador. Es una excelente entrada al mundo de la aviación.' },
    ],
  },

  globo: {
    licenseId: 'globo',
    pageTitle: 'Cómo Obtener la Licencia de Piloto de Globo Aerostático en Chile',
    heroDescription: 'Requisitos y proceso para la licencia de piloto de globo aerostático o dirigible en Chile.',
    requirements: [
      { label: 'Edad mínima', value: '17 años', icon: '🎂' },
      { label: 'Certificado médico', value: 'MAE Clase 2', icon: '🏥' },
      { label: 'Instrucción', value: 'Curso en CIAC', icon: '📚' },
      { label: 'Regulación', value: 'DAN 61', icon: '📋' },
    ],
    steps: [
      { title: 'Obtener certificado médico', description: 'Realiza el MAE Clase 2.' },
      { title: 'Encontrar instrucción en globo', description: 'La oferta de instrucción en globo es limitada en Chile. Busca instructores certificados o CIAC especializados.' },
      { title: 'Completar instrucción teórica', description: 'Estudia aerostática, meteorología, navegación y reglamentación específica para globos.' },
      { title: 'Acumular vuelos de instrucción', description: 'Completa los vuelos requeridos en globo aerostático de aire caliente.' },
      { title: 'Aprobar examen teórico DGAC', description: 'Rinde el examen con 75% mínimo.' },
      { title: 'Aprobar pericia de vuelo', description: 'Demuestra competencia en operación de globo ante la DGAC.' },
    ],
    prerequisites: ['No se requiere licencia previa'],
    attributes: ['Operar globos aerostáticos de aire caliente', 'Operar dirigibles', 'Realizar vuelos turísticos y recreativos con globo'],
    medicalClass: 'Clase 2',
    validity: '2 años (menores de 40) / 1 año (mayores de 40)',
    renewalInfo: 'Requiere certificado médico vigente y actividad reciente.',
    faqs: [
      { question: '¿Hay instructores de globo en Chile?', answer: 'La oferta es muy limitada. Puede ser necesario buscar instrucción en el extranjero o contactar a pilotos de globo activos en Chile para coordinar la formación.' },
    ],
  },

  'instructor-vuelo': {
    licenseId: 'instructor-vuelo',
    pageTitle: 'Cómo Obtener la Habilitación de Instructor de Vuelo',
    heroDescription: 'Requisitos y proceso para obtener la habilitación de instructor de vuelo en Chile: experiencia, formación pedagógica y certificación DGAC.',
    requirements: [
      { label: 'Licencia previa', value: 'PCA vigente', icon: '📄' },
      { label: 'Certificado médico', value: 'MAE Clase 1', icon: '🏥' },
      { label: 'Experiencia', value: 'Horas de vuelo según categoría', icon: '✈️' },
      { label: 'Habilitación IFR', value: 'Requerida', icon: '🌙' },
      { label: 'Regulación', value: 'DAN 61', icon: '📋' },
    ],
    steps: [
      { title: 'Cumplir requisitos de experiencia', description: 'Debes tener PCA vigente con habilitación IFR y las horas de vuelo mínimas según la categoría de instructor.' },
      { title: 'Completar curso de instructor', description: 'Realiza el curso de habilitación de instructor de vuelo en un CIAC, incluyendo técnicas de instrucción y pedagogía aplicada.' },
      { title: 'Aprobar examen teórico DGAC', description: 'Rinde el examen sobre técnicas de instrucción, pedagogía, normativa y procedimientos.' },
      { title: 'Aprobar chequeo práctico', description: 'Demuestra competencia como instructor ante un inspector DGAC, incluyendo capacidad de enseñanza y corrección.' },
      { title: 'Solicitar la habilitación', description: 'Presenta la documentación para obtener tu habilitación de instructor de vuelo.' },
    ],
    prerequisites: [
      'Licencia de Piloto Comercial vigente',
      'Habilitación IFR vigente',
    ],
    attributes: [
      'Instruir a alumnos pilotos en vuelo',
      'Impartir instrucción teórica y práctica',
      'Supervisar vuelos solo de alumnos',
      'Avalar maniobras y competencias',
      'Trabajar en CIAC como instructor',
    ],
    medicalClass: 'Clase 1',
    validity: 'Según licencia base',
    renewalInfo: 'Se renueva junto con la licencia base. Requiere mantener actividad como instructor.',
    faqs: [
      { question: '¿Cuántas horas necesito para ser instructor?', answer: 'Varía según la categoría de instructor. Generalmente se requiere un mínimo de 200-250 horas de vuelo y PCA con IFR.' },
      { question: '¿Puedo ser instructor con licencia PPA?', answer: 'No. Se requiere licencia de Piloto Comercial (PCA) como mínimo para obtener la habilitación de instructor de vuelo.' },
    ],
  },

  'ingeniero-vuelo': {
    licenseId: 'ingeniero-vuelo',
    pageTitle: 'Cómo Obtener la Licencia de Ingeniero de Vuelo',
    heroDescription: 'Requisitos para obtener la licencia de Ingeniero de Vuelo en Chile: formación técnica, experiencia y certificación DGAC.',
    requirements: [
      { label: 'Edad mínima', value: '18 años', icon: '🎂' },
      { label: 'Certificado médico', value: 'MAE Clase 1', icon: '🏥' },
      { label: 'Formación', value: 'Técnica en sistemas de aeronaves', icon: '📚' },
      { label: 'Regulación', value: 'DAN 61', icon: '📋' },
    ],
    steps: [
      { title: 'Cumplir requisitos de edad y escolaridad', description: 'Debes tener al menos 18 años y formación técnica relevante.' },
      { title: 'Obtener certificado médico Clase 1', description: 'Realiza el MAE Clase 1 en un centro autorizado.' },
      { title: 'Completar formación técnica', description: 'Estudia sistemas de aeronaves, reglamentación, factores humanos e inglés técnico aeronáutico.' },
      { title: 'Aprobar examen teórico DGAC', description: 'Rinde el examen con 75% mínimo en todas las materias.' },
      { title: 'Completar requisitos prácticos', description: 'Acumula la experiencia práctica requerida en aeronaves que requieran posición de ingeniero de vuelo.' },
      { title: 'Solicitar la licencia', description: 'Presenta la documentación completa en la DGAC.' },
    ],
    prerequisites: ['Formación técnica en sistemas de aeronaves'],
    attributes: [
      'Desempeñarse como ingeniero de vuelo en aeronaves que lo requieran',
      'Monitorear y gestionar sistemas de aeronave durante el vuelo',
      'Calcular performance y peso y balance',
    ],
    medicalClass: 'Clase 1',
    validity: '1 año (menores de 40) / 6 meses (mayores de 40)',
    renewalInfo: 'Requiere MAE Clase 1 vigente y actividad reciente.',
    faqs: [
      { question: '¿Qué aeronaves requieren ingeniero de vuelo?', answer: 'Principalmente aeronaves antiguas de tres tripulantes. La mayoría de las aeronaves modernas ya no requieren esta posición, por lo que es una licencia cada vez menos común.' },
    ],
  },

  eov: {
    licenseId: 'eov',
    pageTitle: 'Cómo Obtener la Licencia de Encargado de Operaciones de Vuelo (EOV)',
    heroDescription: 'Guía para obtener la licencia de despachador de vuelo / encargado de operaciones en Chile.',
    requirements: [
      { label: 'Edad mínima', value: '21 años', icon: '🎂' },
      { label: 'Escolaridad', value: 'Enseñanza Media completa', icon: '📚' },
      { label: 'Certificado médico', value: 'MAE Clase 3', icon: '🏥' },
      { label: 'Experiencia', value: 'Según DAN 61', icon: '📋' },
      { label: 'Regulación', value: 'DAN 61', icon: '📋' },
    ],
    steps: [
      { title: 'Cumplir requisitos previos', description: 'Tener 21 años, enseñanza media completa y certificado médico.' },
      { title: 'Completar instrucción en CIAC', description: 'Realiza el curso de Encargado de Operaciones de Vuelo en un CIAC aprobado.' },
      { title: 'Aprobar examen teórico DGAC', description: 'Rinde el examen en meteorología, navegación, performance, reglamentación y planificación de vuelos.' },
      { title: 'Acumular experiencia práctica', description: 'Completa la experiencia operacional requerida en planificación y despacho de vuelos.' },
      { title: 'Solicitar la licencia', description: 'Presenta la documentación completa.' },
    ],
    prerequisites: ['Enseñanza Media completa'],
    attributes: [
      'Planificar y despachar vuelos comerciales',
      'Autorizar planes de vuelo operacionales',
      'Monitorear condiciones meteorológicas y NOTAM',
      'Coordinar con pilotos la planificación de ruta',
    ],
    medicalClass: 'Clase 3',
    validity: 'Según normativa vigente',
    renewalInfo: 'Requiere certificado médico vigente y actividad reciente en funciones de despacho.',
    faqs: [
      { question: '¿Qué hace un Encargado de Operaciones de Vuelo?', answer: 'Es el responsable de planificar y despachar vuelos: calcula combustible, analiza meteorología, selecciona rutas y asegura que cada vuelo cumpla con la normativa. Trabaja en conjunto con los pilotos.' },
      { question: '¿Necesito ser piloto para ser EOV?', answer: 'No es obligatorio ser piloto, pero conocimientos de aviación son esenciales. Muchos EOV tienen formación aeronáutica previa.' },
    ],
  },

  'mecanico-mantenimiento': {
    licenseId: 'mecanico-mantenimiento',
    pageTitle: 'Cómo Obtener la Licencia de Mecánico de Mantenimiento Aeronáutico',
    heroDescription: 'Requisitos, formación y proceso para obtener la licencia de mecánico de mantenimiento aeronáutico en Chile según DAN 66.',
    requirements: [
      { label: 'Edad mínima', value: '18 años', icon: '🎂' },
      { label: 'Escolaridad', value: 'Enseñanza Media completa', icon: '📚' },
      { label: 'Formación', value: 'Curso en CIAC o ETA', icon: '🔧' },
      { label: 'Experiencia', value: 'Práctica en mantenimiento', icon: '⚙️' },
      { label: 'Regulación', value: 'DAN 66', icon: '📋' },
    ],
    steps: [
      { title: 'Cumplir requisitos de edad y escolaridad', description: 'Tener 18 años y enseñanza media completa.' },
      { title: 'Completar formación técnica', description: 'Estudia en un CIAC o en la Escuela Técnica Aeronáutica (ETA) de la DGAC. El programa cubre sistemas de aeronaves, motores, estructuras y reglamentación.' },
      { title: 'Acumular experiencia práctica', description: 'Completa la experiencia práctica requerida trabajando en un taller de mantenimiento aeronáutico certificado.' },
      { title: 'Aprobar examen teórico DGAC', description: 'Rinde el examen teórico base con 75% mínimo en reglamentación, factores humanos, ciencias básicas y materias técnicas.' },
      { title: 'Aprobar evaluación práctica', description: 'Demuestra competencia práctica en tareas de mantenimiento aeronáutico.' },
      { title: 'Solicitar la licencia', description: 'Presenta la documentación y obtén tu licencia base de mecánico de mantenimiento.' },
    ],
    prerequisites: ['Enseñanza Media completa'],
    attributes: [
      'Realizar mantenimiento en aeronaves según habilitación',
      'Firmar liberaciones de mantenimiento',
      'Trabajar en talleres aeronáuticos certificados',
      'Obtener habilitaciones específicas (motores, estructuras, aviónica)',
    ],
    medicalClass: 'No se requiere MAE',
    validity: 'Según normativa DAN 66',
    renewalInfo: 'La licencia se mantiene vigente con actividad reciente en mantenimiento. Se requiere experiencia continua para mantener las habilitaciones.',
    faqs: [
      { question: '¿Dónde puedo estudiar mecánica aeronáutica en Chile?', answer: 'En la Escuela Técnica Aeronáutica (ETA) de la DGAC, en CIAC aprobados y en instituciones técnicas que ofrezcan programas de mantenimiento aeronáutico.' },
      { question: '¿Qué habilitaciones puedo obtener?', answer: 'Existen habilitaciones por especialidad: motores (pistón y turbina), estructuras metálicas y compuestas, aviónica, instrumentos y más. Cada una requiere formación y experiencia específica.' },
      { question: '¿Hay demanda laboral para mecánicos aeronáuticos?', answer: 'Sí, existe buena demanda en aerolíneas, talleres de mantenimiento, operadores charter y la industria de defensa. Es una carrera con buenas perspectivas laborales.' },
    ],
  },

  'supervisor-mantenimiento': {
    licenseId: 'supervisor-mantenimiento',
    pageTitle: 'Cómo Obtener la Licencia de Supervisor de Mantenimiento Aeronáutico',
    heroDescription: 'Guía para obtener la licencia de supervisor de mantenimiento: requisitos avanzados, experiencia y proceso DGAC según DAN 66.',
    requirements: [
      { label: 'Edad mínima', value: '21 años', icon: '🎂' },
      { label: 'Licencia previa', value: 'Mecánico de Mantenimiento', icon: '📄' },
      { label: 'Experiencia', value: 'Años en mantenimiento aeronáutico', icon: '⚙️' },
      { label: 'Regulación', value: 'DAN 66', icon: '📋' },
    ],
    steps: [
      { title: 'Contar con licencia de mecánico', description: 'Debes tener licencia de Mecánico de Mantenimiento Aeronáutico vigente con habilitaciones activas.' },
      { title: 'Acumular experiencia profesional', description: 'Trabaja los años requeridos en mantenimiento aeronáutico para cumplir con la experiencia mínima.' },
      { title: 'Completar formación adicional', description: 'Realiza cursos avanzados de gestión de mantenimiento, calidad y supervisión.' },
      { title: 'Aprobar examen teórico DGAC', description: 'Rinde el examen avanzado de supervisor con 75% mínimo en reglamentación, gestión y materias técnicas avanzadas.' },
      { title: 'Solicitar la licencia', description: 'Presenta la documentación y experiencia acreditada.' },
    ],
    prerequisites: ['Licencia de Mecánico de Mantenimiento vigente', 'Experiencia profesional en mantenimiento'],
    attributes: [
      'Supervisar actividades de mantenimiento aeronáutico',
      'Firmar liberaciones de mantenimiento mayor',
      'Gestionar equipos de mantenimiento',
      'Asegurar cumplimiento normativo en talleres',
    ],
    medicalClass: 'No se requiere MAE',
    validity: 'Según normativa DAN 66',
    renewalInfo: 'Requiere actividad profesional continua y cumplimiento de los requisitos de la DAN 66.',
    faqs: [
      { question: '¿Cuántos años de experiencia necesito?', answer: 'La DAN 66 establece requisitos específicos de experiencia que varían según la habilitación. Generalmente se requieren varios años de trabajo como mecánico antes de poder optar a supervisor.' },
    ],
  },

  oce: {
    licenseId: 'oce',
    pageTitle: 'Cómo Obtener la Licencia de Operador de Carga y Estiba',
    heroDescription: 'Requisitos y proceso para obtener la licencia de Operador de Carga y Estiba de aeronaves en Chile.',
    requirements: [
      { label: 'Edad mínima', value: '18 años', icon: '🎂' },
      { label: 'Escolaridad', value: 'Enseñanza Media completa', icon: '📚' },
      { label: 'Formación', value: 'Curso en CIAC', icon: '📋' },
      { label: 'Regulación', value: 'DAN 61', icon: '📋' },
    ],
    steps: [
      { title: 'Cumplir requisitos previos', description: 'Tener 18 años y enseñanza media completa.' },
      { title: 'Completar instrucción', description: 'Realiza el curso de Operador de Carga y Estiba en un CIAC aprobado.' },
      { title: 'Aprobar examen teórico DGAC', description: 'Rinde el examen en peso y balance, carga de aeronaves, mercancías peligrosas y reglamentación.' },
      { title: 'Solicitar la licencia', description: 'Presenta la documentación completa.' },
    ],
    prerequisites: ['Enseñanza Media completa'],
    attributes: [
      'Calcular peso y balance de aeronaves',
      'Supervisar carga y descarga de aeronaves',
      'Gestionar mercancías peligrosas según normativa',
      'Elaborar hojas de carga y trimado',
    ],
    medicalClass: 'No se requiere MAE',
    validity: 'Según normativa vigente',
    renewalInfo: 'Requiere actividad reciente en funciones de carga y estiba.',
    faqs: [
      { question: '¿Dónde trabaja un Operador de Carga y Estiba?', answer: 'En aerolíneas, empresas de handling aeroportuario, operadores de carga aérea y compañías de servicios de rampa.' },
    ],
  },

  tac: {
    licenseId: 'tac',
    pageTitle: 'Cómo Obtener la Licencia de Tripulante de Cabina (TAC)',
    heroDescription: 'Guía completa para obtener la licencia de Tripulante Auxiliar de Cabina en Chile: requisitos, formación y certificación DGAC.',
    requirements: [
      { label: 'Edad mínima', value: '18 años', icon: '🎂' },
      { label: 'Escolaridad', value: 'Enseñanza Media completa', icon: '📚' },
      { label: 'Certificado médico', value: 'MAE Clase 2', icon: '🏥' },
      { label: 'Idioma', value: 'Español e inglés básico', icon: '🗣️' },
      { label: 'Regulación', value: 'DAN 61', icon: '📋' },
    ],
    steps: [
      { title: 'Cumplir requisitos de edad y escolaridad', description: 'Tener 18 años y enseñanza media completa.' },
      { title: 'Obtener certificado médico', description: 'Realiza el MAE Clase 2 en un centro autorizado.' },
      { title: 'Completar curso TAC', description: 'Inscríbete en un CIAC y completa el programa de Tripulante de Cabina: reglamentación, emergencias, primeros auxilios y servicio.' },
      { title: 'Aprobar examen teórico DGAC', description: 'Rinde el examen con 75% mínimo en reglamentación, emergencias generales y procedimientos.' },
      { title: 'Obtener habilitación de tipo', description: 'Completa la habilitación específica para el tipo de aeronave donde trabajarás (generalmente proporcionada por la aerolínea).' },
      { title: 'Solicitar la licencia', description: 'Presenta la documentación completa en la DGAC.' },
    ],
    prerequisites: ['Enseñanza Media completa'],
    attributes: [
      'Desempeñarse como tripulante de cabina en aerolíneas',
      'Gestionar emergencias a bordo',
      'Realizar procedimientos de evacuación',
      'Prestar primeros auxilios en vuelo',
    ],
    medicalClass: 'Clase 2',
    validity: '2 años (menores de 40) / 1 año (mayores de 40)',
    renewalInfo: 'Requiere certificado médico vigente y entrenamiento recurrente anual proporcionado por la aerolínea.',
    faqs: [
      { question: '¿Necesito hablar inglés para ser TCP?', answer: 'Se requiere un nivel básico de inglés para la licencia. Las aerolíneas internacionales suelen exigir un nivel intermedio o avanzado.' },
      { question: '¿Las aerolíneas dan formación adicional?', answer: 'Sí, las aerolíneas proporcionan entrenamiento específico para el tipo de aeronave, procedimientos de la compañía y entrenamiento recurrente anual obligatorio.' },
      { question: '¿Cuánto gana un tripulante de cabina en Chile?', answer: 'Los salarios varían entre $600.000 y $2.500.000 CLP mensuales dependiendo de la aerolínea, antigüedad, y si son vuelos nacionales o internacionales.' },
    ],
  },

  'habilitaciones-transporte': {
    licenseId: 'habilitaciones-transporte',
    pageTitle: 'Cómo Obtener Habilitaciones de Tipo para Aeronaves de Transporte',
    heroDescription: 'Proceso para obtener habilitaciones de tipo en aeronaves de línea aérea: A320, B737, B787 y más.',
    requirements: [
      { label: 'Licencia previa', value: 'PCA o PTLA vigente', icon: '📄' },
      { label: 'Certificado médico', value: 'MAE Clase 1', icon: '🏥' },
      { label: 'Habilitación IFR', value: 'Vigente', icon: '🌙' },
      { label: 'Curso de tipo', value: 'En centro autorizado', icon: '✈️' },
      { label: 'Regulación', value: 'DAN 61', icon: '📋' },
    ],
    steps: [
      { title: 'Contar con licencia y habilitaciones previas', description: 'Debes tener PCA o PTLA vigente con habilitación IFR y multimotor.' },
      { title: 'Completar curso teórico de tipo', description: 'Realiza el curso de conocimiento del tipo de aeronave (sistemas, limitaciones, procedimientos normales y de emergencia).' },
      { title: 'Completar entrenamiento en simulador', description: 'Realiza las sesiones de simulador de vuelo para el tipo de aeronave, practicando todos los procedimientos.' },
      { title: 'Aprobar examen teórico DGAC', description: 'Rinde el examen de habilitación de tipo con 75% mínimo.' },
      { title: 'Aprobar chequeo práctico', description: 'Demuestra competencia en el simulador o aeronave ante un inspector DGAC o examinador designado.' },
    ],
    prerequisites: [
      'Licencia de Piloto Comercial o PTLA vigente',
      'Habilitación IFR y Multimotor vigentes',
    ],
    attributes: [
      'Operar el tipo específico de aeronave habilitado',
      'Acceso a posiciones en aerolíneas que operan ese tipo',
    ],
    medicalClass: 'Clase 1',
    validity: 'Según licencia base',
    renewalInfo: 'Las habilitaciones de tipo requieren chequeos de competencia periódicos (generalmente semestrales o anuales) en simulador.',
    faqs: [
      { question: '¿Quién paga el curso de tipo?', answer: 'Generalmente la aerolínea paga el curso de tipo cuando te contrata. Algunos pilotos se autofinancian para mejorar su empleabilidad, pero esto tiene un costo muy elevado.' },
      { question: '¿Cuánto cuesta un curso de tipo?', answer: 'Un curso de tipo para A320 o B737 puede costar entre $15.000 y $30.000 USD. Es una inversión significativa que las aerolíneas suelen asumir.' },
    ],
  },
}

export function getGuideByLicenseId(licenseId: string): LicenseGuide | undefined {
  return guides[licenseId]
}

export function getAllGuides(): LicenseGuide[] {
  return Object.values(guides)
}
