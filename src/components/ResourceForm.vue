<script>
import NoteList from './NoteList.vue';

export default {
  name: 'ResourceForm',
  components: {NoteList},
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localForm: {
        ...this.form  //copy all properties from the form prop into the localForm object with ... spread syntax
        },
      error: '',
      showNotes: false
    };
  },
  methods: {
    validateForm() {
      this.error = ''; // Reset errors before validation
      if (!this.localForm.title) {
        this.error = 'Title is required';
      }
      if (!this.localForm.image) {
        this.error = 'image is required';
      }
      if (!this.localForm.description) {
        this.error = 'Description is required';
      }
      if (!this.localForm.type) {
        this.error = 'Article is required';
      }
      if (!this.localForm.url) {
        this.error = 'URL is required';
      }
      return this.error === '';
    },
    save(){
      if (!this.validateForm(this.localForm)) {
          return;
      }
      this.$emit('save', {
          ...(this.localForm)
      });
    },
    openNotes() {
      this.showNotes = true;
    }
  }
}


</script>
<template>
  <div class="resource-form">
    <img v-if="localForm.image" :src="localForm.image" alt="Resource image" class="resource-form__image" />
    <div class="resource-form__container">
      <div class="resource-form__group">
        <label class="resource-form__label" for="title">Title</label>
        <input class="resource-form__input" id="title" v-model="localForm.title" placeholder="Enter title" />
      </div>
      <div class="resource-form__group">
        <label class="resource-form__label" for="image">Image URL</label>
        <input class="resource-form__input" id="image" v-model="localForm.image" placeholder="Enter image URL" />
      </div>
      <div class="resource-form__group resource-form__group--full">
        <label class="resource-form__label" for="description">Description</label>
        <textarea class="resource-form__textarea" id="description" v-model="localForm.description" placeholder="Enter description"></textarea>
      </div>
      <div class="resource-form__group">
        <label class="resource-form__label" for="type">Article</label>
        <input class="resource-form__input" id="type" v-model="localForm.type" placeholder="article" />
      </div>
      <div class="resource-form__group">
        <label class="resource-form__label" for="tags">Tags</label>
        <input class="resource-form__input" id="tags" v-model="localForm.tags" placeholder="Enter tags" />
      </div>
      <div class="resource-form__group resource-form__group--full">
        <label class="resource-form__label" for="url">URL</label>
        <input class="resource-form__input" id="url" v-model="localForm.url" placeholder="Enter URL" />
      </div>
      <div class="resource-form__group resource-form__group--full">
        <label class="resource-form__label" for="progress">Progress {{ localForm.progress }}%</label>
      </div>
      <div class="resource-form__group resource-form__group--full">
        <input type="range" id="min-progress" min="0" max="100" v-model="localForm.progress" />
      </div>

      <div class="resource-form__group--full">
        <label class="resource-form__label" for="notes">Notes</label>
        <div class="resource-form__notes-controls">
          <input class="resource-form__input" id="notes" v-model="localForm.notes" placeholder="Enter notes" />
          <button type="button" class="button" @click="openNotes"> Add Note</button>
        </div>
      </div>

      <div class="resource-form__group resource-form__actions">
        <button class="button" @click="save">Save</button>
        <button class="button resource-form__btn--cancel">Delete</button>
      </div>
    </div>
    <div v-if="error" class="resource-form__error">
      {{ error }}
    </div>
    <NoteList v-if="showNotes" :notes="localForm.learningNotes" />
  </div>
</template>
<style scoped>
/* Resource form: image on top and form in a 2-column grid */
.resource-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 0 0;
  background: var(--white);
  border-radius: 8px;
  width: 100%;
}

/* Resource header image */
.resource-form__image {
  width: 100%;
  max-height: 150px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid var(--white);
}

/* Form grid holding the fields */
.resource-form__container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

/* Field: label + control */
.resource-form__group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  /* Field spanning both columns */
}

.resource-form__group--full {
  grid-column: 1 / -1;
}

.resource-form__label {
  font-weight: 600;
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0;
}

.resource-form__input,
.resource-form__textarea {
  padding: 9px 10px;
  background-color: var(--white);
  border: 1px solid var(--text-muted);
  border-radius: 6px;
  color: var(--text-dark);
  font-family: var(--font-family);
  font-size: 0.85rem;
  transition: all 0.3s ease;
  outline: none;
}

.resource-form__input:focus,
.resource-form__textarea:focus {
  border-color: var(--primary);
  background-color: var(--white);
  box-shadow: 0 0 0 3px var(--shadow);
}

.resource-form__input::placeholder,
.resource-form__textarea::placeholder {
  color: var(--text-muted);
  font-size: 0.8rem;
}

.resource-form__textarea {
  resize: vertical;
  min-height: 40px;
}

/* Actions row: save / delete */
.resource-form__actions {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 8px;
}

/* Delete button (modifier on the global button) */
.resource-form__btn--cancel {
  background-color: var(--color-danger);
}

/* Validation error message */
.resource-form__error {
  color: var(--color-danger);
  font-weight: 600;
  font-size: 0.85rem;
}

@media (max-width: 560px) {
  .resource-form__container {
    grid-template-columns: 1fr;
  }

  .resource-form__group--full {
    grid-column: auto;
  }
}

/** añadimos css para que el botón de añadir nota se vea bien a la izquierda y el input ocupe el resto del espacio */   
.resource-form__notes-controls {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
}

</style>