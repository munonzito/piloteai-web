<template>
  <div class="license-page" v-if="data">
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
          <span>{{ data.curriculum.code }}</span>
        </nav>

        <div class="hero-row">
          <div class="hero-content">
            <span class="license-code-tag">{{ data.curriculum.code }}</span>
            <h1 class="page-title">
              Examen DGAC<br /><em>{{ data.curriculum.name }}</em>
            </h1>
            <p class="page-subtitle">{{ data.curriculum.description }}</p>
            <div class="hero-stats">
              <div class="stat">
                <span class="stat-val">{{ data.curriculum.estimatedQuestions }}</span>
                <span class="stat-label">Preguntas</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat">
                <span class="stat-val">{{ data.curriculum.subjects.length }}</span>
                <span class="stat-label">Materias</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat">
                <span class="stat-val">{{ data.lessons.totalLessons }}</span>
                <span class="stat-label">Lecciones</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat">
                <span class="stat-val">{{ data.lessons.estimatedTotalHours }}h</span>
                <span class="stat-label">Estudio</span>
              </div>
            </div>
            <a href="/#planes" class="btn-primary">
              Comenzar Preparación
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
          <div class="hero-info-card">
            <h3>Información del Examen</h3>
            <div class="info-row">
              <span class="info-label">Regulación</span>
              <span class="info-val">{{ data.curriculum.regulation }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Preguntas</span>
              <span class="info-val">{{ data.curriculum.estimatedQuestions }} preguntas</span>
            </div>
            <div class="info-row">
              <span class="info-label">Duración</span>
              <span class="info-val">{{ data.curriculum.estimatedTimeMinutes }} minutos</span>
            </div>
            <div class="info-row">
              <span class="info-label">Aprobación</span>
              <span class="info-val accent">{{ data.curriculum.approvalThreshold }}% mínimo</span>
            </div>
            <div class="info-row">
              <span class="info-label">Categoría</span>
              <span class="info-val">{{ categoryLabel }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="subjects-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Materias del <em>Examen</em></h2>
          <p class="section-desc">
            El examen de {{ data.curriculum.name }} evalúa {{ data.curriculum.subjects.length }} materias con {{ totalTopics }} temas en total.
          </p>
        </div>
        <div class="subjects-grid">
          <NuxtLink
            v-for="(subject, i) in data.curriculum.subjects"
            :key="subject.id"
            :to="`/licencias/${data.slug}/${slugify(subject.name)}`"
            class="subject-card"
          >
            <div class="subject-card-top">
              <span class="subject-icon">{{ subject.icon }}</span>
              <span class="subject-num">{{ String(i + 1).padStart(2, '0') }}</span>
            </div>
            <h3>{{ subject.name }}</h3>
            <p>{{ subject.description }}</p>
            <div class="subject-meta">
              <span class="subject-meta-item">{{ subject.topics.length }} temas</span>
              <span class="subject-meta-sep">·</span>
              <span class="subject-meta-item">{{ getLessonCount(subject.id) }} lecciones</span>
            </div>
            <div class="subject-topics-preview">
              <span v-for="topic in subject.topics.slice(0, 3)" :key="topic" class="topic-tag">{{ topic }}</span>
              <span v-if="subject.topics.length > 3" class="topic-more">+{{ subject.topics.length - 3 }} más</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="how-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Cómo preparar el <em>examen {{ data.curriculum.code }}</em></h2>
        </div>
        <div class="steps-grid">
          <div class="step">
            <div class="step-number">01</div>
            <h3>Estudia por materia</h3>
            <p>Revisa las {{ data.curriculum.subjects.length }} materias del examen con lecciones organizadas por tema y dificultad.</p>
          </div>
          <div class="step">
            <div class="step-number">02</div>
            <h3>Practica con preguntas reales</h3>
            <p>Resuelve las {{ data.curriculum.estimatedQuestions }} preguntas del banco oficial DGAC con explicaciones detalladas.</p>
          </div>
          <div class="step">
            <div class="step-number">03</div>
            <h3>Simula el examen</h3>
            <p>Rinde exámenes cronometrados de {{ data.curriculum.estimatedTimeMinutes }} minutos en condiciones reales.</p>
          </div>
          <div class="step">
            <div class="step-number">04</div>
            <h3>Aprueba con confianza</h3>
            <p>Alcanza el {{ data.curriculum.approvalThreshold }}% de aprobación con seguimiento de tu progreso.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="related-section" v-if="relatedLicenses.length">
      <div class="container">
        <h2 class="section-title-sm">Otras licencias que te pueden interesar</h2>
        <div class="related-grid">
          <NuxtLink
            v-for="rel in relatedLicenses"
            :key="rel.slug"
            :to="`/licencias/${rel.slug}`"
            class="related-card"
          >
            <span class="related-code">{{ rel.curriculum.code }}</span>
            <span class="related-name">{{ rel.curriculum.name }}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <div class="cta-box">
          <h2>Prepara tu examen de {{ data.curriculum.name }}</h2>
          <p>{{ data.lessons.totalLessons }} lecciones, {{ data.curriculum.estimatedQuestions }} preguntas reales y exámenes cronometrados para aprobar a la primera.</p>
          <a href="/#planes" class="btn-primary btn-lg">
            Comenzar Ahora
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  </div>
  <div v-else class="container" style="padding: 200px 28px; text-align: center;">
    <h1>Licencia no encontrada</h1>
    <p style="color: var(--text-secondary); margin-top: 12px;">
      <NuxtLink to="/licencias">Ver todas las licencias</NuxtLink>
    </p>
  </div>
</template>

<script setup>
import { getAllLicensePages, getLicenseBySlug, categoryLabels, slugify } from '../../../../data/curricula'

const route = useRoute()
const data = getLicenseBySlug(route.params.slug)

if (!data) {
  throw createError({ statusCode: 404, statusMessage: 'Licencia no encontrada' })
}

const categoryLabel = categoryLabels[data.curriculum.category] || data.curriculum.category

const totalTopics = data.curriculum.subjects.reduce((acc, s) => acc + s.topics.length, 0)

function getLessonCount(subjectId) {
  const ls = data.lessons.subjects.find((s) => s.id === subjectId)
  return ls ? ls.lessons.length : 0
}

const allLicenses = getAllLicensePages()
const relatedLicenses = allLicenses
  .filter((l) => l.slug !== data.slug && l.curriculum.category === data.curriculum.category)
  .slice(0, 4)

const seoTitle = `Examen DGAC ${data.curriculum.name} (${data.curriculum.code}) - Preparación Completa`
const seoDesc = `Prepárate para el examen DGAC de ${data.curriculum.name} (${data.curriculum.code}). ${data.curriculum.subjects.length} materias, ${data.curriculum.estimatedQuestions} preguntas reales, ${data.lessons.totalLessons} lecciones y exámenes cronometrados de ${data.curriculum.estimatedTimeMinutes} min.`

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
      { name: `${data.curriculum.code} - ${data.curriculum.name}` },
    ],
  }),
  {
    '@type': 'Course',
    name: `Preparación Examen ${data.curriculum.name}`,
    description: data.curriculum.description,
    provider: { '@type': 'Organization', name: 'Piloteai', url: 'https://piloteai.cl' },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: `PT${data.lessons.estimatedTotalHours}H`,
    },
  },
])
</script>

