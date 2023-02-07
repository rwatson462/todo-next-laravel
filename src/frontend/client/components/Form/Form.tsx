import {ReactElement, ReactNode} from "react";

type FormProps = {
  children: ReactNode,
  [name: string]: any
}

export default function Form({ children, ...props }: FormProps): ReactElement {
  return (
    <form {...props}>
      {children}
    </form>
  )
}
