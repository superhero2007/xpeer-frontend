import api from '@/api'

const state = {
  loading: false,
  cards: [],
  showCardModal: false,
  showTaskModal: false,
  showConfirmDialog: false,
  cardToEdit: null,
  confirmMsg: '',
  confirmDialogButtonClick: function() {}
}

const mutations = {
  SET_CARDS(state, payload) {
    state.cards = payload
  },
  START_LOADING(state) {
    state.loading = true
  },
  END_LOADING(state) {
    state.loading = false
  },
  SET_CARD_MODAL(state, status) {
    state.showCardModal = status
  },
  SET_CARD_TO_EDIT(state, payload) {
    state.cardToEdit = payload
  },
  SET_TASK_MODAL(state, status) {
    state.showTaskModal = status
  },
  SET_CONFIRM_DIALOG(state, status) {
    state.showConfirmDialog = status
  },
  SET_CONFIRM_MESSAGE(state, message) {
    state.confirmMsg = message
  },
  SET_CONFIRM_DIALOG_BUTTON_CLICK(state, payload) {
    state.confirmDialogButtonClick = payload.onButtonClick
  }
}

const actions = {
  fetchCards({ commit }) {
    commit('START_LOADING')

    return new Promise(resolve => {
      api
        .fetchCards()
        .then(response => {
          commit('SET_CARDS', response.data)
          commit('END_LOADING')
          resolve(response.data)
        })
        .catch(error => {
          console.log('fetchCards: ', error)
          commit('END_LOADING')
          commit('SET_CARDS', [])
        })
    })
  },
  createCard({ commit, dispatch }, payload) {
    const { data } = payload
    commit('START_LOADING')

    api
      .createCard(data)
      .then(() => {
        commit('END_LOADING')
        dispatch('fetchCards')
      })
      .catch(error => {
        console.log('createCard: ', error)
        commit('END_LOADING')
      })
  },
  updateCard({ commit, dispatch }, payload) {
    const { id, data } = payload
    commit('START_LOADING')

    api
      .updateCard(id, data)
      .then(() => {
        commit('END_LOADING')
        dispatch('fetchCards')
      })
      .catch(error => {
        console.log('updateCard: ', error)
        commit('END_LOADING')
      })
  },
  deleteCard({ commit, dispatch }, payload) {
    const { id } = payload
    commit('START_LOADING')

    api
      .deleteCard(id)
      .then(() => {
        commit('END_LOADING')
        dispatch('fetchCards')
      })
      .catch(error => {
        console.log('deleteCard: ', error)
        commit('END_LOADING')
      })
  }
}

const getters = {
  cards(state) {
    return state.cards
  }
}

export default { namespaced: true, state, getters, actions, mutations }
