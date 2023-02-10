import {ReactElement, ReactNode} from "react";
import {TodoGroup} from "@/types/todo";
import useTodo from "@/client/Todo/Hook/useTodo";

export default function TabGroupHeader(): ReactElement {
  const { groups, currentGroup, setCurrentGroup } = useTodo()
  return (
    <ul className='todo-group-tabs'>
      {groups.map((group, key) => (
        <li key={`tab-group-${key}`} className='todo-group-item'>
          <button
            className={`todo-group-button ${group.id === currentGroup ? 'selected' : ''}`}
            onClick={() => setCurrentGroup(group.id)}
          >
            {group.name}
          </button>
        </li>
      ))}
    </ul>
  )
}
