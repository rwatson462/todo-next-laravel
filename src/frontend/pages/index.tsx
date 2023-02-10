import Header from "@/client/components/Header"
import NewTodoForm from "@/client/components/NewTodoForm"
import TodoOptions from "@/client/components/TodoOptions"
import Footer from "@/client/components/Footer";
import useAuth from "@/client/Auth/Hooks/useAuth";
import TodoGroupContainer from "@/client/components/TodoGroup/TodoGroupContainer";
import TodoProvider from "@/client/Todo/Provider/TodoProvider";
import NavBar from "@/client/components/Nav/Navbar";

export default function Home() {
  const auth = useAuth()

  if (!auth.isLoggedIn()) {
    return null
  }

  return (
    <>
      <NavBar />
      <Header />
      <TodoProvider>
        <NewTodoForm />
        <TodoOptions />
        <TodoGroupContainer />
      </TodoProvider>
      <Footer />
    </>
  )
}
