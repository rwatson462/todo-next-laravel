import { ReactElement } from "react";
import {useQuery, useQueryClient} from "react-query";
import TodoRepository from "../repository/TodoRepository";
import TodoItem from "./Todo/TodoItem";

type TodoListProps = {
  showCompleteTodos: boolean
}

export default function TodoList({ showCompleteTodos }: TodoListProps): ReactElement {
  const todoRepository = TodoRepository()
  const queryClient = useQueryClient()

  const { data: todos, isLoading, isError } = useQuery({
    queryKey: ['todo'],
    queryFn: () => todoRepository.getAll()
  })

  function reloadTodos() {
    queryClient.invalidateQueries(['todo'])
  }

  if (isError) {
    return <p className='error'>Error loading todos, try refreshing the page</p>
  }

  if (isLoading || !todos) {
    return <p>Loading todos...</p>
  }

  return (
    <div className='todo-list'>
      <ul>
        {todos
          .filter(todo => showCompleteTodos || todo.completed_at === null)
          .map((todo, key) => (
            <TodoItem key={key} todo={todo} />
          )
        )}
      </ul>
      <p>
        <button onClick={() => reloadTodos()}>Reload todos</button>
      </p>
    </div>
  )
}
