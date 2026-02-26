<template>
  <div class="landing">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg">
        <div class="hero-glow"></div>
        <div class="hero-grid"></div>
      </div>
      <div class="container hero-inner">
        <div class="hero-content">
          <div class="social-proof">
            <div class="stars">
              <svg v-for="i in 5" :key="i" width="16" height="16" viewBox="0 0 24 24" fill="#FACC15"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <span class="social-text">Utilizada por estudiantes de aviación en todo Chile</span>
          </div>
          <h1 class="hero-title">
            Aprueba tu examen<br />
            DGAC <em>a la primera</em>
          </h1>
          <p class="hero-subtitle">
            Más de 10,000 preguntas reales organizadas por licencia y tema. 
            Practica con exámenes cronometrados, revisa explicaciones detalladas 
            y llega preparado el día del examen.
          </p>
          <div class="hero-actions">
            <a href="#planes" class="btn-primary">
              Comenzar Ahora
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#funcionalidades" class="btn-ghost">
              Ver funcionalidades
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17l9.2-9.2M17 17V7.8H7.8"/></svg>
            </a>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-value">10,000+</span>
              <span class="stat-label">Preguntas</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-value">19</span>
              <span class="stat-label">Licencias</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-value">95%</span>
              <span class="stat-label">Aprobación</span>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="app-preview">
            <div class="app-preview-glow"></div>
            <div class="app-preview-frame">
              <img src="/icon.png" alt="Piloteai App" class="app-icon" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Logos / Trust bar -->
    <section class="trust-bar">
      <div class="container">
        <p class="trust-label">Preparación para todas las licencias de la DGAC de Chile</p>
      </div>
    </section>

    <!-- Features -->
    <section id="funcionalidades" class="features">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Funcionalidades</span>
          <h2 class="section-title">Todo lo que necesitas<br /><em>para aprobar</em></h2>
          <p class="section-desc">Herramientas diseñadas para maximizar tu rendimiento en el examen DGAC.</p>
        </div>
        <div class="features-grid">
          <div class="feature-card" v-for="(feature, i) in features" :key="i">
            <div class="feature-icon-wrap">
              <span class="feature-icon">{{ feature.icon }}</span>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="how-it-works">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Cómo funciona</span>
          <h2 class="section-title">Del registro<br /><em>al examen aprobado</em></h2>
        </div>
        <div class="steps-grid">
          <div class="step" v-for="(step, i) in steps" :key="i">
            <div class="step-number">{{ String(i + 1).padStart(2, '0') }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Licenses -->
    <section class="licenses">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Cobertura completa</span>
          <h2 class="section-title">19 licencias<br /><em>disponibles</em></h2>
          <p class="section-desc">Desde piloto privado hasta línea aérea, incluyendo helicópteros, drones y más.</p>
        </div>
        <div class="licenses-grid">
          <div class="license-pill" v-for="license in licenses" :key="license">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            {{ license }}
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="faq">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Preguntas frecuentes</span>
          <h2 class="section-title">Resuelve tus<br /><em>dudas</em></h2>
        </div>
        <div class="faq-list">
          <details v-for="(item, i) in faqs" :key="i" class="faq-item">
            <summary class="faq-question">
              <span>{{ item.q }}</span>
              <svg class="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </summary>
            <p class="faq-answer">{{ item.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="planes" class="pricing">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Planes</span>
          <h2 class="section-title">Elige tu plan<br /><em>y empieza hoy</em></h2>
          <p class="section-desc">Acceso completo a todas las licencias, preguntas y funcionalidades. Sin letra chica.</p>
        </div>
        <!-- Email modal -->
        <div v-if="showEmailModal" class="email-overlay" @click.self="showEmailModal = false">
          <div class="email-modal">
            <button class="email-modal-close" @click="showEmailModal = false">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <h3 class="email-modal-title">Ingresa tu email para continuar</h3>
            <p class="email-modal-plan">{{ selectedPlanLabel }}</p>
            <input
              v-model="checkoutEmail"
              type="email"
              placeholder="tu@email.com"
              class="email-modal-input"
              @keyup.enter="handleCheckout"
            />
            <button
              class="btn-plan btn-plan-primary"
              :disabled="checkoutLoading || !checkoutEmail"
              @click="handleCheckout"
            >
              {{ checkoutLoading ? 'Redirigiendo...' : 'Ir a pagar' }}
            </button>
            <p v-if="checkoutError" class="email-modal-error">{{ checkoutError }}</p>
          </div>
        </div>

        <div class="pricing-grid">
          <!-- Monthly -->
          <div class="pricing-card">
            <div class="pricing-card-inner">
              <div class="pricing-header">
                <span class="plan-name">Mensual</span>
                <p class="plan-desc">Ideal para preparar un examen puntual</p>
              </div>
              <div class="pricing-price">
                <span class="price-currency">$</span>
                <span class="price-amount">9.990</span>
                <span class="price-period">/mes</span>
              </div>
              <ul class="pricing-features">
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Acceso a las 19 licencias
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  +10,000 preguntas reales
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Exámenes cronometrados
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Seguimiento de progreso
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Cancela cuando quieras
                </li>
              </ul>
              <button class="btn-plan btn-plan-outline" @click="selectPlan('mensual')">
                Suscribirme
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>

          <!-- Annual -->
          <div class="pricing-card pricing-card-featured">
            <div class="pricing-badge">Ahorra 60%</div>
            <div class="pricing-card-inner">
              <div class="pricing-header">
                <span class="plan-name">Anual</span>
                <p class="plan-desc">Para quienes van en serio con su carrera</p>
              </div>
              <div class="pricing-price">
                <span class="price-currency">$</span>
                <span class="price-amount">47.990</span>
                <span class="price-period">/año</span>
              </div>
              <div class="price-equivalent">Equivale a <strong>$3.999/mes</strong></div>
              <ul class="pricing-features">
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Todo del plan Mensual
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  12 meses de acceso completo
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Lecciones por materia incluidas
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Pago único, sin renovación
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Soporte prioritario
                </li>
              </ul>
              <button class="btn-plan btn-plan-primary" @click="selectPlan('anual')">
                Elegir Plan Anual
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <div class="container">
        <div class="cta-card">
          <div class="cta-glow"></div>
          <div class="cta-content">
            <h2>Empieza a estudiar<br /><em>hoy mismo</em></h2>
            <p>Accede a miles de preguntas reales, exámenes cronometrados y seguimiento de progreso. Prepara tu examen DGAC con confianza.</p>
            <a href="#planes" class="btn-primary btn-lg">
              Comenzar Ahora
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showEmailModal = ref(false)
const selectedPlan = ref('mensual')
const checkoutEmail = ref('')
const checkoutLoading = ref(false)
const checkoutError = ref('')

const selectedPlanLabel = computed(() =>
  selectedPlan.value === 'mensual' ? 'Plan Mensual - $9.990/mes' : 'Plan Anual - $47.990/año'
)

function selectPlan(plan) {
  selectedPlan.value = plan
  checkoutError.value = ''
  showEmailModal.value = true
}

async function handleCheckout() {
  if (!checkoutEmail.value || checkoutLoading.value) return

  checkoutLoading.value = true
  checkoutError.value = ''

  try {
    const endpoint = selectedPlan.value === 'mensual'
      ? '/api/payments/create-subscription'
      : '/api/payments/create-preference'

    const { url } = await $fetch(endpoint, {
      method: 'POST',
      body: { email: checkoutEmail.value },
    })

    if (url) {
      window.location.href = url
    }
  } catch (err) {
    checkoutError.value = err?.data?.statusMessage || 'Error al procesar el pago. Intenta de nuevo.'
  } finally {
    checkoutLoading.value = false
  }
}

const features = [
  { icon: '✈️', title: '19 Licencias', desc: 'Desde PPL hasta PTLA, incluyendo helicópteros, drones, planeadores y más categorías.' },
  { icon: '📝', title: 'Exámenes Personalizados', desc: 'Filtra por licencia y tema. Configura cantidad de preguntas y tiempo límite a tu medida.' },
  { icon: '📊', title: 'Seguimiento de Progreso', desc: 'Visualiza tu avance por materia, acumula XP y mantén tu racha de estudio activa.' },
  { icon: '🔍', title: 'Revisión Detallada', desc: 'Revisa cada respuesta con explicaciones completas. Identifica y refuerza tus áreas débiles.' },
  { icon: '📚', title: 'Lecciones por Materia', desc: 'Estudia con contenido organizado: aerodinámica, meteorología, navegación y más temas.' },
  { icon: '🏆', title: '+10,000 Preguntas', desc: 'Base de datos extensa con preguntas reales basadas en exámenes DGAC actualizados.' },
]

const steps = [
  { title: 'Crea tu cuenta', desc: 'Regístrate en segundos con Google o Apple y accede a la plataforma.' },
  { title: 'Elige tu licencia', desc: 'Selecciona la licencia que quieres obtener y accede a las preguntas relevantes.' },
  { title: 'Practica y mide tu progreso', desc: 'Realiza exámenes cronometrados, revisa explicaciones y sube de nivel.' },
  { title: 'Aprueba tu examen', desc: 'Llega al examen DGAC con la confianza de haber practicado con miles de preguntas.' },
]

const faqs = [
  { q: '¿Las preguntas son oficiales de la DGAC?', a: 'Las preguntas están basadas en el temario oficial de exámenes DGAC y cubren todas las materias requeridas para cada licencia.' },
  { q: '¿Qué licencias cubre Piloteai?', a: 'Cubrimos las 19 licencias aeronáuticas de la DGAC: desde Piloto Privado de Avión (PPL) hasta Piloto de Transporte de Línea Aérea (PTLA), incluyendo helicópteros, drones, planeadores, instructor de vuelo y más.' },
  { q: '¿Cómo se organizan las preguntas?', a: 'Las preguntas están organizadas por licencia y por tema (aerodinámica, meteorología, navegación, regulaciones, etc.). Puedes crear exámenes personalizados eligiendo la cantidad de preguntas y el tiempo límite.' },
  { q: '¿Puedo ver explicaciones de las respuestas?', a: 'Sí. Cada pregunta incluye una revisión detallada con la respuesta correcta y su explicación, para que puedas entender el razonamiento detrás de cada respuesta.' },
  { q: '¿Cómo elimino mi cuenta?', a: 'Puedes eliminar tu cuenta y todos los datos asociados desde la sección de Perfil. Al hacerlo, se eliminará permanentemente toda tu información, incluyendo progreso y resultados de exámenes.' },
  { q: '¿Tienen soporte si tengo un problema?', a: 'Sí, puedes contactarnos en soporte@piloteai.cl. Respondemos lo antes posible a cualquier consulta, reporte de problema o sugerencia.' },
]

const licenses = [
  'Piloto Privado Avión',
  'Piloto Comercial Avión',
  'PTLA Línea Aérea',
  'Piloto Privado Helicóptero',
  'Piloto Comercial Helicóptero',
  'Habilitación Multimotor',
  'Habilitaciones Aviones Transporte',
  'Instructor de Vuelo',
  'Ingeniero de Vuelo',
  'Encargado Operaciones de Vuelo',
  'Mecánico de Mantenimiento',
  'Supervisor de Mantenimiento',
  'TAC Tripulante Aeronaves',
  'Operador de Carga y Estiba',
  'RPA Operador de Drones',
  'Piloto Planeador',
  'Piloto LSA/ULM',
  'Piloto Globo/Dirigible',
  'Piloto Ultraliviano',
]
</script>

<style scoped>
/* ─── Container ─── */
.container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 28px;
}

/* ─── Section Header ─── */
.section-header {
  text-align: center;
  margin-bottom: 56px;
}

.section-tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent);
  background: var(--accent-glow);
  border: 1px solid rgba(62, 189, 79, 0.2);
  padding: 6px 16px;
  border-radius: 100px;
  margin-bottom: 20px;
}

