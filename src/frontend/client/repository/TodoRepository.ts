import axios from "axios"

type TodoRepository = {
  getAll: () => Promise<Todo[]>,
  create: (data: { title: string, tags: { name: string }[] }) => Promise<Todo>,
  complete: (id: number) => Promise<Todo>,
  uncomplete: (id: number) => Promise<Todo>,
}

export default function TodoRepository(): TodoRepository {
  return {
    getAll: () => (
      axios.get('/api/todos')
        .then(response => response.data)
        .then(todos => todos === '' ? null : todos)
    ),

    create: (data) => (
      axios.put('/api/todos', data)
        .then(response => response.data)
    ),

    complete: (id) => (
      axios.post(`/api/todo/${id}/complete`)
        .then(response => response.data)
    ),

    uncomplete: (id) => (
      axios.post(`/api/todo/${id}/uncomplete`)
        .then(response => response.data)
    )
  }
}
