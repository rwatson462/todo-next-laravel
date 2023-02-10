import {ReactElement} from "react";
import useAuth from "@/client/Auth/Hooks/useAuth";
import LogoutButton from "@/client/components/Nav/NavItems/LogoutButton";

export default function NavBar(): ReactElement {
  const auth = useAuth()

  return (
    <nav className='main-nav'>
      <ul>
        {auth.isLoggedIn() && (
          <LogoutButton/>
        )}
      </ul>
    </nav>
  )
}
