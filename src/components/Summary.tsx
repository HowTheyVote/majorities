import FormattedNumber from "./FormattedNumber";

import "./Summary.css";

type SummaryProps = {
  countAll: number;
  countFiltered: number;
};

function Summary({ countAll, countFiltered }: SummaryProps) {
  return (
    <p className="summary">
      <FormattedNumber number={countFiltered} /> out of{" "}
      <FormattedNumber number={countAll} /> successful votes passed only because
      of votes from one or more of the selected groups.
    </p>
  );
}

export default Summary;
