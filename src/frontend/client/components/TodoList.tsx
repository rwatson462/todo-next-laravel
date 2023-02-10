import { ReactElement } from "react";
import { useQuery } from "react-query";
import TodoRepository from "../repository/TodoRepository";
import TodoItem from "./Todo/TodoItem";
import useTodo from "@/client/Todo/Hook/useTodo";

export default function TodoList(): ReactElement {
  const { todos, currentGroup, showCompleteTodos } = useTodo()

  if (!todos) {
    return <p>Loading todos...</p>
  }

  return (
    <div className='todo-list'>
      <ul>
        {todos
          .filter(todo => showCompleteTodos || todo.completed_at === null)
          .filter(todo => todo.group_id === currentGroup)
          .map((todo, key) => (
            <TodoItem key={`todo-${key}`} todo={todo} />
          )
        )}
      </ul>

    </div>
  )
}
