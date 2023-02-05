import { ReactElement } from "react";
import { useQuery } from "react-query";
import TodoRepository from "../repository/TodoRepository";
import TodoItem from "./Todo/TodoItem";

type TodoListProps = {
  showCompleteTodos: boolean
}

export default function TodoList({ showCompleteTodos }: TodoListProps): ReactElement {
  const todoRepository = TodoRepository()

  const { data: todos, isLoading } = useQuery({
    queryKey: ['todo'],
    queryFn: () => todoRepository.getAll()
  })

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
    </div>
  )
}