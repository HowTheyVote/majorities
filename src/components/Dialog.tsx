import type { ReactNode } from "react";
import { useEffect, useId, useRef } from "react";

import "./Dialog.css";

type DialogProps = {
  children: ReactNode;
  title: ReactNode;
  open?: boolean;
  onOpenChange: (isOpen: boolean) => void;
  className?: string;
};

function Dialog({ title, children, open = false, onOpenChange }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (ref.current && !ref.current.open && open) {
      ref.current.showModal();
    }

    if (ref.current && ref.current.open && !open) {
      ref.current.close();
    }
  }, [open, onOpenChange]);

  // Don’t render dialog server-side, only client-side
  if (typeof window === "undefined") {
    return null;
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className="dialog"
      closedby="any"
      onClose={() => onOpenChange(false)}
    >
      <header className="dialog__header">
        <h2 id={titleId} className="dialog__title">
          {title}
        </h2>
        <button
          type="submit"
          className="dialog__close"
          aria-label="Close"
          onClick={() => onOpenChange(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>
      </header>
      <div className="dialog__body">{children}</div>
    </dialog>
  );
}

export default Dialog;