<style scoped>
.license-page {
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

.hero-row {
  display: flex;
  gap: 48px;
  align-items: flex-start;
}

.hero-content {
  flex: 1;
  min-width: 0;
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
  max-width: 500px;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
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

.hero-info-card {
  flex-shrink: 0;
  width: 320px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
}

.hero-info-card h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  letter-spacing: -0.01em;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.info-val {
  font-size: 14px;
  font-weight: 600;
}

.info-val.accent {
  color: var(--accent);
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

/* Subjects */
.subjects-section {
  padding: 80px 0;
  background: var(--bg-surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
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

.section-desc {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.subjects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.subject-card {
  background: var(--bg-dark);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

.subject-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  color: inherit;
}

.subject-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.subject-icon {
  font-size: 28px;
}

.subject-num {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-muted);
}

.subject-card h3 {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-bottom: 6px;
}

.subject-card p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 14px;
}

.subject-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.subject-meta-sep {
  opacity: 0.4;
}

.subject-topics-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.topic-tag {
  font-size: 12px;
  color: var(--text-secondary);
  background: var(--bg-surface);
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid var(--border);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.topic-more {
  font-size: 12px;
  color: var(--accent);
  padding: 4px 10px;
}

/* How Section */
.how-section {
  padding: 80px 0;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.step-number {
  font-size: 40px;
  font-weight: 800;
  letter-spacing: -0.04em;
  margin-bottom: 12px;
  line-height: 1;
  background: linear-gradient(180deg, var(--accent) 0%, rgba(62, 189, 79, 0.3) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.step h3 {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 6px;
}

.step p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Related */
.related-section {
  padding: 60px 0;
  border-top: 1px solid var(--border);
}

.section-title-sm {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-bottom: 24px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.related-card {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  font-size: 14px;
}

.related-card:hover {
  border-color: var(--border-hover);
  color: inherit;
}

.related-code {
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
  background: var(--accent-glow);
  padding: 3px 8px;
  border-radius: 4px;
  letter-spacing: 0.04em;
  flex-shrink: 0;
}

.related-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
}

.related-card svg {
  flex-shrink: 0;
  color: var(--text-muted);
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
  .hero-row {
    flex-direction: column;
  }

  .hero-info-card {
    width: 100%;
  }

  .page-title {
    font-size: 32px;
  }

  .subjects-grid {
    grid-template-columns: 1fr;
  }

  .steps-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .related-grid {
    grid-template-columns: 1fr;
  }

  .cta-box {
    padding: 36px 24px;
  }
}
</style>
