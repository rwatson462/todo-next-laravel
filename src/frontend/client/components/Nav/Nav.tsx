import {ReactElement, ReactNode} from "react";
import useAuth from "@/client/Auth/Hooks/useAuth";

export default function Nav(): ReactElement {
  const auth = useAuth()

  function doLogout() {
    auth.logout()
  }

  return (
    <nav>
      <ul>
        {auth.isLoggedIn() && (
          <li>
            <a href='' onClick={() => doLogout()}>Logout</a>
          </li>
        )}
      </ul>
    </nav>
  )
}
