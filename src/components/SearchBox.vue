<script>
export default {
  name: 'SearchBox',
};
</script>

<template>
  <input class="search-box" type="text" placeholder="Search resources..." value="" />
</template>

<style scoped>
/* Search box with embedded magnifier icon */
.search-box {
  width: 100%;
  min-height: 44px;
  padding: 10px 16px 10px 42px;
  border-radius: 8px;
  border: 1px solid var(--surface-accent-strong);
  background-color: var(--white);
  color: var(--text-dark);
  font-size: 16px;
  box-shadow: 0 2px 8px var(--shadow);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%236d4cc2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cpath d='m20 20-4-4'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: 14px center;
}

.search-box::placeholder {
  color: var(--text-muted);
}
</style>
