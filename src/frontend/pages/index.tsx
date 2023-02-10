import Header from "@/client/components/Header"
import NewTodoForm from "@/client/components/NewTodoForm"
import TodoOptions from "@/client/components/TodoOptions"
import Footer from "@/client/components/Footer";
import Nav from "@/client/components/Nav/Nav";
import useAuth from "@/client/Auth/Hooks/useAuth";
import TodoGroupContainer from "@/client/components/TodoGroup/TodoGroupContainer";
import TodoProvider from "@/client/Todo/Provider/TodoProvider";

export default function Home() {
  const auth = useAuth()

  if (!auth.isLoggedIn()) {
    return null
  }

  return (
    <>
      <Header />
      <Nav />
      <TodoProvider>
        <NewTodoForm />
        <TodoOptions />
        <TodoGroupContainer />
      </TodoProvider>
      <Footer />
    </>
  )
}
