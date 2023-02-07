import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import TodoRepository from "../repository/TodoRepository";

export type NewTodoForm = {
  title: string,
  tags: { name: string }[]
}

export default function NewTodoForm(): ReactElement {
  const {register, handleSubmit, setValue} = useForm<NewTodoForm>()
  const todoRepository = TodoRepository()
  const queryClient = useQueryClient()

  function createNewTodo(data: NewTodoForm) {
    data.tags = []
    todoRepository.create(data)
      .then(() => {
        setValue('title', '')
        queryClient.invalidateQueries(['todo'])
      })
  }

  return (
    <form onSubmit={handleSubmit(createNewTodo)} className='new-todo-form'>
      <fieldset>
        <legend>Create new todo</legend>
        {/*<label>Title</label>*/}
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
