<template>
  <div class="subject-page" v-if="subjectData">
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
          <NuxtLink :to="`/licencias/${subjectData.license.slug}`">{{ subjectData.license.curriculum.code }}</NuxtLink>
          <span class="sep">/</span>
          <span>{{ subjectData.subject.name }}</span>
        </nav>

        <div class="hero-row">
          <div class="hero-content">
            <div class="hero-tags">
              <span class="license-code-tag">{{ subjectData.license.curriculum.code }}</span>
              <span class="subject-icon-tag">{{ subjectData.subject.icon }}</span>
            </div>
            <h1 class="page-title">
              {{ subjectData.subject.name }}<br />
              <em>{{ subjectData.license.curriculum.name }}</em>
            </h1>
            <p class="page-subtitle">{{ subjectData.subject.description }}</p>
            <div class="hero-stats">
              <div class="stat">
                <span class="stat-val">{{ subjectData.subject.topics.length }}</span>
                <span class="stat-label">Temas</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat">
                <span class="stat-val">{{ lessonCount }}</span>
                <span class="stat-label">Lecciones</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat">
                <span class="stat-val">{{ estimatedMinutes }}min</span>
                <span class="stat-label">Estudio</span>
              </div>
            </div>
            <a href="/#planes" class="btn-primary">
              Comenzar a Estudiar
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="topics-section">
      <div class="container">
        <h2 class="section-title">Temas que se <em>evalúan</em></h2>
        <p class="section-desc">
          El examen {{ subjectData.license.curriculum.code }} evalúa los siguientes {{ subjectData.subject.topics.length }} temas en la materia de {{ subjectData.subject.name }}.
        </p>
        <div class="topics-list">
          <div v-for="(topic, i) in subjectData.subject.topics" :key="i" class="topic-item">
            <span class="topic-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="topic-text">{{ topic }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="lessons-section" v-if="subjectData.lessonSubject && subjectData.lessonSubject.lessons.length">
      <div class="container">
        <h2 class="section-title">Plan de <em>Lecciones</em></h2>
        <p class="section-desc">
          {{ subjectData.lessonSubject.lessons.length }} lecciones diseñadas para cubrir todos los temas evaluados en esta materia.
        </p>
        <div class="lessons-list">
          <div v-for="(lesson, i) in subjectData.lessonSubject.lessons" :key="lesson.id" class="lesson-item">
            <div class="lesson-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="lesson-info">
              <h3>{{ lesson.title }}</h3>
              <p>{{ lesson.description }}</p>
            </div>
            <div class="lesson-time">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {{ lesson.estimatedMinutes }} min
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="other-subjects">
      <div class="container">
        <h2 class="section-title-sm">Otras materias de {{ subjectData.license.curriculum.code }}</h2>
        <div class="other-grid">
          <NuxtLink
            v-for="s in otherSubjects"
            :key="s.id"
            :to="`/licencias/${subjectData.license.slug}/${slugify(s.name)}`"
            class="other-card"
          >
            <span class="other-icon">{{ s.icon }}</span>
            <span class="other-name">{{ s.name }}</span>
            <span class="other-count">{{ s.topics.length }} temas</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <div class="cta-box">
          <h2>Domina {{ subjectData.subject.name }} para tu examen {{ subjectData.license.curriculum.code }}</h2>
          <p>Lecciones interactivas, preguntas con explicaciones y seguimiento de progreso para aprobar a la primera.</p>
          <a href="/#planes" class="btn-primary btn-lg">
            Comenzar Ahora
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  </div>
  <div v-else class="container" style="padding: 200px 28px; text-align: center;">
    <h1>Materia no encontrada</h1>
    <p style="color: var(--text-secondary); margin-top: 12px;">
      <NuxtLink to="/licencias">Ver todas las licencias</NuxtLink>
    </p>
  </div>
</template>

<script setup>
import { getSubjectBySlug, slugify } from '../../../../data/curricula'

