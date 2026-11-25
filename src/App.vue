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
      form: {},
      filters: {
        sortBy: 'alphabetical',
        orderBy: 'ascending',
        type: '',
        tag: '',
        minProgress: 0
      },
      query: '',
      allResources: resourcesData
    };
  },
  methods: {
    resetForm() {
      this.form = {
        id: null,
        title: '',
        image: '',
        description: '',
        type: '',
        tags: [],
        url: '',
        progress: 0,
        createdAt: '',
        learningNotes: []
      };
    },
    fillForm(data) {
      this.form = data;
      this.show = true;
    },
    createResource() {
      this.resetForm();
      this.form.title = 'New Resource';
      this.show = true;
    },
    save(data){
      if (data.id){
        const index = this.resources.findIndex(r => r.id === data.id);
        if (index !== -1) {
          this.resources.splice(index, 1, data);
        }
      } else {
        const newResource = {
          ...data,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString()
        };
        this.resources.push(newResource);
      }
      this.allResources = this.resources;  //save the updated list of all resources
      this.show = false;
    },

    searchItem() {
      if (!this.query) {
       return;
      }
      this.resources = this.resources ? this.resources.filter(resource => resource.title.toLowerCase().includes(this.query.toLowerCase())) : [];
    },

    resetFilters() {
      this.resources = this.allResources;
      this.query = '';
      this.$refs.searchBox.setQuery('');
      this.$refs.filterBar.resetFilters();
    },



    sortBy(filteredResources) {
      switch (this.filters.sortBy) {
        case 'alphabetical':
          filteredResources = filteredResources.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'createdAt':
          filteredResources = filteredResources.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        case 'progress':
          filteredResources = filteredResources.sort((a, b) => a.progress - b.progress);
          break;
      }
      //by default the order is ascending, if orderBy is 'descending' we reverse the array
      if (this.filters.orderBy === 'descending') {
        filteredResources = filteredResources.reverse();
      }
      return filteredResources;     
    },

    applyFilters() {
      // Apply the filters to the resources
      let filteredResources = this.allResources;
      if (this.filters.type) {
        filteredResources = filteredResources.filter(r => r.type.toLocaleLowerCase() === this.filters.type.toLocaleLowerCase());
      }
      if (this.filters.tag) {
        filteredResources = filteredResources.filter(r => r.tags.toLocaleLowerCase().includes(this.filters.tag.toLocaleLowerCase()));
      }
      if (this.filters.minProgress) {
        filteredResources = filteredResources.filter(r => r.progress >= this.filters.minProgress);
      }
      this.resources =  this.sortBy(filteredResources); //now let's apply the order
    },

    updateList() {
      this.applyFilters();
      this.searchItem()
    },

    setQuery(query) {
      this.query = query;
      this.updateList();
    },

    setFilters(filters) {
      this.filters = filters;
      this.updateList();
    },

      // Handle the delete event from the dialog modal
    deleteResource(resource) {
      this.resources = this.resources.filter(r => r.id !== resource.id); //remove it from anywhere
      this.allResources = this.allResources.filter(r => r.id !== resource.id);
      this.show = false;
    }
  }
};
</script>

<template>
  <MainHeader />
  <main class="main-grid">
    <div class="main-grid__top">
      <SearchBox ref="searchBox" @search="setQuery($event)"/>
      <button type="button" class="button button--secondary" @click="resetFilters">Reset filters</button>
      <button type="button" class="button" @click="createResource">New Resource</button>
    </div>
    <FilterBar ref="filterBar" class="main-grid__filterbar"  @resetFilters="resetFilters" @update-filters="setFilters($event)"/>
    <ResourceList class="main-grid__resource-list" :resource-list="resources" @select-resource="fillForm"
    />
    <DialogModal v-if="show" v-model:show="show" :form="form" @save="save" @deleteResource="deleteResource">
    </DialogModal> <!-- v-if will ensure the modal is only rendered when 'show' is true -->
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
