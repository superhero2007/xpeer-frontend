<template lang="pug">
portal(to="modal")
  .card-modal
    .card-modal__overlay(@click.stop.prevent="onClose")
    .card-modal__inner
      .card-modal__inner__title Edit Card
        .card-modal__inner__title__notification(v-if="score")
          v-icon(name="check" :scale="2")
      span.card-modal__inner__label Title:
      input(
        v-model="card.title"
        placeholder="Please enter title"
      )
      .card-modal__inner__content
        .card-modal__inner__content__header
          span.card-modal__inner__label Tasks:
          bt-button(@click="onAddTask" icon)
            v-icon(name="plus")
        div.card-modal__inner__content__item(
          v-for="task in card.tasks"
        )
          input(
            :key="task.id"
            :value="task.description"
            placeholder="Please enter task"
            @change="e => onChangeTask({id: task.id, description: e.target.value})"
          )
          bt-button(@click="() => {onDeleteTask(task)}" type="danger" icon)
            v-icon(name="times")
      vue-slider(
        v-model="score"
        :max="1"
        tooltip="none"
        :height="10"
        :dotSize="20"
        :railStyle="{backgroundColor: '#bbc5ca'}"
      )
      div.card-modal__inner__footer
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
      card: {
        title: 'Undefined Title',
        tasks: [],
        success: false,
        lastTaskId: 0
      },
      score: 0
    }
  },
  computed: {
    ...mapState('cards', ['cardToEdit'])
  },
  created() {
    if (this.cardToEdit) {
      this.card = Object.assign({}, this.cardToEdit)
      this.score = this.card.success ? 1 : 0
    }
  },
  methods: {
    ...mapActions('cards', ['updateCard', 'createCard']),
    ...mapMutations('cards', ['SET_CARD_MODAL', 'SET_CARD_TO_EDIT']),
    onChangeTask(updated) {
      this.card.tasks = this.card.tasks.map(task => (task.id === updated.id ? updated : task))
    },
    onSave() {
      if (this.cardToEdit.id) {
        const data = {
          ...this.card,
          success: Boolean(this.score)
        }
        this.updateCard({ id: this.cardToEdit.id, data })
      } else {
        this.createCard({ data: this.card })
      }
      this.SET_CARD_MODAL(false)
      this.SET_CARD_TO_EDIT(null)
    },
    onClose() {
      this.SET_CARD_MODAL(false)
      this.SET_CARD_TO_EDIT(null)
    },
    onAddTask() {
      this.card.tasks = [
        ...this.card.tasks,
        {
          id: this.card.lastTaskId,
          description: ''
        }
      ]
      this.card = {
        ...this.card,
        lastTaskId: this.card.lastTaskId + 1
      }
    },
    onDeleteTask(value) {
      this.card.tasks = this.card.tasks.filter(task => task.id !== value.id)
    }
  }
}
</script>

<style lang="scss">
.card-modal {
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
    position: relative;
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

    &__title {
      font-size: 30px;
      text-align: center;
      margin-bottom: 2rem;

      &__notification {
        position: absolute;
        top: 1rem;
        right: 1rem;
        color: #2aac64;
      }
    }

    &__label {
      margin: 0.5rem 0;
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
      margin-top: 1rem;
    }

    &__content {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;

      &__item {
        display: flex;

        input {
          flex: 1;
        }

        .bt-button {
          margin-left: 1rem;
        }
      }

      &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
      }
    }
  }
}
</style>
