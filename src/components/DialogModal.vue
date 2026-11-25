<script>
import ResourceForm from './ResourceForm.vue';

export default {
  name: 'DialogModal',
  components: {
    ResourceForm
  },
  emits: ['update:show', 'save', 'deleteResource'],  //I've added this because there was a warning on my web browser about missing emits ??
  props: {
    show: {
      type: Boolean,
      required: true
    },
    form: {
      type: Object,
      required: true
    }
  },
  methods: {
    close() {
      this.$emit('update:show', false);
    },
    save(data) {
      this.$emit('save', data);
    },
    deleteResource(data) {
      console.log(`Deleting resource with id: ${data.id}`);
      this.$emit('deleteResource', data);
    }
  }
}
</script>
<template>
  <Teleport to="body">
    <div v-if="show" @click.self="close" class="modal">
        <div id="content" class="modal__content">
            <div id="header" class="modal__header">
                <slot name="header"><h2>{{ form.title }}</h2></slot>  <!-- to place anything here ??-->
                <button class="modal__close" @click="close">X</button>
            </div>
            <div id="body" class="modal__body">
                <slot name="body"><ResourceForm :form="form" @save="save" @delete="deleteResource" /></slot> <!-- Here goes the content of the modal.-->

            </div>
            <div class="modal__body">
               <button @click="close" class="button">Close</button>
            </div>

        </div>
    </div>
  </Teleport>
</template>
<style scoped>
/* Modal: full-screen layer that wraps the whole dialog */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 24px;
  background: var(--shadow);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Dialog box centered inside the layer */
.modal__content {
  background: var(--white);
  border: 1px solid var(--white);
  border-radius: 12px;
  box-shadow: 0 8px 32px var(--shadow);
  min-width: 320px;
  width: min(980px, 90vw);
  max-width: 90vw;
  max-height: 90vh;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Header: title (slot) + close button */
.modal__header {
  background: var(--white);
  border-bottom: 1px solid var(--white);
  border-radius: 12px 12px 0 0;
  padding: 20px 24px 16px 24px;
  box-shadow: 0 2px 8px var(--shadow);
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

/* Close button, positioned at the header corner */
.modal__close {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--text-muted);
  cursor: pointer;
  z-index: 1;
  transition: color 0.2s;
}

.modal__close:hover {
  color: var(--primary);
}

/* Scrollable dialog body (default slot) */
.modal__body {
  padding: 0px 24px 24px 24px;
  overflow-y: auto;
}

</style>