import {ReactElement, ReactNode, useState} from "react";
import {Todo, TodoGroup} from "@/types/todo";
import {useQuery, useQueryClient} from "react-query";
import TodoRepository from "@/client/repository/TodoRepository";
import { TodoContext } from "../Context/TodoContext";

export type TodoContextType = {
  todos: Todo[],
  groups: TodoGroup[],
  currentGroup: number|null,
  setCurrentGroup: (id: number) => void,
  showCompleteTodos: boolean,
  setShowCompleteTodos: (value: boolean) => void,
  createTodo: (title: string) => void,
}

type TodoProviderProps = {
  children: ReactNode
}


function TodoErrorHandler(err: Error) {
  const message = err.message
  if (message === '401') {
    // User has logged out due to inactivity, no further action to take
    return
  }
  console.log(message)
}

export default function TodoProvider({ children }: TodoProviderProps): ReactElement {
  const [ showCompleteTodos, setShowCompleteTodos ] = useState<boolean>(false)
  const [ currentGroup, setCurrentGroup ] = useState<number|null>(null)
  const queryClient = useQueryClient()
  const todoRepository = TodoRepository()

  const { data: groups } = useQuery({
    queryKey: ['todo-groups'],
    queryFn: () => todoRepository.getGroups().catch(TodoErrorHandler),
    onSuccess: (data: TodoGroup[]) => setCurrentGroup(data?.length ? data[0].id : null)
  })

  const { data: todos } = useQuery({
    queryKey: ['todo'],
    queryFn: () => todoRepository.getAll().catch(TodoErrorHandler)
  })

  function createTodo(title: string) {
    const todo = {
      title,
      group_id: currentGroup!
    }

    todoRepository.create(todo)
      .then(() => queryClient.invalidateQueries(['todo']),)
      .catch(TodoErrorHandler)
  }

  const value: TodoContextType = {
    todos: todos ?? [],
    groups: groups ?? [],
    currentGroup,
    setCurrentGroup: id => setCurrentGroup(id),
    showCompleteTodos,
    setShowCompleteTodos,
    createTodo,
  }

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  )
}
