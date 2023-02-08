import Header from "@/client/components/Header"
import NewTodoForm from "@/client/components/NewTodoForm"
import TodoList from "@/client/components/TodoList"
import TodoOptions from "@/client/components/TodoOptions"
import { useState } from "react"
import Footer from "@/client/components/Footer";
import Nav from "@/client/components/Nav/Nav";
import useAuth from "@/client/Auth/Hooks/useAuth";

export default function Home() {
  const [showCompleteTodos, setShowCompleteTodos] = useState(false)
  const auth = useAuth()

  if (!auth.isLoggedIn()) {
    return null
  }

  return (
    <>
      <Header />
      <Nav />
      <NewTodoForm />
      <TodoOptions
        showCompleteTodos={showCompleteTodos}
        setShowCompleteTodos={setShowCompleteTodos}
      />
      <TodoList showCompleteTodos={showCompleteTodos} />
      <Footer />
    </>
  )
}