.section-title {
  font-family: var(--font-body);
  font-size: 40px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.025em;
  color: var(--text-primary);
}

.section-title em {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  color: var(--accent);
}

.section-desc {
  font-size: 17px;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 520px;
  margin: 16px auto 0;
}

/* ─── Hero ─── */
.hero {
  position: relative;
  padding: 100px 0 80px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-glow {
  position: absolute;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;
  height: 600px;
  background: radial-gradient(ellipse at center, rgba(62, 189, 79, 0.08) 0%, transparent 70%);
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse at center top, black 30%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at center top, black 30%, transparent 70%);
}

.hero-inner {
  position: relative;
  display: flex;
  align-items: center;
  gap: 72px;
}

.hero-content {
  flex: 1;
  min-width: 0;
}

.social-proof {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 28px;
  padding: 8px 16px 8px 12px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 100px;
}

.stars {
  display: flex;
  gap: 2px;
}

.social-text {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 500;
}

.hero-title {
  font-family: var(--font-body);
  font-size: 56px;
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
}

.hero-title em {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  color: var(--accent);
}

.hero-subtitle {
  font-size: 17px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 36px;
  max-width: 480px;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 48px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--accent);
  color: #fff;
  padding: 15px 28px;
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
  letter-spacing: 0.01em;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(62, 189, 79, 0.2), inset 0 1px 0 rgba(255,255,255,0.15);
}

