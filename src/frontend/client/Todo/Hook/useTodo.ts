import {useContext} from "react";
import {TodoContext, TodoContextType} from "@/client/Todo/Provider/TodoProvider";

export default function useTodo(): TodoContextType {
  return useContext<TodoContextType>(TodoContext)
}
