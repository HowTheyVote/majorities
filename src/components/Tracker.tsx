import { useDeferredValue, useState } from "react";
import { useVotes } from "../lib/api";
import { prepareHistogramData } from "../lib/histogram";
import GroupsSelect from "./GroupsSelect";
import Histogram from "./Histogram";
import VotesList from "./VotesList";

import "./Tracker.css";
import Summary from "./Summary";

const EP_10_START_DATE = "2024-07-16";

function Tracker() {
  const [selected, setSelected] = useState<Array<string>>([]);
  const deferredSelected = useDeferredValue(selected);

  let combinations: Array<Array<string>> = [[]];

  for (const item of deferredSelected) {
    const withItem = combinations.map((combination) => [...combination, item]);
    combinations.push(...withItem);
  }

  combinations = combinations.filter((combination) => combination.length > 0);

  const { data: all } = useVotes({
    pageSize: 0,
    includeOnlyMain: false,
    facets: ["month"],
    filters: {
      "date[gte]": [EP_10_START_DATE],
      result: ["adopted"],
    },
  });

  const { data: filtered } = useVotes({
    pageSize: 20,
    includeOnlyMain: false,
    facets: ["month"],
    filters: {
      "date[gte]": [EP_10_START_DATE],
      result: ["adopted"],
      groups_required_for_majority: combinations.map((groups) =>
        groups.join("+"),
      ),
    },
  });

  if (!all || !filtered) {
    return null;
  }

  return (
    <div className="tracker">
      <Histogram
        data={prepareHistogramData(all.facets.month, filtered.facets.month)}
      />

      <GroupsSelect
        selected={selected}
        onChange={(value) => setSelected(value)}
      />

      {deferredSelected.length > 0 && (
        <Summary countAll={all.total} countFiltered={filtered.total} />
      )}

      {<VotesList votes={filtered.results} />}
    </div>
  );
}

export default Tracker;
