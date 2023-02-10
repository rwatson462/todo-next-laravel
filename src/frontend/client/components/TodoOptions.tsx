import { ReactElement, useEffect, useRef } from "react";
import useTodo from "@/client/Todo/Hook/useTodo";

export default function TodoOptions(): ReactElement {
  const { showCompleteTodos, setShowCompleteTodos } = useTodo()
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.checked = showCompleteTodos
    }
  }, [showCompleteTodos])

  function handleChange() {
    setShowCompleteTodos(!!ref.current?.checked)
  }

  return (
    <div className='todo-options'>
      <label>
        <input type='checkbox' ref={ref} onClick={handleChange} />
        Show Completed Todos
      </label>
    </div>
  )
}
