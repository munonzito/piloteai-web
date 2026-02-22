<template>
  <div class="layout">
    <header class="header">
      <div class="container header-inner">
        <NuxtLink to="/" class="logo">
          <img src="/icon.png" alt="Piloteai" class="logo-img" />
          <span class="logo-text">Piloteai</span>
        </NuxtLink>
        <nav class="nav">
          <NuxtLink to="/privacidad">Privacidad</NuxtLink>
          <NuxtLink to="/soporte">Soporte</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <div class="container footer-inner">
        <div class="footer-brand">
          <img src="/icon.png" alt="Piloteai" class="footer-logo" />
          <p class="footer-text">Piloteai no esta afiliado con la DGAC de Chile.</p>
        </div>
        <div class="footer-links">
          <NuxtLink to="/privacidad">Politica de Privacidad</NuxtLink>
          <NuxtLink to="/soporte">Soporte</NuxtLink>
        </div>
        <p class="footer-copy">&copy; {{ new Date().getFullYear() }} Piloteai. Todos los derechos reservados.</p>
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
  border-bottom: 1px solid var(--bg-surface-light);
  position: sticky;
  top: 0;
  background: rgba(10, 25, 41, 0.9);
  backdrop-filter: blur(12px);
  z-index: 100;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text-primary);
}

.logo-img {
  width: 36px;
  height: 36px;
  border-radius: 8px;
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
}

.nav {
  display: flex;
  gap: 28px;
}

.nav a {
  color: var(--text-secondary);
  font-size: 15px;
  font-weight: 500;
  transition: color 0.2s;
}

.nav a:hover {
  color: var(--text-primary);
}

.main {
  flex: 1;
}

.footer {
  border-top: 1px solid var(--bg-surface-light);
  padding: 48px 0 32px;
  margin-top: 80px;
}

.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.footer-logo {
  width: 40px;
  height: 40px;
  border-radius: 10px;
}

.footer-text {
  font-size: 13px;
  color: var(--text-muted);
  text-align: center;
}

.footer-links {
  display: flex;
  gap: 24px;
}

.footer-links a {
  color: var(--text-secondary);
  font-size: 14px;
}

.footer-copy {
  font-size: 12px;
  color: var(--text-muted);
}
</style>
