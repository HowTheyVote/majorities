import "./Spinner.css";

function Spinner() {
  return (
    <div
      role="status"
      className="spinner"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading…"
    />
  );
}

export default Spinner;
