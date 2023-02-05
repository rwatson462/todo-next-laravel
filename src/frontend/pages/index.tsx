import Header from "@/client/components/Header"
import NewTodoForm from "@/client/components/NewTodoForm"
import TodoList from "@/client/components/TodoList"
import TodoOptions from "@/client/components/TodoOptions"
import { useState } from "react"

export default function Home() {
  const [showCompleteTodos, setShowCompleteTodos] = useState(false)

  return (
    <>
      <Header />
      <NewTodoForm />
      <TodoOptions
        showCompleteTodos={showCompleteTodos}
        setShowCompleteTodos={setShowCompleteTodos}
      />
      <TodoList showCompleteTodos={showCompleteTodos} />
    </>
  )
}
