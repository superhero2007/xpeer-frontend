<template lang="pug">
  .dashboard
    loader(v-if="loading" centered)
    .cards-container(v-else)
      bt-button(
        @click="onAddCard"
        :style="{margin: '0 0 1rem auto', display: 'block'}"
      ) Add Card
      card(
        v-for="card in cards"
        :key="card.id"
        :id="card.id"
        :title="card.title"
        :tasks="card.tasks"
        :success="card.success"
        :lastTaskId="card.lastTaskId"
      )
    card-modal(v-if="showCardModal")
    task-modal(v-if="showTaskModal")
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Loader from '../components/Loader/Loader'
import Card from './partials/Card'
import CardModal from './partials/CardModal'
import TaskModal from './partials/TaskModal'
import BtButton from '../components/BtButton/BtButton'

export default {
  name: 'AppIndex',
  components: { BtButton, CardModal, Loader, Card, TaskModal },
  computed: {
    ...mapState('cards', ['cards', 'loading', 'showCardModal', 'showTaskModal'])
  },
  watch: {},
  created() {
    this.fetchCards().then()
  },
  methods: {
    ...mapActions('cards', ['fetchCards']),
    ...mapMutations('cards', ['SET_CARD_MODAL', 'SET_CARD_TO_EDIT']),
    onAddCard() {
      const data = {
        title: '',
        tasks: [],
        lastTaskId: 0,
        success: false
      }
      this.SET_CARD_MODAL(true)
      this.SET_CARD_TO_EDIT(data)
    }
  }
}
</script>

<style lang="scss">
.dashboard {
  overflow: auto;
  height: 100vh;

  .cards-container {
    padding: 1rem;
  }
}
</style>
