import React, {ReactElement} from "react";
import useAuth from "@/client/Auth/Hooks/useAuth";

export default function Nav(): ReactElement {
  const auth = useAuth()

  function doLogout(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    auth.logout()
  }

  return (
    <nav>
      <ul>
        {auth.isLoggedIn() && (
          <li className='right'>
            <button onClick={e => doLogout(e)}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  )
}
