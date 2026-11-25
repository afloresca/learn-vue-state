<script>
export default {
  name: 'NoteList',
  props: {
    notes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      localList: [...this.notes],  //copy of the notes array
      newNote: ''
    };
  },
  methods: {
    addNote() {
      if (this.newNote.trim() !== '') {
        this.localList.push({ 
          id: crypto.randomUUID(),
          content: this.newNote,
          createdAt: new Date()
         });
        this.newNote = '';
        this.$emit('update_notes', this.localList);
      }
    }
  }
}
</script>
<template>

  <div class="note-list">
    <div class="note-list__input-group">
      <input class="note-list__input" type="text" v-model="newNote" placeholder="Add a note"/>
      <button type="button" class="button" @click="addNote">Add Note</button>
    </div>

      <div class="note-list__items">
        <div v-for="(note, index) in localList" :key="index" class="note-list__item">
          <span class="note-list__content">{{ note.content }}</span>
          <button type="button" class="note-list__delete" @click="localList.splice(index, 1); $emit('update_notes', localList)  ">×</button>
        </div>
    </div>
  </div>

</template>

<style scoped>
/* Note list: input + button on top, items below */
.note-list {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Add row: input + button */
.note-list__input-group {
  display: flex;
  gap: 8px;
}

.note-list__input {
  flex: 1;
  padding: 9px 10px;
  background-color: var(--white);
  border: 1px solid var(--text-muted);
  border-radius: 6px;
  color: var(--text-dark);
  font-family: var(--font-family);
  font-size: 0.85rem;
  outline: none;
}

.note-list__input:focus {
  border-color: var(--primary);
  background-color: var(--white);
  box-shadow: 0 0 0 3px var(--shadow);
}

/* Scrollable notes container (ul) */
.note-list__items {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 150px;
  overflow-y: auto;
}

/* Single note (li): text + delete button */
.note-list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background-color: var(--white);
  border: 1px solid var(--surface-accent-strong);
  border-radius: 6px;
}

.note-list__content {
  color: var(--text-dark);
  font-size: 0.85rem;
}

/* × button to delete the note */
.note-list__delete {
  background: none;
  border: none;
  color: var(--color-danger);
  font-size: 1.2rem;
  cursor: pointer;
  line-height: 1;
}

</style>