const route = useRoute()
const subjectData = getSubjectBySlug(route.params.slug, route.params.materia)

if (!subjectData) {
  throw createError({ statusCode: 404, statusMessage: 'Materia no encontrada' })
}

const lessonCount = subjectData.lessonSubject ? subjectData.lessonSubject.lessons.length : 0
const estimatedMinutes = subjectData.lessonSubject
  ? subjectData.lessonSubject.lessons.reduce((acc, l) => acc + l.estimatedMinutes, 0)
  : 0

const otherSubjects = subjectData.license.curriculum.subjects.filter(
  (s) => s.id !== subjectData.subject.id
)

const seoTitle = `${subjectData.subject.name} - Examen ${subjectData.license.curriculum.code} DGAC Chile`
const seoDesc = `Estudia ${subjectData.subject.name} para el examen DGAC de ${subjectData.license.curriculum.name} (${subjectData.license.curriculum.code}). ${subjectData.subject.topics.length} temas, ${lessonCount} lecciones y preguntas reales. ${subjectData.subject.description}`

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
      { name: subjectData.license.curriculum.code, item: `/licencias/${subjectData.license.slug}` },
      { name: subjectData.subject.name },
    ],
  }),
])
</script>

<style scoped>
.subject-page {
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

.hero-tags {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.license-code-tag {
  font-size: 13px;
  font-weight: 700;
  color: var(--accent);
  background: var(--accent-glow);
  border: 1px solid rgba(62, 189, 79, 0.2);
  padding: 6px 14px;
  border-radius: 100px;
  letter-spacing: 0.05em;
}

.subject-icon-tag {
  font-size: 20px;
}

.page-title {
  font-family: var(--font-body);
  font-size: 40px;
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
  font-size: 0.75em;
}

.page-subtitle {
  font-size: 17px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 28px;
  max-width: 560px;
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

/* Topics */
.topics-section {
  padding: 80px 0;
  background: var(--bg-surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.section-title {
  font-family: var(--font-body);
  font-size: 32px;
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
  margin-bottom: 36px;
}

.topics-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.topic-item {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--bg-dark);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 16px 20px;
  transition: border-color 0.2s ease;
}

.topic-item:hover {
  border-color: var(--border-hover);
}

.topic-num {
  font-size: 13px;
  font-weight: 700;
  color: var(--accent);
  flex-shrink: 0;
  width: 28px;
}

.topic-text {
  font-size: 15px;
  line-height: 1.5;
}

/* Lessons */
.lessons-section {
  padding: 80px 0;
}

.lessons-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.lesson-item {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 18px 20px;
  transition: border-color 0.2s ease;
}

.lesson-item:hover {
  border-color: var(--border-hover);
}

.lesson-num {
  font-size: 14px;
  font-weight: 700;
  color: var(--accent);
  flex-shrink: 0;
  width: 28px;
}

.lesson-info {
  flex: 1;
  min-width: 0;
}

.lesson-info h3 {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 2px;
}

.lesson-info p {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.lesson-time {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-muted);
  flex-shrink: 0;
  white-space: nowrap;
}

/* Other Subjects */
.other-subjects {
  padding: 60px 0;
  border-top: 1px solid var(--border);
}

.section-title-sm {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-bottom: 24px;
}

.other-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;
}

.other-card {
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
}

.other-card:hover {
  border-color: var(--border-hover);
  color: inherit;
}

.other-icon {
  font-size: 18px;
  flex-shrink: 0;
}

.other-name {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
}

.other-count {
  font-size: 12px;
  color: var(--text-muted);
  flex-shrink: 0;
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
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}

.cta-box p {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 480px;
  margin: 0 auto 28px;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 28px;
  }

  .lesson-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .cta-box {
    padding: 36px 24px;
  }

  .cta-box h2 {
    font-size: 22px;
  }
}
</style>
