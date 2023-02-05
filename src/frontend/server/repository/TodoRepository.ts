import axios from "axios";

export default function TodoRepository(): RemoteTodoRepository {
  return {
    getAll: () => (
      axios.get(`${process.env.API_URL}/todo`)
        .then(response => response.data)
    ),

    create: (data) => (
      axios.put(`${process.env.API_URL}/todo`, data)
        .then(response => response.data)
    ),

    complete: (id) => (
      axios.post(`${process.env.API_URL}/todo/${id}/complete`)
        .then(response => response.data)
    ),

    uncomplete: (id) => (
      axios.post(`${process.env.API_URL}/todo/${id}/uncomplete`)
        .then(response => response.data)
    )
  }
}
