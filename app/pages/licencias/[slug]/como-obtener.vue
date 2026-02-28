<template>
  <div class="guide-page" v-if="guide">
    <section class="page-hero">
      <div class="page-hero-bg">
        <div class="page-hero-glow"></div>
      </div>
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Inicio</NuxtLink>
          <span class="sep">/</span>
          <NuxtLink to="/licencias">Licencias DGAC</NuxtLink>
          <span class="sep">/</span>
          <NuxtLink :to="`/licencias/${license.slug}`">{{ license.curriculum.code }}</NuxtLink>
          <span class="sep">/</span>
          <span>Cómo Obtener</span>
        </nav>

        <div class="hero-row">
          <div class="hero-content">
            <span class="license-code-tag">{{ license.curriculum.code }}</span>
            <h1 class="page-title">
              Cómo Obtener la<br /><em>{{ license.curriculum.name }}</em>
            </h1>
            <p class="page-subtitle">{{ guide.heroDescription }}</p>
            <div class="hero-stats">
              <div class="stat" v-if="guide.requirements.find(r => r.label === 'Edad mínima')">
                <span class="stat-val">{{ guide.requirements.find(r => r.label === 'Edad mínima')?.value }}</span>
                <span class="stat-label">Edad mínima</span>
              </div>
              <div class="stat-divider" v-if="guide.requirements.find(r => r.label === 'Horas de vuelo')"></div>
              <div class="stat" v-if="guide.requirements.find(r => r.label === 'Horas de vuelo')">
                <span class="stat-val">{{ guide.requirements.find(r => r.label === 'Horas de vuelo')?.value }}</span>
                <span class="stat-label">Horas de vuelo</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat">
                <span class="stat-val">{{ guide.medicalClass }}</span>
                <span class="stat-label">Examen médico</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="requirements-section">
      <div class="container">
        <h2 class="section-title">Requisitos para <em>{{ license.curriculum.name }}</em></h2>
        <p class="section-desc">
          Estos son los requisitos establecidos en la {{ license.curriculum.regulation }} que debes cumplir para obtener esta licencia ante la DGAC de Chile.
        </p>
        <div class="requirements-grid">
          <div v-for="req in guide.requirements" :key="req.label" class="requirement-card">
            <span class="requirement-icon">{{ req.icon }}</span>
            <div class="requirement-info">
              <span class="requirement-label">{{ req.label }}</span>
              <span class="requirement-value">{{ req.value }}</span>
            </div>
          </div>
        </div>
        <div class="prerequisites-box" v-if="guide.prerequisites.length > 0 && guide.prerequisites[0] !== 'No se requiere licencia previa'">
          <h3>Licencias y habilitaciones previas requeridas</h3>
          <ul>
            <li v-for="prereq in guide.prerequisites" :key="prereq">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              {{ prereq }}
            </li>
          </ul>
        </div>
        <div class="prerequisites-box prerequisites-none" v-else>
          <h3>Sin licencia previa</h3>
          <p>No se requiere ninguna licencia o habilitación previa para postular a esta certificación.</p>
        </div>
      </div>
    </section>

    <section class="steps-section">
      <div class="container">
        <h2 class="section-title">Pasos para obtener <em>la licencia</em></h2>
        <p class="section-desc">
          Sigue estos {{ guide.steps.length }} pasos para obtener tu {{ license.curriculum.name }} ante la DGAC.
        </p>
        <div class="steps-list">
          <div v-for="(step, i) in guide.steps" :key="i" class="step-item">
            <div class="step-number">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="attributes-section">
      <div class="container">
        <div class="attributes-grid">
          <div class="attributes-card">
            <h2 class="section-title-sm">Atribuciones de la <em>{{ license.curriculum.code }}</em></h2>
            <p class="attributes-intro">Una vez obtenida la licencia, estarás habilitado para:</p>
            <ul class="attributes-list">
              <li v-for="attr in guide.attributes" :key="attr">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                {{ attr }}
              </li>
            </ul>
          </div>
          <div class="validity-card">
            <h3>Vigencia y Renovación</h3>
            <div class="validity-row">
              <span class="validity-label">Certificado médico</span>
              <span class="validity-value">{{ guide.medicalClass }}</span>
            </div>
            <div class="validity-row">
              <span class="validity-label">Vigencia</span>
              <span class="validity-value">{{ guide.validity }}</span>
            </div>
            <div class="validity-row">
              <span class="validity-label">Regulación</span>
              <span class="validity-value">{{ license.curriculum.regulation }}</span>
            </div>
            <div class="renewal-info">
              <h4>Renovación</h4>
              <p>{{ guide.renewalInfo }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="exam-section">
      <div class="container">
        <div class="exam-card">
          <div class="exam-card-content">
            <h2>Prepara tu examen teórico de {{ license.curriculum.code }}</h2>
            <p>
              El examen teórico DGAC para {{ license.curriculum.name }} incluye
              {{ license.curriculum.estimatedQuestions }} preguntas en {{ license.curriculum.subjects.length }} materias
              con {{ license.curriculum.estimatedTimeMinutes }} minutos de duración.
              Necesitas un mínimo de {{ license.curriculum.approvalThreshold }}% para aprobar.
            </p>
            <div class="exam-subjects">
              <NuxtLink
                v-for="subject in license.curriculum.subjects.slice(0, 6)"
                :key="subject.id"
                :to="`/licencias/${license.slug}/${slugify(subject.name)}`"
                class="exam-subject-tag"
              >
                {{ subject.icon }} {{ subject.name }}
              </NuxtLink>
              <span v-if="license.curriculum.subjects.length > 6" class="exam-subject-more">
                +{{ license.curriculum.subjects.length - 6 }} más
              </span>
            </div>
            <div class="exam-actions">
              <NuxtLink :to="`/licencias/${license.slug}`" class="btn-primary">
                Ver Materias del Examen
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </NuxtLink>
              <a href="/#planes" class="btn-ghost">Comenzar Preparación</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="faq-section" v-if="guide.faqs.length">
      <div class="container">
        <h2 class="section-title">Preguntas frecuentes sobre <em>{{ license.curriculum.code }}</em></h2>
        <div class="faq-list">
          <details v-for="(faq, i) in guide.faqs" :key="i" class="faq-item">
            <summary class="faq-question">
              <span>{{ faq.question }}</span>
              <svg class="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </summary>
            <p class="faq-answer">{{ faq.answer }}</p>
          </details>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <div class="cta-box">
          <h2>Comienza tu camino hacia la {{ license.curriculum.code }}</h2>
          <p>{{ license.curriculum.estimatedQuestions }} preguntas reales, {{ license.lessons.totalLessons }} lecciones y exámenes cronometrados para aprobar tu examen DGAC a la primera.</p>
          <a href="/#planes" class="btn-primary btn-lg">
            Comenzar Ahora
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  </div>
  <div v-else class="container" style="padding: 200px 28px; text-align: center;">
    <h1>Guía no encontrada</h1>
    <p style="color: var(--text-secondary); margin-top: 12px;">
      <NuxtLink to="/licencias">Ver todas las licencias</NuxtLink>
    </p>
  </div>
</template>

<script setup>
import { getLicenseBySlug, slugify } from '../../../../data/curricula'
import { getGuideByLicenseId } from '../../../../data/guides/como-obtener'

const route = useRoute()
const license = getLicenseBySlug(route.params.slug)

if (!license) {
  throw createError({ statusCode: 404, statusMessage: 'Licencia no encontrada' })
}

const guide = getGuideByLicenseId(license.slug)

if (!guide) {
  throw createError({ statusCode: 404, statusMessage: 'Guía no encontrada' })
}

const seoTitle = `Cómo Obtener la ${license.curriculum.name} (${license.curriculum.code}) en Chile - Requisitos DGAC`
const seoDesc = `Guía completa para obtener la ${license.curriculum.name} (${license.curriculum.code}) en Chile. Requisitos, pasos, examen médico ${guide.medicalClass}, examen teórico DGAC y proceso de certificación según ${license.curriculum.regulation}.`

useHead({ title: seoTitle })

useSeoMeta({
  description: seoDesc,
  ogTitle: seoTitle,
  ogDescription: seoDesc,
  twitterTitle: seoTitle,
  twitterDescription: seoDesc,
})

useSchemaOrg([
  defineWebPage({
    '@type': 'WebPage',
    name: seoTitle,
    description: seoDesc,
  }),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Inicio', item: '/' },
      { name: 'Licencias DGAC', item: '/licencias' },
      { name: `${license.curriculum.code} - ${license.curriculum.name}`, item: `/licencias/${license.slug}` },
      { name: 'Cómo Obtener' },
    ],
  }),
  {
    '@type': 'HowTo',
    name: `Cómo obtener la ${license.curriculum.name} (${license.curriculum.code}) en Chile`,
    description: guide.heroDescription,
    step: guide.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
  },
  ...(guide.faqs.length
    ? [{
        '@type': 'FAQPage',
        mainEntity: guide.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      }]
    : []),
])
</script>

