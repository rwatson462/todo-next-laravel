import axios, {AxiosError} from "axios";
import * as process from "process";
import {NewTodoForm} from "@/client/components/NewTodoForm";
import {RemoteTodoRepository} from "@/types/todo";

export default function TodoRepository(userTokenHeader: string): RemoteTodoRepository {
  const client = axios.create({
    baseURL: process.env.API_URL,
    headers: {
      apikey: process.env.API_KEY,
      Authorization: userTokenHeader,
    }
  })

  return {
    getAll: () => (
      client.get('/todo')
        .then(response => response.data)
        .catch((err: AxiosError) => {
          if (err.response?.status === 401 || err.response?.status === 403) {
            throw new Error('Unauthenticated')
          }
          throw new Error(JSON.stringify(err.response?.data))
        })
    ),

    create: (data: NewTodoForm) => (
      client.put('/todo', data)
        .then(response => response.data)
        .catch((err: AxiosError) => {
          if (err.response?.status === 401 || err.response?.status === 403) {
            throw new Error('Unauthenticated')
          }
          throw new Error(JSON.stringify(err.response?.data))
        })
    ),

    complete: (id: number) => (
      client.post(`/todo/${id}/complete`)
        .then(response => response.data)
        .catch((err: AxiosError) => {
          if (err.response?.status === 401 || err.response?.status === 403) {
            throw new Error('Unauthenticated')
          }
          throw new Error(JSON.stringify(err.response?.data))
        })
    ),

    uncomplete: (id: number) => (
      client.post(`/todo/${id}/uncomplete`)
        .then(response => response.data)
        .catch((err: AxiosError) => {
          if (err.response?.status === 401 || err.response?.status === 403) {
            throw new Error('Unauthenticated')
          }
          throw new Error(JSON.stringify(err.response?.data))
        })
    )
  }
}
