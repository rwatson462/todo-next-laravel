import {forwardRef, LegacyRef, ReactElement} from "react";

type InputProps = {
  type: string,
  placeholder?: string,
  [name: string]: any
}

export function Input({type, ...props}: InputProps, ref: LegacyRef<HTMLInputElement> | undefined): ReactElement {
  return (
    <input type={type} {...props} ref={ref} />
  )
}

export default forwardRef(Input)