<style scoped>
.guide-page {
  min-height: 100vh;
}

.page-hero {
  position: relative;
  padding: 100px 0 60px;
  overflow: hidden;
}

.page-hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.page-hero-glow {
  position: absolute;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 500px;
  background: radial-gradient(ellipse at center, rgba(62, 189, 79, 0.06) 0%, transparent 70%);
}

.container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 28px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.breadcrumb a {
  color: var(--text-secondary);
  text-decoration: none;
}

.breadcrumb a:hover {
  color: var(--accent);
}

.breadcrumb .sep {
  opacity: 0.4;
}

.license-code-tag {
  display: inline-block;
  font-size: 13px;
  font-weight: 700;
  color: var(--accent);
  background: var(--accent-glow);
  border: 1px solid rgba(62, 189, 79, 0.2);
  padding: 6px 14px;
  border-radius: 100px;
  letter-spacing: 0.05em;
  margin-bottom: 20px;
}

.page-title {
  font-family: var(--font-body);
  font-size: 44px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
}

.page-title em {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  color: var(--accent);
}

.page-subtitle {
  font-size: 17px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 28px;
  max-width: 600px;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 24px;
}

.stat-val {
  display: block;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.stat-divider {
  width: 1px;
  height: 36px;
  background: var(--border-hover);
}

/* Requirements */
.requirements-section {
  padding: 80px 0;
  background: var(--bg-surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.section-title {
  font-family: var(--font-body);
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.025em;
  margin-bottom: 12px;
}

.section-title em {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  color: var(--accent);
}

.section-title-sm {
  font-family: var(--font-body);
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}

.section-title-sm em {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  color: var(--accent);
}

.section-desc {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 36px;
}

.requirements-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.requirement-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--bg-dark);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 20px;
  transition: border-color 0.2s ease;
}

.requirement-card:hover {
  border-color: var(--border-hover);
}

.requirement-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.requirement-label {
  display: block;
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 2px;
}

.requirement-value {
  font-size: 16px;
  font-weight: 600;
}

.prerequisites-box {
  background: var(--bg-dark);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
}

.prerequisites-box h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
}

