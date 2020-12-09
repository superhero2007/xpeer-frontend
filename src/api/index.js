import axios from 'axios'

export default {
  fetchCards: () => axios.get('api/v1/card'),
  createCard: data => axios.post('api/v1/card', data),
  updateCard: (id, data) => axios.put(`api/v1/card/${id}`, data),
  deleteCard: id => axios.delete(`api/v1/card/${id}`)
}
