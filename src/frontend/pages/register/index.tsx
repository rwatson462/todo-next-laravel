import UserRepository from "@/client/repository/UserRepository";
import React, {ReactElement, useState} from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import useAuth from "@/client/Auth/Hooks/useAuth";
import Header from "@/client/components/Header";
import Form from "@/client/components/Form/Form";
import Fieldset from "@/client/components/Form/Fieldset";
import FormGroup from "@/client/components/Form/FormGroup";
import Input from "@/client/components/Form/Input";
import Link from "next/link";

export type RegisterForm = {
  name: string,
  emailAddress: string,
  password: string,
  passwordConfirm: string
}

export default function RegisterPage(): ReactElement {
  const { register, handleSubmit } = useForm<RegisterForm>()
  const [ error, setError ] = useState<string>('')
  const userRepository = UserRepository()
  const auth = useAuth()

  const registerMutation = useMutation({
    mutationFn: (data: RegisterForm) => userRepository.register(data)
      .then(data => {
        auth.setUser(data.user)
        auth.setToken(data.token)
        // redirect to login page
      }).catch(err => {
        setError(err.response.data.message)
      })
  })

  function registerUser(data: RegisterForm) {
    if (data.password !== data.passwordConfirm) {
      setError('You must enter the same password in both boxes')
      return
    }

    setError('')
    registerMutation.mutate(data)
  }

  return <>
    <Header subHeading='Sign up' />
    <p>Already have an account? <Link href='/login'>Log in here!</Link></p>
    <Form onSubmit={handleSubmit(data => registerUser(data))}>
      <Fieldset title='About you'>
        <FormGroup label='Full name'>
          <Input type='text' {...register('name', { required:true })} />
        </FormGroup>
        <FormGroup label='Email address'>
          <Input type='email' {...register('emailAddress', { required:true })} />
        </FormGroup>
      </Fieldset>
      <Fieldset title='Your account'>
        <FormGroup label='Password'>
          <Input type='password' {...register('password', { required:true })} />
        </FormGroup>
        <FormGroup label='Confirm password'>
          <Input type='password' {...register('passwordConfirm', { required:true })} />
        </FormGroup>
      </Fieldset>
      {error && <p className='error'>{error}</p>}
      <p>
        <button>Create account</button>
      </p>
    </Form>
  </>
}
