<script>
export default {
  name: 'FilterBar',
  data() {
    return {
      typeOptions: [
        { value: 'video', label: 'Video' },
        { value: 'article', label: 'Article' },
        { value: 'course', label: 'Course' },
        { value: 'book', label: 'Book' },
        { value: 'documentation', label: 'Documentation' },
      ],
      sortByOptions: [
        { value: 'alphabetical', label: 'Alphabetical' },
        { value: 'createdAt', label: 'Created date' },
        { value: 'progress', label: 'Progress' },
      ],
      orderByOptions: [
        { value: 'ascending', label: 'Ascending' },
        { value: 'descending', label: 'Descending' },
      ],
      tagOptions: ['frontend', 'backend', 'devops'],

    filters: {
      sortBy: 'alphabetical',
      orderBy: 'ascending',
      type: '',
      tag: '',
      minProgress: 0
    }
  };
  },
    methods: {
      resetFilters() {
        this.filters = {
          sortBy: 'alphabetical',
          orderBy: 'ascending',
          type: '',
          tag: '',
          minProgress: 0
        };
      },
    },
  // Here I just wanted to use watchers to test them ref.(https://vuejs.org/guide/essentials/watchers.html) -->
  watch: {
    filters: {
      handler(newVal) {
        this.$emit('update-filters', newVal);
      },
      deep: true // must watch deep to react to any nested mutation
    }
  }
};
</script>

<template>
  <form class="filter">
    <!-- Filter fields, let's do the binding to filters with v-model -->
    <div class="filter__field">      
      <label for="sort-by" class="filter__label">Sort by:</label>
      <select id="sort-by" class="filter__select" v-model="filters.sortBy">
        <option v-for="option in sortByOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>

    <div class="filter__field">
      <label for="order-by" class="filter__label">Order by:</label>
      <select id="order-by" class="filter__select" v-model="filters.orderBy">
        <option v-for="option in orderByOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>

    <div class="filter__field">
      <label for="type" class="filter__label">Type:</label>
      <select id="type" class="filter__select" v-model="filters.type">
        <option value="">All</option>
        <option v-for="option in typeOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>

    <div class="filter__field">
      <label for="tag" class="filter__label">Tag:</label>
      <select id="tag" class="filter__select" v-model="filters.tag">
        <option value="">All</option>
        <option v-for="option in tagOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <div class="filter__field">
      <label for="min-progress" class="filter__label">Min progress: {{ filters.minProgress }}%</label>
      <div class="filter__range-wrap">
        <input type="range" id="min-progress" class="filter__range" min="0" max="100" v-model="filters.minProgress" />
      </div>
    </div>
  </form>
</template>

<style scoped>
/* Filter bar: grid of selects + progress range */
.filter {
  display: grid;
  grid-template-columns: repeat(4, minmax(130px, 1fr)) minmax(180px, 1.3fr);
  align-items: stretch;
  gap: 12px;
  padding: 16px;
  border: 1px solid var(--white);
  border-radius: 10px;
  background-color: var(--white);
  box-shadow: 0 3px 12px var(--shadow);
}

/* Single filter: label + control */
.filter__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter__label {
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 600;
}

.filter__select {
  width: 100%;
  min-height: 40px;
  background-color: var(--white);
  color: var(--text-dark);
  border: 1px solid var(--text-muted);
  border-radius: 7px;
  padding: 8px 10px;
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.2s;
}

.filter__select:hover {
  border-color: var(--primary);
}

.filter__select:focus {
  outline: none;
  border-color: var(--primary);
}

.filter__range {
  width: 100%;
  height: 8px;
  accent-color: var(--primary);
  background: var(--surface-accent-strong);
  border-radius: 4px;
  outline: none;
  cursor: pointer;
}

/* Wrapper that vertically centers the slider inside the field */

.filter__range-wrap {
  flex: 1;
  display: flex;
  align-items: center;
}

@media (max-width: 900px) {
  .filter {
    grid-template-columns: repeat(3, minmax(140px, 1fr));
  }
}

@media (max-width: 600px) {
  .filter {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .filter__field:last-child {
    grid-column: 1 / -1;
  }
}
</style>
