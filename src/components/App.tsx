import { Suspense } from "react";
import { useVotes } from "../lib/api";
import Histogram from "./Histogram";
import VotesList from "./VotesList";

import "./App.css";

function App() {
  const { data } = useVotes();

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__logo">HowTheyVote.eu Majority Tracker</h1>
      </header>

      <main className="app__main">
        <Suspense fallback="Loading…">
          {data && (
            <>
              <Histogram months={data.facets.month} />
              <VotesList votes={data.results} />
            </>
          )}
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
