import type { ReactNode } from "react";

import "./Callout.css";

type CalloutProps = {
  children?: ReactNode;
};

function Callout({ children }: CalloutProps) {
  return <div className="callout">{children}</div>;
}

export default Callout;
