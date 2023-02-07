import {ReactElement, ReactNode} from "react";

type FieldsetProps = {
  title: string,
  children: ReactNode
}

export default function Fieldset({ title, children }: FieldsetProps): ReactElement {
  return (
    <fieldset>
      {title && <legend>{title}</legend>}
      {children}
    </fieldset>
  )
}
