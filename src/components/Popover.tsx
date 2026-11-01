import type { ComponentPropsWithRef } from "react";

import "./Popover.css";

type PopoverProps = Omit<ComponentPropsWithRef<"div">, "className">;

function Popover({ children, ref, ...props }: PopoverProps) {
  return (
    <div ref={ref} className="popover" {...props}>
      <div className="popover__content">{children}</div>
    </div>
  );
}

export default Popover;
