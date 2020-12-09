<template lang="pug">
  div.card(:class="{'card--success': success}")
    span.card__title {{title}}
    div.card__task
      .card__task__header
        span.label Tasks:
        bt-button(@click="() => {SET_TASK_MODAL(true); SET_CARD_TO_EDIT(card)}" icon)
          v-icon(name="plus")
      .card__task__item(
        v-for="task in tasks"
        :key="task.id"
      )
        span.card__task__item__description {{task.description}}
        bt-button(@click="() => {onDeleteTask(task)}" type="danger" icon)
          v-icon(name="times")
    vue-slider(
      v-model="score"
      :max="1"
      tooltip="none"
      :height="15"
      :dotSize="25"
      :railStyle="{backgroundColor: '#7e8d94'}"
      :dragEnd="onScoreChanged()"
    )
    div(:style="{position: 'absolute', top: '1rem', right: '1rem'}")
      bt-button(@click="() => {SET_CARD_MODAL(true); SET_CARD_TO_EDIT(card)}" icon)
        v-icon(name="edit")
      bt-button(@click="() => {onDeleteCard(id)}" type="danger" icon)
        v-icon(name="times")
    confirm-dialog(
      v-if="showConfirmDialog"
      :msg="confirmMsg"
      @close="() => {SET_CONFIRM_DIALOG(false)}"
    )
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import BtButton from '../../components/BtButton/BtButton'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
import ConfirmDialog from './ConfirmDialog'

export default {
  name: 'Card',
  components: { ConfirmDialog, BtButton, VueSlider },
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: false,
      default: 'Undefined'
    },
    tasks: {
      type: Array,
      required: false,
      default: null
    },
    success: {
      type: Boolean,
      required: false,
      default: false
    },
    lastTaskId: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      score: this.success ? 1 : 0,
      next: null
    }
  },
  computed: {
    ...mapState('cards', ['showConfirmDialog', 'confirmMsg']),
    card() {
      return {
        id: this.id,
        title: this.title,
        tasks: this.tasks,
        lastTaskId: this.lastTaskId,
        success: this.success
      }
    }
  },
  methods: {
    ...mapActions('cards', ['createCard', 'deleteCard', 'updateCard']),
    ...mapMutations('cards', ['SET_CARD_MODAL', 'SET_CARD_TO_EDIT', 'SET_TASK_MODAL', 'SET_CONFIRM_DIALOG', 'SET_CONFIRM_MESSAGE', 'SET_CONFIRM_DIALOG_BUTTON_CLICK']),
    onScoreChanged() {
      if (this.success !== Boolean(this.score)) {
        const data = {
          title: this.title,
          tasks: this.tasks,
          success: Boolean(this.score)
        }
        this.updateCard({ id: this.id, data })
      }
    },
    onDeleteTask(value) {
      const data = {
        ...this.card,
        tasks: this.card.tasks.filter(task => task.id !== value.id)
      }
      const msg = `Are you sure delete this task: ${value.description}?`
      this.SET_CONFIRM_DIALOG(true)
      this.SET_CONFIRM_MESSAGE(msg)
      this.SET_CONFIRM_DIALOG_BUTTON_CLICK({
        onButtonClick: () => {
          this.updateCard({ id: this.id, data })
        }
      })
    },
    onDeleteCard(id) {
      const msg = `Are you sure delete this card: ${this.title}?`
      this.SET_CONFIRM_DIALOG(true)
      this.SET_CONFIRM_MESSAGE(msg)
      this.SET_CONFIRM_DIALOG_BUTTON_CLICK({
        onButtonClick: () => {
          this.deleteCard({ id })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.card {
  position: relative;
  padding: 2rem;
  background-color: aliceblue;
  border-radius: 1rem;
  border: 1px solid #222222;
  margin-bottom: 1rem;

  &--success {
    background-color: #6bcf97;
  }

  &__title {
    font-size: 26px;
    font-weight: bold;
    line-height: 1.5;
  }

  &__task {
    display: flex;
    flex-direction: column;

    .label {
      font-size: 20px;
      line-height: 1.5;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      margin: 1rem 0 0.5rem;
    }

    &__item {
      background-color: khaki;
      border-radius: 0.5rem;
      padding: 0.5rem 0 0.5rem 0.5rem;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      flex: 1;

      &__description {
        text-overflow: ellipsis;
        overflow: hidden;
        width: -webkit-fill-available;
        white-space: pre;
      }

      .bt-button {
        margin-left: 0.5rem;
      }
    }
  }
}
</style>
