import TodoRepository from "@/client/repository/TodoRepository";
import { ReactElement } from "react";
import { useMutation, useQueryClient } from "react-query";

type TodoCheckboxProps = {
  todoId: number,
  checked: boolean
}

export default function TodoCheckbox({ todoId, checked }: TodoCheckboxProps): ReactElement {
  const todoRepository = TodoRepository()
  
  const queryClient = useQueryClient()
  
  const completeTodoMutation = useMutation({
    mutationFn: () => todoRepository.complete(todoId)
      .then(() => queryClient.invalidateQueries(['todo']))
  })

  const uncompleteTodoMutation = useMutation({
    mutationFn: () => todoRepository.uncomplete(todoId)
      .then(() => queryClient.invalidateQueries(['todo']))
  })

  if (checked) {
    return (
      <span
        className='todo-checkbox'
        onClick={() => uncompleteTodoMutation.mutate()}
      >
        [X]
      </span>
    )
  } else {
    return (
      <span
        className='todo-checkbox'
        onClick={() => completeTodoMutation.mutate()}
      >
        [ ]
      </span>
    )
  }
}
