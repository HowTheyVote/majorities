import { useDeferredValue } from "react";
import { useVotes, useVotesInfinite } from "../lib/api";
import { prepareHistogramData } from "../lib/histogram";
import { useUrlState } from "../lib/state";
import Button from "./Button";
import Callout from "./Callout";
import GroupsSelect from "./GroupsSelect";
import Histogram from "./Histogram";
import Summary from "./Summary";
import VotesList from "./VotesList";

import "./Tracker.css";

const DEFAULT_FILTERS: Record<string, Array<string>> = {
  "date[gte]": ["2024-07-16"], // Start of 10th term
  result: ["adopted"],
  majority_type: [
    "majority_of_votes_cast",
    "majority_of_component_members",
    "two_thirds_of_votes_cast_and_majority_of_component_members",
  ],
};

function Tracker() {
  const [selected, setSelected] = useUrlState("groups", []);
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
    filters: DEFAULT_FILTERS,
  });

  const { data: filtered } = useVotes({
    pageSize: 0,
    includeOnlyMain: false,
    facets: ["month"],
    filters: {
      ...DEFAULT_FILTERS,
      groups_required_for_majority: combinations.map((groups) =>
        groups.join("+"),
      ),
    },
  });

  const {
    data: pages,
    size,
    setSize,
    isValidating,
  } = useVotesInfinite({
    includeOnlyMain: false,
    filters: {
      ...DEFAULT_FILTERS,
      groups_required_for_majority: combinations.map((groups) =>
        groups.join("+"),
      ),
    },
  });

  if (!all || !filtered || !pages) {
    return null;
  }

  return (
    <div className="tracker">
      <Histogram
        data={prepareHistogramData(all.facets.month, filtered.facets.month)}
        selectedGroups={selected}
      />

      <GroupsSelect
        selected={selected}
        onChange={(value) => setSelected(value)}
      />

      {deferredSelected.length > 0 && (
        <Callout>
          <Summary
            countAll={all.total}
            countFiltered={filtered.total}
            selectedGroups={selected}
          />
        </Callout>
      )}

      <VotesList votes={pages.flatMap((page) => page.results)} />

      {pages.at(-1)?.has_next && (
        <div className="tracker__more">
          <Button onClick={() => setSize(size + 1)} disabled={isValidating}>
            {isValidating ? "Loading…" : "Load more votes"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Tracker;