.btn-primary:hover {
  background: var(--accent-hover);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(62, 189, 79, 0.35), inset 0 1px 0 rgba(255,255,255,0.15);
}

.btn-lg {
  padding: 18px 36px;
  font-size: 16px;
  border-radius: var(--radius-lg);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  padding: 15px 24px;
  border: 1px solid var(--border-hover);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.btn-ghost:hover {
  color: var(--text-primary);
  border-color: rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.03);
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 28px;
}

.stat-value {
  display: block;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.stat-label {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--border-hover);
}

.hero-visual {
  flex-shrink: 0;
}

.app-preview {
  position: relative;
  width: 320px;
  height: 320px;
}

.app-preview-glow {
  position: absolute;
  inset: -40px;
  background: radial-gradient(circle at center, var(--accent-glow-strong) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse-glow 4s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

.app-preview-frame {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, var(--bg-surface), var(--bg-elevated));
  border-radius: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-hover);
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.4),
    0 8px 24px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255,255,255,0.04);
}

.app-icon {
  width: 200px;
  height: 200px;
  border-radius: 36px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* ─── Trust Bar ─── */
.trust-bar {
  padding: 40px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.trust-label {
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}

/* ─── Features ─── */
.features {
  padding: 100px 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.feature-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 36px 28px;
  transition: all 0.3s ease;
}

.feature-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
}

.feature-icon-wrap {
  width: 48px;
  height: 48px;
  background: var(--accent-glow);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  border: 1px solid rgba(62, 189, 79, 0.12);
}

.feature-icon {
  font-size: 22px;
  line-height: 1;
}

.feature-card h3 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 8px;
  letter-spacing: -0.01em;
}

