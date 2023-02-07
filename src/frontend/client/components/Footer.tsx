import {ReactElement} from "react";
import useAuth from "@/client/Auth/Hooks/useAuth";

export default function Footer(): ReactElement {
  const auth = useAuth()

  return (
    <footer className='footer'>
      <p>&copy;2022-{new Date().getFullYear()} Rob Watson, Source Pot</p>
    </footer>
  )
}
