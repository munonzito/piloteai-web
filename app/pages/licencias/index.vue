<template>
  <div class="licencias-page">
    <section class="page-hero">
      <div class="page-hero-bg">
        <div class="page-hero-glow"></div>
      </div>
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Inicio</NuxtLink>
          <span class="sep">/</span>
          <span>Licencias DGAC</span>
        </nav>
        <h1 class="page-title">
          Licencias y Habilitaciones<br /><em>Aeronáuticas DGAC</em>
        </h1>
        <p class="page-subtitle">
          Prepárate para las {{ licenses.length }} licencias y habilitaciones de la Dirección General de Aeronáutica Civil de Chile. 
          Más de {{ totalQuestions.toLocaleString() }} preguntas reales organizadas por materia.
        </p>
      </div>
    </section>

    <section class="licenses-section" v-for="cat in categories" :key="cat.key">
      <div class="container">
        <div class="cat-header">
          <span class="cat-icon">{{ cat.icon }}</span>
          <h2 class="cat-title">{{ cat.label }}</h2>
          <p class="cat-count">{{ cat.items.length }} licencias</p>
        </div>
        <div class="licenses-grid">
          <NuxtLink
            v-for="item in cat.items"
            :key="item.slug"
            :to="`/licencias/${item.slug}`"
            class="license-card"
          >
            <div class="license-card-top">
              <span class="license-code">{{ item.curriculum.code }}</span>
              <span class="license-badge">{{ item.curriculum.subjects.length }} materias</span>
            </div>
            <h3 class="license-name">{{ item.curriculum.name }}</h3>
            <p class="license-desc">{{ item.curriculum.description }}</p>
            <div class="license-stats">
              <div class="license-stat">
                <span class="license-stat-val">{{ item.curriculum.estimatedQuestions }}</span>
                <span class="license-stat-label">Preguntas</span>
              </div>
              <div class="license-stat">
                <span class="license-stat-val">{{ item.lessons.totalLessons }}</span>
                <span class="license-stat-label">Lecciones</span>
              </div>
              <div class="license-stat">
                <span class="license-stat-val">{{ item.lessons.estimatedTotalHours }}h</span>
                <span class="license-stat-label">Estudio</span>
              </div>
            </div>
            <div class="license-card-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <div class="cta-box">
          <h2>Comienza a preparar tu examen DGAC hoy</h2>
          <p>Acceso a todas las licencias, preguntas con explicaciones detalladas, exámenes cronometrados y seguimiento de progreso.</p>
          <a href="/#planes" class="btn-primary btn-lg">
            Comenzar Ahora
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { getAllLicensePages, categoryLabels, categoryIcons } from '../../../data/curricula'

const licenses = getAllLicensePages()

const totalQuestions = licenses.reduce((acc, l) => acc + l.curriculum.estimatedQuestions, 0)

const categories = computed(() => {
  const grouped = {}
  for (const item of licenses) {
    const cat = item.curriculum.category
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(item)
  }
  return Object.entries(grouped).map(([key, items]) => ({
    key,
    label: categoryLabels[key] || key,
    icon: categoryIcons[key] || '📋',
    items,
  }))
})

useHead({
  title: 'Licencias Aeronáuticas DGAC Chile - Todas las Licencias y Habilitaciones',
})

useSeoMeta({
  description: `Prepárate para las ${licenses.length} licencias y habilitaciones aeronáuticas de la DGAC Chile. Banco de preguntas reales, lecciones y exámenes cronometrados para Piloto Privado, Comercial, PTLA, IFR, Drones y más.`,
  ogTitle: 'Licencias Aeronáuticas DGAC Chile | Piloteai',
  ogDescription: `Todas las ${licenses.length} licencias DGAC de Chile: Piloto Privado, Comercial, PTLA, IFR, Drones, Tripulante de Cabina y más. Prepárate con preguntas reales.`,
  twitterTitle: 'Licencias Aeronáuticas DGAC Chile | Piloteai',
  twitterDescription: `Prepárate para las ${licenses.length} licencias DGAC con más de ${totalQuestions.toLocaleString()} preguntas reales.`,
})

useSchemaOrg([
  defineWebPage({
    '@type': 'CollectionPage',
    name: 'Licencias Aeronáuticas DGAC Chile',
    description: `Todas las ${licenses.length} licencias y habilitaciones aeronáuticas de la DGAC Chile.`,
  }),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Inicio', item: '/' },
      { name: 'Licencias DGAC' },
    ],
  }),
])
</script>

<style scoped>
.licencias-page {
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

.page-title {
  font-family: var(--font-body);
  font-size: 48px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 20px;
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
  max-width: 600px;
}

.licenses-section {
  padding: 60px 0 40px;
}

.cat-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
}

.cat-icon {
  font-size: 24px;
}

.cat-title {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.cat-count {
  font-size: 13px;
  color: var(--text-muted);
  background: var(--bg-surface);
  padding: 4px 12px;
  border-radius: 100px;
  border: 1px solid var(--border);
}

.licenses-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.license-card {
  position: relative;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.license-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
  color: inherit;
}

.license-card:hover .license-card-arrow {
  opacity: 1;
  transform: translateX(0);
}

.license-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.license-code {
  font-size: 12px;
  font-weight: 700;
  color: var(--accent);
  background: var(--accent-glow);
  padding: 4px 10px;
  border-radius: 6px;
  letter-spacing: 0.05em;
}

.license-badge {
  font-size: 12px;
  color: var(--text-muted);
}

.license-name {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-bottom: 8px;
  line-height: 1.3;
}

.license-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
}

.license-stats {
  display: flex;
  gap: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.license-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.license-stat-val {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
}

.license-stat-label {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.license-card-arrow {
  position: absolute;
  top: 28px;
  right: 24px;
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.3s ease;
  color: var(--accent);
}

.cta-section {
  padding: 60px 0 100px;
}

.cta-box {
  background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 100%);
  border: 1px solid var(--border-hover);
  border-radius: var(--radius-xl);
  padding: 56px;
  text-align: center;
}

.cta-box h2 {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.025em;
  margin-bottom: 12px;
}

.cta-box p {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto 28px;
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

@media (max-width: 768px) {
  .page-title {
    font-size: 32px;
  }

  .licenses-grid {
    grid-template-columns: 1fr;
  }

  .cta-box {
    padding: 36px 24px;
  }

  .cta-box h2 {
    font-size: 24px;
  }
}
</style>