.feature-card p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.65;
}

/* ─── How it Works ─── */
.how-it-works {
  padding: 80px 0 100px;
  background: var(--bg-surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.step {
  position: relative;
}

.step-number {
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -0.04em;
  margin-bottom: 16px;
  line-height: 1;
  background: linear-gradient(180deg, var(--accent) 0%, rgba(62, 189, 79, 0.3) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.step h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  letter-spacing: -0.01em;
}

.step p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.65;
}

/* ─── Licenses ─── */
.licenses {
  padding: 100px 0;
}

.licenses-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  max-width: 900px;
  margin: 0 auto;
}

.license-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  padding: 11px 20px;
  border-radius: 100px;
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
  transition: all 0.2s ease;
}

.license-pill:hover {
  border-color: rgba(62, 189, 79, 0.3);
  color: var(--text-primary);
  background: var(--accent-glow);
}

/* ─── FAQ ─── */
.faq {
  padding: 100px 0;
  background: var(--bg-surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.faq-list {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-item {
  background: var(--bg-dark);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition: border-color 0.2s ease;
}

.faq-item[open] {
  border-color: var(--border-hover);
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  list-style: none;
  user-select: none;
}

.faq-question::-webkit-details-marker {
  display: none;
}

.faq-chevron {
  flex-shrink: 0;
  color: var(--text-muted);
  transition: transform 0.25s ease;
}

.faq-item[open] .faq-chevron {
  transform: rotate(180deg);
  color: var(--accent);
}

.faq-answer {
  padding: 0 24px 20px;
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* ─── Email Modal ─── */
.email-overlay {
  position: fixed;
  inset: 0;
  background: rgba(6, 14, 26, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
}

.email-modal {
  position: relative;
  background: var(--bg-surface);
  border: 1px solid var(--border-hover);
  border-radius: var(--radius-xl);
  padding: 40px 32px 36px;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.04);
  text-align: center;
}

.email-modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s;
}

.email-modal-close:hover {
  color: var(--text-primary);
}

.email-modal-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.email-modal-plan {
  font-size: 14px;
  color: var(--accent);
  margin-bottom: 24px;
  font-weight: 500;
}

.email-modal-input {
  width: 100%;
  padding: 14px 16px;
  font-size: 15px;
  border: 1px solid var(--border-hover);
  background: var(--bg-dark);
  color: var(--text-primary);
  border-radius: var(--radius-md);
  margin-bottom: 16px;
  font-family: var(--font-body);
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.email-modal-input::placeholder {
  color: var(--text-muted);
}

.email-modal-input:focus {
  border-color: var(--accent);
}

.email-modal-error {
  color: #EF4444;
  font-size: 13px;
  margin-top: 12px;
}

/* ─── Pricing ─── */
.pricing {
  padding: 100px 0;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  max-width: 820px;
  margin: 0 auto;
}

.pricing-card {
  position: relative;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  transition: all 0.35s ease;
}

.pricing-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
}

.pricing-card-featured {
  background: linear-gradient(160deg, var(--bg-surface) 0%, rgba(62, 189, 79, 0.04) 100%);
  border-color: rgba(62, 189, 79, 0.25);
  box-shadow: 0 0 0 1px rgba(62, 189, 79, 0.08), 0 8px 40px rgba(62, 189, 79, 0.08);
}

.pricing-card-featured:hover {
  border-color: rgba(62, 189, 79, 0.4);
  box-shadow: 0 0 0 1px rgba(62, 189, 79, 0.15), 0 24px 72px rgba(62, 189, 79, 0.12);
}

.pricing-badge {
  position: absolute;
  top: -13px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 6px 20px;
  border-radius: 100px;
  box-shadow: 0 4px 16px rgba(62, 189, 79, 0.3);
  white-space: nowrap;
}

.pricing-card-inner {
  padding: 44px 36px 40px;
}

.pricing-header {
  margin-bottom: 28px;
}

.plan-name {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.plan-desc {
  font-size: 14px;
  color: var(--text-muted);
  margin-top: 6px;
  line-height: 1.5;
}

.pricing-price {
  display: flex;
  align-items: baseline;
  gap: 2px;
  margin-bottom: 8px;
}

.price-currency {
  font-size: 22px;
  font-weight: 600;
  color: var(--text-secondary);
  align-self: flex-start;
  margin-top: 6px;
}

.price-amount {
  font-size: 52px;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
  color: var(--text-primary);
}

.price-period {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-muted);
  margin-left: 4px;
}

.price-equivalent {
  font-size: 13px;
  color: var(--accent);
  margin-bottom: 28px;
  font-weight: 500;
}

.price-equivalent strong {
  font-weight: 700;
}

.pricing-features {
  list-style: none;
  padding: 0;
  margin: 28px 0 36px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.pricing-features li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

.pricing-features li svg {
  flex-shrink: 0;
}

.btn-plan {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 16px 24px;
  border-radius: var(--radius-md);
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
  cursor: pointer;
  border: none;
}

.btn-plan-outline {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-hover);
}

.btn-plan-outline:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.2);
  color: var(--text-primary);
  transform: translateY(-1px);
}

.btn-plan-primary {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 2px 8px rgba(62, 189, 79, 0.25), inset 0 1px 0 rgba(255,255,255,0.15);
}

.btn-plan-primary:hover {
  background: var(--accent-hover);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(62, 189, 79, 0.35), inset 0 1px 0 rgba(255,255,255,0.15);
}

/* ─── CTA ─── */
.cta {
  padding: 100px 0;
}

.cta-card {
  position: relative;
  background: linear-gradient(145deg, var(--bg-surface), var(--bg-elevated));
  border: 1px solid var(--border-hover);
  border-radius: var(--radius-xl);
  padding: 80px 48px;
  text-align: center;
  overflow: hidden;
}

.cta-glow {
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 300px;
  background: radial-gradient(ellipse at center, rgba(62, 189, 79, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.cta-content {
  position: relative;
}

.cta-content h2 {
  font-family: var(--font-body);
  font-size: 40px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.025em;
  margin-bottom: 16px;
}

.cta-content h2 em {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  color: var(--accent);
}

.cta-content p {
  font-size: 17px;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 460px;
  margin: 0 auto 32px;
}

/* ─── Responsive: Tablet ─── */
@media (max-width: 1024px) {
  .container {
    padding: 0 24px;
  }

  .hero {
    padding: 72px 0 60px;
  }

  .hero-inner {
    gap: 48px;
  }

  .hero-title {
    font-size: 44px;
  }

  .app-preview {
    width: 260px;
    height: 260px;
  }

  .app-icon {
    width: 160px;
    height: 160px;
    border-radius: 30px;
  }

  .app-preview-frame {
    border-radius: 40px;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .steps-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .section-title {
    font-size: 34px;
  }

  .features,
  .licenses,
  .faq,
  .pricing {
    padding: 80px 0;
  }

  .how-it-works {
    padding: 64px 0 80px;
  }

  .cta {
    padding: 80px 0;
  }

  .pricing-grid {
    max-width: 700px;
  }

  .pricing-card-inner {
    padding: 36px 28px 32px;
  }

  .price-amount {
    font-size: 44px;
  }
}

/* ─── Responsive: Mobile ─── */
@media (max-width: 640px) {
  .container {
    padding: 0 20px;
  }

  /* Hero */
  .hero {
    padding: 48px 0 40px;
  }

  .hero-inner {
    flex-direction: column;
    text-align: center;
    gap: 36px;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .hero-visual {
    order: -1;
  }

  .social-proof {
    padding: 6px 12px 6px 10px;
    gap: 8px;
    margin-bottom: 24px;
  }

  .social-text {
    font-size: 12px;
  }

  .hero-title {
    font-size: 32px;
    line-height: 1.1;
    margin-bottom: 16px;
  }

  .hero-subtitle {
    font-size: 15px;
    max-width: 100%;
    margin-bottom: 28px;
    line-height: 1.65;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
    gap: 12px;
    margin-bottom: 36px;
  }

  .btn-primary,
  .btn-ghost {
    width: 100%;
    justify-content: center;
    padding: 14px 24px;
    font-size: 15px;
  }

  .hero-stats {
    justify-content: center;
    gap: 20px;
  }

  .stat-value {
    font-size: 24px;
  }

  .stat-label {
    font-size: 11px;
  }

  .stat-divider {
    height: 32px;
  }

  .app-preview {
    width: 180px;
    height: 180px;
  }

  .app-icon {
    width: 110px;
    height: 110px;
    border-radius: 24px;
  }

  .app-preview-frame {
    border-radius: 32px;
  }

  /* Trust bar */
  .trust-bar {
    padding: 28px 0;
  }

  .trust-label {
    font-size: 11px;
    letter-spacing: 0.08em;
  }

  /* Section headers */
  .section-header {
    margin-bottom: 36px;
  }

  .section-tag {
    font-size: 11px;
    padding: 5px 12px;
    margin-bottom: 16px;
  }

  .section-title {
    font-size: 28px;
  }

  .section-desc {
    font-size: 15px;
    margin-top: 12px;
  }

  /* Features */
  .features {
    padding: 60px 0;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .feature-card {
    padding: 28px 22px;
    border-radius: var(--radius-md);
  }

  .feature-icon-wrap {
    width: 42px;
    height: 42px;
    margin-bottom: 16px;
  }

  .feature-icon {
    font-size: 20px;
  }

  .feature-card h3 {
    font-size: 16px;
  }

  .feature-card p {
    font-size: 13px;
  }

  /* How it works */
  .how-it-works {
    padding: 60px 0;
  }

  .steps-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .step {
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }

  .step-number {
    font-size: 36px;
    margin-bottom: 0;
    flex-shrink: 0;
    width: 48px;
  }

  .step h3 {
    font-size: 15px;
    margin-bottom: 4px;
  }

  .step p {
    font-size: 13px;
  }

  /* Licenses */
  .licenses {
    padding: 60px 0;
  }

  .licenses-grid {
    gap: 8px;
  }

  .license-pill {
    padding: 9px 14px;
    font-size: 13px;
    gap: 6px;
  }

  .license-pill svg {
    width: 12px;
    height: 12px;
  }

  /* FAQ */
  .faq {
    padding: 60px 0;
  }

  .faq-list {
    gap: 10px;
  }

  .faq-question {
    padding: 16px 18px;
    font-size: 14px;
    gap: 12px;
  }

  .faq-chevron {
    width: 18px;
    height: 18px;
  }

  .faq-answer {
    padding: 0 18px 16px;
    font-size: 13px;
  }

  /* Email modal */
  .email-modal {
    padding: 32px 24px 28px;
  }

  .email-modal-title {
    font-size: 18px;
  }

  /* Pricing */
  .pricing {
    padding: 60px 0;
  }

  .pricing-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    max-width: 420px;
  }

  .pricing-card-inner {
    padding: 32px 24px 28px;
  }

  .pricing-header {
    margin-bottom: 20px;
  }

  .plan-name {
    font-size: 18px;
  }

  .price-amount {
    font-size: 42px;
  }

  .price-currency {
    font-size: 18px;
    margin-top: 4px;
  }

  .price-period {
    font-size: 14px;
  }

  .pricing-features {
    margin: 22px 0 28px;
    gap: 12px;
  }

  .pricing-features li {
    font-size: 13px;
    gap: 10px;
  }

  .btn-plan {
    padding: 14px 20px;
    font-size: 14px;
  }

  .pricing-badge {
    font-size: 11px;
    padding: 5px 16px;
    top: -12px;
  }

  /* CTA */
  .cta {
    padding: 60px 0;
  }

  .cta-card {
    padding: 40px 20px;
    border-radius: var(--radius-lg);
  }

  .cta-content h2 {
    font-size: 26px;
  }

  .cta-content p {
    font-size: 15px;
    margin-bottom: 28px;
  }

  .btn-lg {
    padding: 15px 28px;
    font-size: 15px;
    width: 100%;
    justify-content: center;
  }
}
</style>
