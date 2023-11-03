type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children = "my button", ...props }: ButtonProps): JSX.Element => {
  return <button {...props} style={buttonStyles}>{children}</button>
}

const buttonStyles: React.CSSProperties = {
  padding: "10px 20px",
  background: "#0099cc",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer"
}
