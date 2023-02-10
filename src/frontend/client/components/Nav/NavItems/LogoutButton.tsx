import React, {ReactElement} from "react";
import useAuth from "@/client/Auth/Hooks/useAuth";

export default function LogoutButton(): ReactElement {
  const { logout } = useAuth()

  return (
    <li className='right'>
      <button type='button' onClick={() => logout()}>Logout</button>
    </li>
  )
}
