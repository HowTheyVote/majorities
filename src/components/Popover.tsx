import type { HTMLAttributes } from "react";

import "./Popover.css";

type PopoverProps = Omit<HTMLAttributes<HTMLDivElement>, "className">;

function Popover({ children, ...props }: PopoverProps) {
  return (
    <div className="popover" {...props}>
      {children}
    </div>
  );
}

export default Popover;
