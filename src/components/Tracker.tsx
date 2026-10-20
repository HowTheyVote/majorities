import { useState } from "react";
import { useVotes } from "../lib/api";
import { prepareHistogramData } from "../lib/histogram";
import GroupsSelect from "./GroupsSelect";
import Histogram from "./Histogram";
import VotesList from "./VotesList";

const EP_10_START_DATE = "2024-07-16";

function Tracker() {
  const [groups, setGroups] = useState<string | undefined>();

  const { data: all } = useVotes({
    pageSize: 0,
    facets: ["month", "groups_required_for_majority"],
    filters: {
      "date[gte]": EP_10_START_DATE,
    },
  });

  const { data: filtered } = useVotes({
    pageSize: 20,
    facets: ["month"],
    filters: {
      groups_required_for_majority: groups,
      "date[gte]": EP_10_START_DATE,
    },
  });

  return (
    <>
      {all && filtered && (
        <Histogram
          data={prepareHistogramData(all.facets.month, filtered.facets.month)}
        />
      )}

      {all && (
        <GroupsSelect
          value={groups}
          onChange={(value) => setGroups(value)}
          options={all?.facets.groups_required_for_majority}
        />
      )}

      {filtered && <VotesList votes={filtered.results} />}
    </>
  );
}

export default Tracker;
