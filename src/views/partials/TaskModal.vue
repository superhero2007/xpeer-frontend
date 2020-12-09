<template lang="pug">
portal(to="modal")
  .task-modal
    .task-modal__overlay(@click.stop.prevent="onClose")
    .task-modal__inner
      .task-modal__inner__header Edit task
      .task-modal__inner__content
        span.label Description:
        input(
          v-model="task"
          placeholder="Please enter task"
        )
      .task-modal__inner__footer
        bt-button(@click="onSave") Save
        bt-button(@click="onClose" type="danger") Cancel
</template>

<script>
import VueSlider from 'vue-slider-component'
import { mapState, mapActions, mapMutations } from 'vuex'
import BtButton from '../../components/BtButton/BtButton'

export default {
  name: 'CardModal',
  components: {
    BtButton,
    VueSlider
  },
  data() {
    return {
      task: null
    }
  },
  computed: {
    ...mapState('cards', ['cardToEdit'])
  },
  methods: {
    ...mapActions('cards', ['updateCard']),
    ...mapMutations('cards', ['SET_TASK_MODAL', 'SET_CARD_TO_EDIT']),
    onSave() {
      const data = {
        ...this.cardToEdit,
        tasks: [
          ...this.cardToEdit.tasks,
          {
            id: this.cardToEdit.lastTaskId,
            description: this.task
          }
        ],
        lastTaskId: this.cardToEdit.lastTaskId + 1
      }
      this.updateCard({ id: this.cardToEdit.id, data })
      this.SET_TASK_MODAL(false)
      this.SET_CARD_TO_EDIT(null)
    },
    onClose() {
      this.SET_TASK_MODAL(false)
    }
  }
}
</script>

<style lang="scss">
.task-modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  overflow: hidden;
  z-index: 200;
  margin: 0 1rem;

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    background-color: rgba(200, 200, 200, 0.6);
    z-index: 1;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    max-width: 800px;
    width: 100%;
    background-color: white;
    padding: 20px;
    border: 1px solid black;
    border-radius: 1rem;
    margin: auto;
    z-index: 200;

    &__header {
      font-size: 30px;
      text-align: center;
      margin-bottom: 2rem;
    }

    &__content {
      display: flex;
      flex-direction: column;
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
      margin-top: 1rem;
    }

    .label {
      margin: 0.5rem 0;
    }
  }
}
</style>