.prerequisites-box ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.prerequisites-box li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  color: var(--text-secondary);
}

.prerequisites-none {
  border-color: rgba(62, 189, 79, 0.2);
  background: rgba(62, 189, 79, 0.03);
}

.prerequisites-none p {
  font-size: 15px;
  color: var(--text-secondary);
}

/* Steps */
.steps-section {
  padding: 80px 0;
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.step-item {
  display: flex;
  gap: 20px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  transition: border-color 0.2s ease;
}

.step-item:hover {
  border-color: var(--border-hover);
}

.step-number {
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
  flex-shrink: 0;
  width: 52px;
  background: linear-gradient(180deg, var(--accent) 0%, rgba(62, 189, 79, 0.3) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.step-content h3 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 6px;
  letter-spacing: -0.01em;
}

.step-content p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.65;
}

/* Attributes */
.attributes-section {
  padding: 80px 0;
  background: var(--bg-surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.attributes-grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 32px;
  align-items: start;
}

.attributes-card {
  background: var(--bg-dark);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px;
}

.attributes-intro {
  font-size: 15px;
  color: var(--text-secondary);
  margin-bottom: 20px;
}

.attributes-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.attributes-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 15px;
  line-height: 1.5;
}

.attributes-list li svg {
  flex-shrink: 0;
  margin-top: 3px;
}

.validity-card {
  background: var(--bg-dark);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
}

.validity-card h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
}

.validity-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
}

.validity-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.validity-value {
  font-size: 14px;
  font-weight: 600;
}

.renewal-info {
  margin-top: 20px;
}

.renewal-info h4 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--accent);
}

.renewal-info p {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Exam */
.exam-section {
  padding: 80px 0;
}

.exam-card {
  background: linear-gradient(135deg, var(--bg-surface) 0%, rgba(62, 189, 79, 0.04) 100%);
  border: 1px solid rgba(62, 189, 79, 0.2);
  border-radius: var(--radius-xl);
  padding: 48px;
}

.exam-card h2 {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}

.exam-card p {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 24px;
  max-width: 640px;
}

.exam-subjects {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}

.exam-subject-tag {
  font-size: 13px;
  color: var(--text-secondary);
  background: var(--bg-dark);
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid var(--border);
  text-decoration: none;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.exam-subject-tag:hover {
  border-color: var(--accent);
  color: var(--text-primary);
}

.exam-subject-more {
  font-size: 13px;
  color: var(--accent);
  padding: 6px 14px;
}

.exam-actions {
  display: flex;
  align-items: center;
  gap: 16px;
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
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(62, 189, 79, 0.2);
}

.btn-primary:hover {
  background: var(--accent-hover);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(62, 189, 79, 0.35);
}

.btn-lg {
  padding: 18px 36px;
  font-size: 16px;
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
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.03);
}

/* FAQ */
.faq-section {
  padding: 80px 0;
  background: var(--bg-surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.faq-list {
  max-width: 720px;
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

/* CTA */
.cta-section {
  padding: 40px 0 100px;
}

.cta-box {
  background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 100%);
  border: 1px solid var(--border-hover);
  border-radius: var(--radius-xl);
  padding: 56px;
  text-align: center;
}

.cta-box h2 {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}

.cta-box p {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto 28px;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 32px;
  }

  .requirements-grid {
    grid-template-columns: 1fr;
  }

  .attributes-grid {
    grid-template-columns: 1fr;
  }

  .exam-card {
    padding: 28px 20px;
  }

  .exam-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .exam-actions .btn-primary,
  .exam-actions .btn-ghost {
    justify-content: center;
  }

  .cta-box {
    padding: 36px 24px;
  }
}
</style>
