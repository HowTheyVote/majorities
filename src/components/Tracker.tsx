import { useDeferredValue } from "react";
import { useVotes, useVotesInfinite } from "../lib/api";
import { prepareHistogramData } from "../lib/histogram";
import { useTrackerUrlState } from "../lib/state";
import Button from "./Button";
import Callout from "./Callout";
import GroupsSelect from "./GroupsSelect";
import Histogram from "./Histogram";
import Summary from "./Summary";
import VotesList from "./VotesList";
import VotetypeSelect from "./VotetypeSelect";

import "./Tracker.css";

const EP_10_START_DATE = "2024-07-16";

function Tracker() {
  const {
    groups: selected,
    includeOnlyMain,
    setGroups: setSelected,
    setIncludeOnlyMain,
  } = useTrackerUrlState();
  const deferredSelected = useDeferredValue(selected);

  let combinations: Array<Array<string>> = [[]];

  for (const item of deferredSelected) {
    const withItem = combinations.map((combination) => [...combination, item]);
    combinations.push(...withItem);
  }

  combinations = combinations.filter((combination) => combination.length > 0);

  const { data: all } = useVotes({
    pageSize: 0,
    includeOnlyMain,
    facets: ["month"],
    filters: {
      "date[gte]": [EP_10_START_DATE],
      result: ["adopted"],
    },
  });

  const { data: filtered } = useVotes({
    pageSize: 0,
    includeOnlyMain,
    facets: ["month"],
    filters: {
      "date[gte]": [EP_10_START_DATE],
      result: ["adopted"],
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
    includeOnlyMain,
    filters: {
      "date[gte]": [EP_10_START_DATE],
      result: ["adopted"],
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

      <VotetypeSelect
        selected={includeOnlyMain}
        onChange={setIncludeOnlyMain}
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
