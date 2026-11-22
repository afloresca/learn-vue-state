<script>
export default {
  name: 'ResourceForm',
  props: {
    Form: {
      type: Object,
      required: true
    }
  }
}
</script>
<template>
  <div class="resource-form">
    {{ Form }}
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

</style>