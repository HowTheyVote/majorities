import { Suspense, useState } from "react";
import { useVotes } from "../lib/api";
import Histogram from "./Histogram";
import VotesList from "./VotesList";

import "./App.css";

function App() {
  const [groups, setGroups] = useState<string | undefined>();

  const { data: all } = useVotes({
    pageSize: 0,
    facets: ["month", "groups_required_for_majority"],
  });

  const { data: filtered } = useVotes({
    pageSize: 20,
    facets: ["month"],
    filters: {
      groups_required_for_majority: groups,
    },
  });

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__logo">HowTheyVote.eu Majority Tracker</h1>
      </header>

      <main className="app__main">
        <Suspense fallback="Loading…">
          {filtered && <Histogram months={filtered.facets.month} />}

          {all?.facets.groups_required_for_majority && (
            <select
              value={groups}
              onChange={(event) => setGroups(event.currentTarget.value)}
            >
              <option value="">Select…</option>
              {all.facets.groups_required_for_majority.map(
                ({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ),
              )}
            </select>
          )}

          {filtered && <VotesList votes={filtered.results} />}
        </Suspense>
      </main>

      <footer className="app__footer">
        <p>
          Built using the HowTheyVote.eu API and data licensed under the Open
          Database License.
        </p>
      </footer>
    </div>
  );
}

export default App;
