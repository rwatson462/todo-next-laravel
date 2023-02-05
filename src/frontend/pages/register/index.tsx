import UserRepository from "@/client/repository/UserRepository";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

export type RegisterForm = {
  name: string,
  emailAddress: string,
  password: string,
  passwordConfirm: string
}

export default function RegisterPage(): ReactElement {
  const { register, handleSubmit } = useForm<RegisterForm>()

  const userRepository = UserRepository()

  const registerMutation = useMutation({
    mutationFn: (data: RegisterForm) => userRepository.register(data)
      .then(user => {
        // todo set up auth context
        // store login token
        // store user info
        // redirect to login page
      })
  })

  function registerUser(data: RegisterForm) {
    if (data.password !== data.passwordConfirm) {
      // todo fancy error handling
      return
    }

    registerMutation.mutate(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(data => registerUser(data))}>
        <fieldset>
          <legend>About you</legend>
          <p>
            <label>Full name</label>
            <input type='text' {...register('name', { required:true })} />
          </p>
          <p>
            <label>Email address</label>
            <input type='email' {...register('emailAddress', { required:true })} />
          </p>
        </fieldset>
        <fieldset>
          <legend>Your account</legend>
          <p>
            <label>Password</label>
            <input type='password' {...register('password', { required:true })} />
          </p>
          <p>
            <label>Confirm password</label>
            <input type='password' {...register('passwordConfirm', { required:true })} />
          </p>
        </fieldset>
        <p>
          <button>Create account</button>
        </p>
      </form>
    </div>
  )
}