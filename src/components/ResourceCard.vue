<script>
export default {
  name: 'ResourceCard',
  props: {
    resource: {
      type: Object,
      required: true,
    },
  }
};
</script>

<template>
  <div class="card">
    <img :src="resource.image" :alt="resource.title" class="card__image" />
    <div class="card__content">
      <div class="card__header">
        <p class="card__title line-clamp-1">{{ resource.title }}</p>
      </div>
      <p class="card__description line-clamp-3">{{ resource.description }}</p>
      <div class="card__progress">
        <div class="card__progress-bar" :style="{ width: `${resource.progress}%` }"></div>
      </div>
      <div class="card__footer">
        <ul class="card__badges">
          <li class="card__badge has-background-blue has-text-white">{{ resource.type }}</li>
          <li v-for="tag in resource.tags" :key="tag" class="card__badge has-background-grey has-text-dark">
            {{ tag }}
          </li>
        </ul>
        <span class="card__badge has-background-grey has-text-dark">{{ resource.progress }}%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Card: clickable card with image on the left and content on the right */
.card {
  display: grid;
  grid-template-columns: 112px minmax(0, 1fr);
  background-color: var(--white);
  border: 1px solid var(--white);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 12px var(--shadow);
  transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
  cursor: pointer;
  min-height: 148px;
}

.card:hover {
  transform: translateY(-4px);
  border-color: var(--primary);
  box-shadow: 0 8px 20px var(--shadow);
}

/* Card side image */
.card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  background: var(--white);
}

/* Content column: header, description, progress and footer */
.card__content {
  padding: 18px 20px;
  display: grid;
  grid-template-rows: auto 1fr auto auto;
  gap: 8px;
  height: 100%;
}

/* Header row with the title */
.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card__title {
  font-size: 17px;
  font-weight: bold;
  color: var(--text-dark);
}

/* Truncated description (uses global line-clamp-* utility) */
.card__description {
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.5;
}

/* Progress track */
.card__progress {
  width: 100%;
  height: 7px;
  background-color: var(--white);
  border-radius: 4px;
  overflow: hidden;
}

/* Bar fill; width is set inline via style */
.card__progress-bar {
  height: 100%;
  background-color: var(--primary);
  transition: width 0.3s ease;
}

/* Footer: badge list on the left and progress % on the right */
.card__footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

/* Badge group (ul with type + tags) */
.card__badges {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Single badge; color via global has-background-* / has-text-* utilities */
.card__badge {
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 12px;
  line-height: 1.2;
  font-weight: bold;
  max-height: 20px;
  text-transform: capitalize;
}

@media (max-width: 560px) {
  .card {
    grid-template-columns: 80px minmax(0, 1fr);
    min-height: 132px;
  }

  .card__content {
    padding: 14px;
  }

  .card__description {
    -webkit-line-clamp: 2;
  }
}
</style>
