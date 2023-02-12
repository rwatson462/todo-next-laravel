import {createContext} from "react";
import {TodoContextType} from "@/client/Todo/Provider/TodoProvider";

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  groups: [],
  currentGroup: null,
  setCurrentGroup: id => id,
  showCompleteTodos: false,
  setShowCompleteTodos: () => {},
  createTodo: () =>{},
})
