import { ReactElement, useEffect, useRef } from "react";
import {useQueryClient} from "react-query";

type TodoOptionsProps = {
  showCompleteTodos: boolean,
  setShowCompleteTodos: (value: boolean) => void
}

export default function TodoOptions({ showCompleteTodos, setShowCompleteTodos }: TodoOptionsProps): ReactElement {
  const ref = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (ref.current) {
      ref.current.checked = showCompleteTodos
    }
  }, [showCompleteTodos])

  function handleChange() {
    setShowCompleteTodos(!!ref.current?.checked)
  }

  function reloadTodos() {
    queryClient.invalidateQueries(['todo'])
  }

  return (
    <div className='todo-options'>
      <label>
        <input type='checkbox' ref={ref} onClick={handleChange} />
        Show Completed Todos
      </label>
      <p>
        <button onClick={() => reloadTodos()}>Reload todos</button>
      </p>
    </div>
  )
}
