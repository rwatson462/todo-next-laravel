import {useContext} from "react";
import {TodoContextType} from "@/client/Todo/Provider/TodoProvider";
import {TodoContext} from "@/client/Todo/Context/TodoContext";

export default function useTodo(): TodoContextType {
  return useContext<TodoContextType>(TodoContext)
}
