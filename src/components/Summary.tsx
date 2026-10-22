import FormattedNumber from "./FormattedNumber";

import "./Summary.css";

type SummaryProps = {
  month?: string;
  countAll: number;
  countFiltered: number;
};

function Summary({ month, countAll, countFiltered }: SummaryProps) {
  const formattedMonth = month
    ? new Date(month).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : undefined;

  return (
    <p className="summary">
      {month && <>In {formattedMonth}, </>}
      <span className="summary__filtered">
        <FormattedNumber number={countFiltered} />
      </span>{" "}
      out of{" "}
      <span className="summary__all">
        <FormattedNumber number={countAll} />
      </span>{" "}
      successful votes passed only because of votes from one or more of the
      selected groups.
    </p>
  );
}

export default Summary;
