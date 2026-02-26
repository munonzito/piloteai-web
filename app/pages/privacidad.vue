<template>
  <div class="legal-page">
    <div class="container">
      <h1>Politica de Privacidad</h1>
      <p class="updated">Ultima actualizacion: {{ today }}</p>

      <section>
        <h2>1. Informacion que recopilamos</h2>
        <p>Piloteai recopila la siguiente informacion cuando utilizas nuestra aplicacion:</p>
        <ul>
          <li><strong>Informacion de cuenta:</strong> Nombre, direccion de correo electronico y foto de perfil proporcionados a traves de Google Sign-In o Apple Sign-In.</li>
          <li><strong>Datos de uso:</strong> Progreso en lecciones, resultados de examenes, puntuacion XP, racha de estudio y respuestas a preguntas.</li>
          <li><strong>Informacion del dispositivo:</strong> Tipo de dispositivo y sistema operativo para optimizar la experiencia.</li>
        </ul>
      </section>

      <section>
        <h2>2. Como utilizamos tu informacion</h2>
        <p>Utilizamos la informacion recopilada para:</p>
        <ul>
          <li>Proporcionar y mantener el servicio de preparacion de examenes.</li>
          <li>Guardar tu progreso de estudio y resultados de examenes.</li>
          <li>Personalizar tu experiencia de aprendizaje.</li>
          <li>Mejorar y optimizar la aplicacion.</li>
        </ul>
      </section>

      <section>
        <h2>3. Almacenamiento de datos</h2>
        <p>Tus datos se almacenan de forma segura en los servidores de Google Firebase, que cumplen con estandares de seguridad de la industria. Los datos se almacenan en servidores ubicados en Estados Unidos.</p>
      </section>

      <section>
        <h2>4. Comparticion de datos</h2>
        <p>No vendemos, comercializamos ni transferimos tu informacion personal a terceros. Solo compartimos datos con:</p>
        <ul>
          <li><strong>Google Firebase:</strong> Para autenticacion y almacenamiento de datos (proveedor de infraestructura).</li>
          <li><strong>Google/Apple:</strong> Solo la informacion necesaria para el proceso de autenticacion.</li>
        </ul>
      </section>

      <section>
        <h2>5. Tus derechos</h2>
        <p>Tienes derecho a:</p>
        <ul>
          <li>Acceder a tus datos personales almacenados.</li>
          <li>Solicitar la correccion de datos inexactos.</li>
          <li>Eliminar tu cuenta y todos los datos asociados directamente desde la aplicacion (Perfil &gt; Eliminar Cuenta).</li>
          <li>Solicitar una copia de tus datos.</li>
        </ul>
      </section>

      <section>
        <h2>6. Eliminacion de datos</h2>
        <p>Puedes eliminar tu cuenta y todos los datos asociados en cualquier momento desde la seccion de Perfil dentro de la aplicacion. Al eliminar tu cuenta:</p>
        <ul>
          <li>Se elimina tu informacion de perfil.</li>
          <li>Se eliminan todos tus datos de progreso y resultados de examenes.</li>
          <li>Se revoca el acceso a la aplicacion.</li>
          <li>Este proceso es irreversible.</li>
        </ul>
      </section>

      <section>
        <h2>7. Seguridad</h2>
        <p>Implementamos medidas de seguridad para proteger tu informacion personal, incluyendo cifrado en transito (HTTPS/TLS) y autenticacion segura a traves de proveedores de identidad confiables (Google y Apple).</p>
      </section>

      <section>
        <h2>8. Menores de edad</h2>
        <p>Piloteai no esta dirigida a menores de 13 anos. No recopilamos intencionalmente informacion de menores de 13 anos.</p>
      </section>

      <section>
        <h2>9. Cambios a esta politica</h2>
        <p>Podemos actualizar esta politica de privacidad periodicamente. Te notificaremos sobre cambios significativos a traves de la aplicacion o por correo electronico.</p>
      </section>

      <section>
        <h2>10. Contacto</h2>
        <p>Si tienes preguntas sobre esta politica de privacidad, puedes contactarnos en:</p>
        <p><a href="mailto:soporte@piloteai.cl">soporte@piloteai.cl</a></p>
      </section>

      <section>
        <h2>Descargo de responsabilidad</h2>
        <p>Piloteai es una aplicacion independiente de preparacion de examenes. No esta afiliada, asociada, autorizada, respaldada ni conectada oficialmente con la Direccion General de Aeronautica Civil (DGAC) de Chile ni con ninguna otra entidad gubernamental. El contenido es de caracter educativo y no reemplaza el material oficial de estudio.</p>
      </section>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Política de Privacidad - Piloteai',
  description: 'Conoce cómo Piloteai recopila, utiliza y protege tu información personal. Política de privacidad actualizada.',
  ogTitle: 'Política de Privacidad - Piloteai',
  ogDescription: 'Conoce cómo Piloteai recopila, utiliza y protege tu información personal.',
  ogType: 'website',
  robots: 'noindex, follow',
})
const today = new Date().toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })
</script>

<style scoped>
.legal-page {
  padding: 60px 0;
}

.legal-page h1 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 8px;
}

.updated {
  color: var(--text-muted);
  font-size: 14px;
  margin-bottom: 48px;
}

section {
  margin-bottom: 36px;
}

h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--accent-light);
}

p {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 12px;
}

ul {
  padding-left: 24px;
  margin-bottom: 12px;
}

li {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 6px;
}

li strong {
  color: var(--text-primary);
}
</style>
