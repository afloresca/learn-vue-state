<script>
import ResourceCard from '@/components/ResourceCard.vue';

export default {
  name: 'ResourceList',
  components: {
    ResourceCard,
  },
  props: {
    resourceList: {
      type: Array,
      required: true,
    },
  },
  emits: ['select-resource'],
  methods: {
    selectResource(resource) {
      this.$emit('select-resource', resource);
    }
  }
};
</script>

<template>
  <ul class="resource-list">
    <li v-for="resource in resourceList" :key="resource.id" @click="selectResource(resource)">
      <ResourceCard :resource="resource" />
    </li>
  </ul>
</template>

<style scoped>
/* Resource list: ul in a single-column grid; each li holds a card */
.resource-list {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 14px;
  padding: 0;
  margin: 0;
}
</style>
