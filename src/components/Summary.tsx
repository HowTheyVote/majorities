import FormattedNumber from "./FormattedNumber";

import "./Summary.css";

type SummaryProps = {
  month?: string;
  countAll: number;
  countFiltered: number;
  selectedGroups: Array<string>;
};

function Summary({
  month,
  countAll,
  countFiltered,
  selectedGroups,
}: SummaryProps) {
  const formattedMonth = month
    ? new Date(month).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : undefined;

  if (selectedGroups.length === 0) {
    return (
      <p className="summary">
        {month && <>In {formattedMonth}, </>}
        <span className="summary__filtered">
          <FormattedNumber number={countAll} />
        </span>{" "}
        votes passed.
      </p>
    );
  }

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
      successful votes passed only because of votes from{" "}
      {selectedGroups.length > 1
        ? "one or more of the selected groups"
        : "the selected group"}
      .
    </p>
  );
}

export default Summary;
