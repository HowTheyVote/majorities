import type { ButtonHTMLAttributes } from "react";

import "./Button.css";

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

function Button({ children, ...props }: ButtonProps) {
  return (
    <button className="button" {...props}>
      {children}
    </button>
  );
}

export default Button;
