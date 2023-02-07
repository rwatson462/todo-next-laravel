import { ReactElement } from "react";

type HeaderProps = {
  subHeading?: string,
}

export default function Header({ subHeading }: HeaderProps): ReactElement {
  return (
    <header>
      <h1>Todo</h1>
      {subHeading && <h3>{subHeading}</h3>}
    </header>
  )
}
