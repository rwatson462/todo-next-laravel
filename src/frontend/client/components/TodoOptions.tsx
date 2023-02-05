import { ReactElement, useEffect, useRef } from "react";

type TodoOptionsProps = {
  showCompleteTodos: boolean,
  setShowCompleteTodos: (value: boolean) => void
}

export default function TodoOptions({ showCompleteTodos, setShowCompleteTodos }: TodoOptionsProps): ReactElement {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.checked = showCompleteTodos
    }
  }, [])

  function handleChange() {
    setShowCompleteTodos(!!ref.current?.checked)
  }

  return (
    <div className='todo-options'>
      <label>
        <input type='checkbox' ref={ref} onClick={handleChange} />
        Show Completed Todos as well
      </label>
    </div>
  )
}
