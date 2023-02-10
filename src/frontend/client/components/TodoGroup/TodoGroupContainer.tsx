import { ReactElement } from "react";
import TodoList from "@/client/components/TodoList";
import TabGroupHeader from './TabGroupHeader'

export default function TodoGroupContainer(): ReactElement {
  return <>
    <TabGroupHeader />
    <TodoList />
  </>
}
