import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import useTodo from "@/client/Todo/Hook/useTodo";

export type NewTodoForm = {
  title: string,
  group_id: number,
}

export default function NewTodoForm(): ReactElement {
  const {register, handleSubmit, setValue} = useForm<NewTodoForm>()
  const { createTodo } = useTodo()

  const onFormSubmit = handleSubmit((data: NewTodoForm) => {
    createTodo(data.title)
    setValue('title', '')
  })

  return (
    <form onSubmit={onFormSubmit} className='new-todo-form'>
      <fieldset>
        <legend>Create new todo</legend>
        <input
          type='text'
          placeholder='Description of todo'
          {...register('title', {required:true})}
        />
        <button>Go</button>
      </fieldset>
    </form>
  )
}
