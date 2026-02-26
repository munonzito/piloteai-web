<template>
  <div class="support-page">
    <div class="container">
      <h1>Soporte</h1>
      <p class="subtitle">Estamos aqui para ayudarte con cualquier problema o consulta.</p>

      <div class="support-grid">
        <div class="support-card">
          <div class="support-icon">📧</div>
          <h3>Correo electronico</h3>
          <p>Escribenos y te responderemos lo antes posible.</p>
          <a href="mailto:soporte@piloteai.cl" class="support-link">soporte@piloteai.cl</a>
        </div>

        <div class="support-card">
          <div class="support-icon">🐛</div>
          <h3>Reportar un problema</h3>
          <p>Si encontraste un error en la aplicacion, por favor describelo con el mayor detalle posible.</p>
          <a href="mailto:soporte@piloteai.cl?subject=Reporte%20de%20problema%20-%20Piloteai" class="support-link">Reportar problema</a>
        </div>

        <div class="support-card">
          <div class="support-icon">💡</div>
          <h3>Sugerencias</h3>
          <p>Tus ideas nos ayudan a mejorar. Cuentanos que te gustaria ver en la app.</p>
          <a href="mailto:soporte@piloteai.cl?subject=Sugerencia%20-%20Piloteai" class="support-link">Enviar sugerencia</a>
        </div>
      </div>

      <section class="faq">
        <h2>Preguntas frecuentes</h2>

        <div class="faq-item">
          <h3>¿Como elimino mi cuenta?</h3>
          <p>Puedes eliminar tu cuenta desde la aplicacion en Perfil &gt; Eliminar Cuenta. Esto eliminara permanentemente todos tus datos, incluyendo progreso y resultados de examenes.</p>
        </div>

        <div class="faq-item">
          <h3>¿Las preguntas son oficiales de la DGAC?</h3>
          <p>Piloteai es una herramienta independiente de estudio. Las preguntas estan basadas en el temario de examenes DGAC pero no somos una entidad oficial ni estamos afiliados con la DGAC.</p>
        </div>

        <div class="faq-item">
          <h3>¿Puedo estudiar sin conexion a internet?</h3>
          <p>Actualmente la aplicacion requiere conexion a internet para cargar las preguntas y guardar tu progreso.</p>
        </div>

        <div class="faq-item">
          <h3>¿Como cambio mi licencia activa?</h3>
          <p>En la seccion de Examenes puedes seleccionar cualquier licencia disponible para practicar. Tu progreso se guarda por separado para cada licencia.</p>
        </div>

        <div class="faq-item">
          <h3>¿La aplicacion tiene costo?</h3>
          <p>Piloteai es gratuita. Puedes acceder a todas las preguntas y funcionalidades sin costo.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Soporte y Ayuda - Piloteai',
  description: 'Necesitas ayuda con Piloteai? Contacta a nuestro equipo de soporte, reporta problemas o envía sugerencias. Preguntas frecuentes sobre la plataforma de exámenes DGAC.',
  ogTitle: 'Soporte y Ayuda - Piloteai',
  ogDescription: 'Contacta al equipo de soporte de Piloteai. Preguntas frecuentes y ayuda para la plataforma de preparación de exámenes DGAC.',
  ogType: 'website',
})
</script>

<style scoped>
.support-page {
  padding: 60px 0;
}

.support-page h1 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 8px;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 18px;
  margin-bottom: 48px;
}

.support-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 64px;
}

.support-card {
  background: var(--bg-surface);
  border: 1px solid var(--bg-surface-light);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
}

.support-icon {
  font-size: 36px;
  margin-bottom: 16px;
}

.support-card h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.support-card p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
}

.support-link {
  display: inline-block;
  color: var(--accent);
  font-weight: 600;
  font-size: 15px;
}

.faq h2 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 32px;
}

.faq-item {
  background: var(--bg-surface);
  border: 1px solid var(--bg-surface-light);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 12px;
}

.faq-item h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.faq-item p {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .support-grid {
    grid-template-columns: 1fr;
  }
}
</style>
