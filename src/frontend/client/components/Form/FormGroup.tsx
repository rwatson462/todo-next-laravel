import {ReactElement, ReactNode} from "react";

type FormGroupProps = {
  label: ReactNode
  children: ReactNode
}

export default function FormGroup({ label, children }: FormGroupProps): ReactElement {
  return (
    <div className='form-group'>
      {label && <label>{label}</label>}
      {children}
    </div>
  )
}
