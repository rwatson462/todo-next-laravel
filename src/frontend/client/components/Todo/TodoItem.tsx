import { ReactElement } from "react";
import TodoCheckbox from "./TodoCheckbox";

type TodoItemProps = {
  todo: Todo
}

export default function TodoItem({todo}: TodoItemProps): ReactElement {
  return (
    <li className='todo-item'>
      <span className='todo-title'>{todo.title}</span>
      <TodoCheckbox checked={!!todo.completed_at} todoId={todo.id} />
    </li>
  )
}
