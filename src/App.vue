<script>
import MainHeader from '@/components/MainHeader.vue';
import FilterBar from '@/components/FilterBar.vue';
import ResourceList from '@/components/ResourceList.vue';
import SearchBox from '@/components/SearchBox.vue';
import DialogModal from '@/components/DialogModal.vue';
import resourcesData from '@/data/resources.json';

export default {
  name: 'App',
  components: {
    MainHeader,
    FilterBar,
    ResourceList,
    SearchBox,
    DialogModal
  },
  data() {
    return {
      resources: resourcesData,
      show: false,
    };
  }
};
</script>

<template>
  <MainHeader />
  <main class="main-grid">
    <div class="main-grid__top">
      <SearchBox />
      <button type="button" class="button button--secondary">Reset filters</button>
      <button type="button" class="button" @click="show = true">New Resource</button>
    </div>
    <FilterBar class="main-grid__filterbar" />
    <ResourceList class="main-grid__resource-list" :resource-list="resources" />
    <DialogModal v-if="show" v-model:show="show" >
      <template #header>
        TODO: Header for the new resource modal, it has to control if it's new or editing an existing resource.
      </template>
      <template #body>
         TODO: Implement the form for the new resource.
      </template>
    </DialogModal> //v-if will ensure the modal is only rendered when 'show' is true
  </main>
</template>

<style scoped>
/* Main layout: centered column holding top bar, filters and list */
.main-grid {
  width: 100;
  max-width: var(--max-window-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 42px;
  padding-bottom: 56px;
}

/* Top bar: search box + reset and new resource buttons */
.main-grid__top {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 12px;
  align-items: center;
}

/* Full-width filter bar */
.main-grid__filterbar {
  width: 100%;
}

/* Resource list container */
.main-grid__resource-list {
  width: 100%;
}

/* Loading state replacing the list */
.main-grid__resource-list--loading {
  display: grid;
  place-items: center;
  min-height: 200px;
  font-weight: 600;
}

@media (max-width: 720px) {
  .main-grid {
    width: min(100% - 28px, 1180px);
    padding-top: 24px;
  }

  .main-grid__top {
    grid-template-columns: 1fr 1fr;
  }

  .main-grid__top .search-box {
    grid-column: 1 / -1;
  }
}
</style>
