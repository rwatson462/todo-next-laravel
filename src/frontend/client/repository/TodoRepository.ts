import {NewTodoForm} from "@/client/components/NewTodoForm";
import {Todo, TodoGroup} from "@/types/todo";
import useClient from "../Http/useClient";

type TodoRepository = {
  getAll: () => Promise<Todo[]>,
  getGroups: () => Promise<TodoGroup[]>,
  create: (data: NewTodoForm) => Promise<Todo>,
  complete: (id: number) => Promise<Todo>,
  uncomplete: (id: number) => Promise<Todo>,
}

export default function TodoRepository(): TodoRepository {
  const client = useClient()

  return {
    getAll: () => (
      client.get<Todo[]>('/todo/all')
    ),

    getGroups: () => (
      client.get<TodoGroup[]>('/todo/groups')
    ),

    create: (data) => (
      client.put<Todo>('/todo/create', data)
    ),

    complete: (id) => (
      client.post<Todo>(`/todo/${id}/complete`)
    ),

    uncomplete: (id) => (
      client.post<Todo>(`/todo/${id}/uncomplete`)
    )
  }
}
