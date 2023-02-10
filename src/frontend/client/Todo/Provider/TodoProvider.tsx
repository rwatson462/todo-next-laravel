import {createContext, ReactElement, ReactNode, useState} from "react";
import {Todo, TodoGroup} from "@/types/todo";
import {useQuery, useQueryClient} from "react-query";
import TodoRepository from "@/client/repository/TodoRepository";

export type TodoContextType = {
  todos: Todo[],
  groups: TodoGroup[],
  currentGroup: number|null,
  setCurrentGroup: (id: number) => void,
  showCompleteTodos: boolean,
  setShowCompleteTodos: (value: boolean) => void,
  createTodo: (title: string) => void,
}

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  groups: [],
  currentGroup: null,
  setCurrentGroup: id => {},
  showCompleteTodos: false,
  setShowCompleteTodos: () => {},
  createTodo: () => {},
})

type TodoProviderProps = {
  children: ReactNode
}

export default function TodoProvider({ children }: TodoProviderProps): ReactElement {
  const [ showCompleteTodos, setShowCompleteTodos ] = useState<boolean>(false)
  const [ currentGroup, setCurrentGroup ] = useState<number|null>(null)
  const queryClient = useQueryClient()
  const todoRepository = TodoRepository()

  const { data: groups } = useQuery({
    queryKey: ['todo-groups'],
    queryFn: () => todoRepository.getGroups(),
    onSuccess: (data: TodoGroup[]) => setCurrentGroup(data?.length ? data[0].id : null)
  })

  const { data: todos } = useQuery({
    queryKey: ['todo'],
    queryFn: () => todoRepository.getAll()
  })

  const value: TodoContextType = {
    todos: todos ?? [],
    groups: groups ?? [],
    currentGroup,
    setCurrentGroup: id => setCurrentGroup(id),
    showCompleteTodos,
    setShowCompleteTodos,
    createTodo: (title) => {
      const todo = {
        title,
        group_id: currentGroup!
      }
      todoRepository.create(todo)
        .then(() => {
          queryClient.invalidateQueries(['todo'])
        })
    }
  }

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  )
}
