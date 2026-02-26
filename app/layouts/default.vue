<template>
  <div class="layout">
    <header class="header">
      <div class="container header-inner">
        <NuxtLink to="/" class="logo">
          <img src="/icon.png" alt="Piloteai" class="logo-img" />
          <span class="logo-text">Piloteai</span>
        </NuxtLink>
        <nav class="nav">
          <NuxtLink to="/licencias" class="nav-link">Licencias</NuxtLink>
          <NuxtLink to="/privacidad" class="nav-link">Privacidad</NuxtLink>
          <NuxtLink to="/soporte" class="nav-link">Soporte</NuxtLink>
          <NuxtLink to="/acceder" class="nav-link">Acceder</NuxtLink>
          <a href="/#planes" class="nav-cta">
            Comenzar Ahora
          </a>
        </nav>
      </div>
    </header>

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <div class="container footer-inner">
        <div class="footer-top">
          <div class="footer-brand">
            <div class="footer-logo-row">
              <img src="/icon.png" alt="Piloteai" class="footer-logo" />
              <span class="footer-name">Piloteai</span>
            </div>
            <p class="footer-tagline">Preparación inteligente para exámenes DGAC.</p>
          </div>
          <div class="footer-nav">
            <div class="footer-col">
              <h4>Producto</h4>
              <a href="/#planes">Comenzar</a>
              <NuxtLink to="/licencias">Licencias DGAC</NuxtLink>
            </div>
            <div class="footer-col">
              <h4>Legal</h4>
              <NuxtLink to="/privacidad">Privacidad</NuxtLink>
              <NuxtLink to="/soporte">Soporte</NuxtLink>
            </div>
            <div class="footer-col">
              <h4>Contacto</h4>
              <a href="mailto:soporte@piloteai.cl">soporte@piloteai.cl</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-disclaimer">Piloteai no esta afiliado con la DGAC de Chile.</p>
          <p class="footer-copy">&copy; {{ new Date().getFullYear() }} Piloteai. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(6, 14, 26, 0.8);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border-bottom: 1px solid var(--border);
}

.container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 28px;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text-primary);
}

.logo-img {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
}

.logo-text {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 400;
  letter-spacing: -0.01em;
}

.nav {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-link {
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
  letter-spacing: 0.01em;
}

.nav-link:hover {
  color: var(--text-primary);
}

.nav-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--accent);
  color: #fff;
  padding: 9px 18px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s;
  letter-spacing: 0.01em;
}

.nav-cta:hover {
  background: var(--accent-hover);
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(62, 189, 79, 0.3);
}

.main {
  flex: 1;
}

/* Footer */
.footer {
  border-top: 1px solid var(--border);
  padding: 56px 0 36px;
  margin-top: 0;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  gap: 60px;
  margin-bottom: 48px;
}

.footer-brand {
  max-width: 260px;
}

.footer-logo-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.footer-logo {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
}

.footer-name {
  font-family: var(--font-display);
  font-size: 20px;
  color: var(--text-primary);
}

.footer-tagline {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
}

.footer-nav {
  display: flex;
  gap: 56px;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-col h4 {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.footer-col a {
  font-size: 14px;
  color: var(--text-secondary);
  transition: color 0.2s;
}

.footer-col a:hover {
  color: var(--text-primary);
}

.footer-bottom {
  border-top: 1px solid var(--border);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-disclaimer,
.footer-copy {
  font-size: 12px;
  color: var(--text-muted);
}

@media (max-width: 1024px) {
  .container {
    padding: 0 24px;
  }

  .footer-nav {
    gap: 40px;
  }
}

@media (max-width: 640px) {
  .container {
    padding: 0 20px;
  }

  .header-inner {
    height: 56px;
  }

  .logo-img {
    width: 30px;
    height: 30px;
  }

  .logo-text {
    font-size: 19px;
  }

  .nav {
    gap: 16px;
  }

  .nav-link {
    display: none;
  }

  .nav-cta {
    padding: 8px 14px;
    font-size: 12px;
  }

  .footer {
    padding: 40px 0 28px;
  }

  .footer-top {
    flex-direction: column;
    gap: 32px;
    margin-bottom: 32px;
  }

  .footer-brand {
    max-width: 100%;
  }

  .footer-nav {
    gap: 28px;
    flex-wrap: wrap;
  }

  .footer-col {
    min-width: 120px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 6px;
    text-align: center;
  }

  .footer-disclaimer,
  .footer-copy {
    font-size: 11px;
  }
}
</style>
