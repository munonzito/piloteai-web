<template>
  <div>
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-content">
          <div class="badge">Preparacion DGAC Chile</div>
          <h1 class="hero-title">
            Aprueba tu examen de piloto
            <span class="highlight">a la primera</span>
          </h1>
          <p class="hero-subtitle">
            Mas de 10,000 preguntas reales organizadas por licencia y tema. 
            Practica, mide tu progreso y llega preparado.
          </p>
          <div class="hero-actions">
            <a href="https://apps.apple.com" class="btn btn-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              App Store
            </a>
          </div>
        </div>
        <div class="hero-visual">
          <div class="phone-frame">
            <img src="/icon.png" alt="Piloteai App" class="phone-icon" />
          </div>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2 class="section-title">Todo lo que necesitas para aprobar</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">✈️</div>
            <h3>19 Licencias</h3>
            <p>Desde PPL hasta PTLA, incluyendo helicopteros, drones, planeadores y mas.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📝</div>
            <h3>Examenes Personalizados</h3>
            <p>Filtra por licencia y tema. Configura cantidad de preguntas y tiempo.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h3>Seguimiento de Progreso</h3>
            <p>Visualiza tu avance por materia, acumula XP y mantiene tu racha de estudio.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔍</div>
            <h3>Revision Detallada</h3>
            <p>Revisa cada respuesta con explicaciones. Identifica tus areas debiles.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📚</div>
            <h3>Lecciones por Materia</h3>
            <p>Estudia con contenido organizado: aerodinamica, meteorologia, navegacion y mas.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🏆</div>
            <h3>+10,000 Preguntas</h3>
            <p>Base de datos extensa con preguntas reales de examenes DGAC.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="licenses">
      <div class="container">
        <h2 class="section-title">Licencias disponibles</h2>
        <div class="licenses-grid">
          <div class="license-tag" v-for="license in licenses" :key="license">{{ license }}</div>
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="container cta-inner">
        <h2>Comienza a estudiar hoy</h2>
        <p>Descarga Piloteai y prepara tu examen DGAC con confianza.</p>
        <a href="https://apps.apple.com" class="btn btn-primary btn-lg">
          Descargar en App Store
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
const licenses = [
  'Piloto Privado Avion',
  'Piloto Comercial Avion',
  'PTLA Linea Aerea',
  'Piloto Privado Helicoptero',
  'Piloto Comercial Helicoptero',
  'Habilitacion Multimotor',
  'Habilitaciones Aviones Transporte',
  'Instructor de Vuelo',
  'Ingeniero de Vuelo',
  'Encargado Operaciones de Vuelo',
  'Mecanico de Mantenimiento',
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
.hero {
  padding: 80px 0 60px;
}

.hero-inner {
  display: flex;
  align-items: center;
  gap: 60px;
}

.hero-content {
  flex: 1;
}

.badge {
  display: inline-block;
  background: rgba(76, 175, 80, 0.15);
  color: var(--accent);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 20px;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.hero-title {
  font-size: 48px;
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 20px;
}

.highlight {
  color: var(--accent);
  display: block;
}

.hero-subtitle {
  font-size: 18px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 32px;
  max-width: 500px;
}

.hero-actions {
  display: flex;
  gap: 16px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: var(--accent);
  color: #fff;
}

.btn-primary:hover {
  background: #43A047;
  color: #fff;
  transform: translateY(-1px);
}

.btn-lg {
  padding: 16px 36px;
  font-size: 17px;
}

.hero-visual {
  flex-shrink: 0;
}

.phone-frame {
  width: 280px;
  height: 280px;
  background: var(--bg-surface);
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--bg-surface-light);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.phone-icon {
  width: 180px;
  height: 180px;
  border-radius: 28px;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 48px;
}

.features {
  padding: 80px 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.feature-card {
  background: var(--bg-surface);
  border: 1px solid var(--bg-surface-light);
  border-radius: 16px;
  padding: 32px 24px;
  transition: transform 0.2s, border-color 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
}

.feature-icon {
  font-size: 32px;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.feature-card p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.licenses {
  padding: 60px 0;
}

.licenses-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.license-tag {
  background: var(--bg-surface);
  border: 1px solid var(--bg-surface-light);
  padding: 10px 18px;
  border-radius: 24px;
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
  transition: all 0.2s;
}

.license-tag:hover {
  border-color: var(--accent);
  color: var(--text-primary);
}

.cta {
  padding: 80px 0;
}

.cta-inner {
  text-align: center;
  background: var(--bg-surface);
  border: 1px solid var(--bg-surface-light);
  border-radius: 24px;
  padding: 60px 40px;
}

.cta-inner h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
}

.cta-inner p {
  font-size: 17px;
  color: var(--text-secondary);
  margin-bottom: 32px;
}

@media (max-width: 768px) {
  .hero-inner {
    flex-direction: column;
    text-align: center;
  }

  .hero-title {
    font-size: 34px;
  }

  .hero-subtitle {
    max-width: 100%;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-visual {
    order: -1;
  }

  .phone-frame {
    width: 200px;
    height: 200px;
  }

  .phone-icon {
    width: 120px;
    height: 120px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 26px;
  }
}
</style>
