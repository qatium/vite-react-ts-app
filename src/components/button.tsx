import { ButtonHTMLAttributes } from "react"

export const Button = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element => {
  return <button css={{
    padding: "10px 20px",
    background: "#0099cc",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  }} {...props}>{children}</button>
}
