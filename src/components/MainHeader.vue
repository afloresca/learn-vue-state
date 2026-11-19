<script>
export default {
  name: 'MainHeader',
  data() {
    return {
      name: 'Your Name',
    };
  },
};
</script>

<template>
  <header class="header">
    <div class="header__container">
      <img src="@/assets/logo.svg" alt="LearnStack Logo" class="header__logo" />
      <h1 class="header__title">LearnStack: Learning Resources for {{ name }}</h1>
    </div>
  </header>
</template>

<style scoped>
/* App fixed header */
.header {
  gap: 16px;
  width: 100%;
  height: 76px;
  min-height: 76px;
  border-bottom: 1px solid var(--white);
  box-shadow: 0 4px 18px var(--shadow);
  background: var(--surface-translucent);
}

/* Centered content: logo + title */
.header__container {
  width: 100%;
  max-width: var(--max-window-width);
  margin: auto;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
}

.header__logo {
  width: 42px;
  height: 42px;
  object-fit: contain;
}

.header__title {
  margin: 0;
  color: var(--text-dark);
  font-size: 22px;
  letter-spacing: 0;
  font-weight: 700;
}
</style>
