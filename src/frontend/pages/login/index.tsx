import React, {ReactElement, useState} from "react";
import {useForm} from "react-hook-form";
import UserRepository from "@/client/repository/UserRepository";
import useAuth from "@/client/Auth/Hooks/useAuth";
import {useRouter} from "next/router";
import Header from "@/client/components/Header";
import Form from "@/client/components/Form/Form";
import Fieldset from "@/client/components/Form/Fieldset";
import FormGroup from "@/client/components/Form/FormGroup";
import Input from "@/client/components/Form/Input";
import Link from "next/link";
import {useQueryClient} from "react-query";

export type LoginForm = {
  emailAddress: string,
  password: string
}

export default function LoginPage(): ReactElement {
  const { register, handleSubmit } = useForm<LoginForm>()
  const userRepository = UserRepository()
  const auth = useAuth()
  const { push: navigateTo } = useRouter()
  const [ error, setError ] = useState('')
  const queryClient = useQueryClient()

  function doLogin(data: LoginForm) {
    userRepository.login(data)
      .then((data) => {
        // store user and token in Auth
        auth.setUser(data.user)
        // ensure we have no data cached
        queryClient.invalidateQueries()
        // redirect to front page
        navigateTo('/')
      }).catch(err => setError(err.message))
  }

  return <>
    <Header subHeading='Log in' />
    <p>Don&apos;t have an account? <Link href='/register'>Sign up here!</Link></p>
    <Form onSubmit={handleSubmit(data => doLogin(data))}>
      <Fieldset title='Your details'>
        <FormGroup label='Email address'>
          <Input type='text' placeholder='user@example.com' {...register('emailAddress', { required: true })} />
        </FormGroup>
        <FormGroup label='Password'>
          <Input type='password' {...register('password', { required: true })} />
        </FormGroup>
        { error && <p className='error'>{error}</p> }
      </Fieldset>
      <p>
        <button>Log in</button>
      </p>
    </Form>
  </>
}
