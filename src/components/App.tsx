import { Suspense } from "react";
import { useVotes } from "../lib/api";

function App() {
  const { data } = useVotes();

  return (
    <div className="app">
      <header className="app__header">
        <h1>HowTheyVote.eu Majority Tracker</h1>
      </header>

      <main>
        <Suspense fallback="Loading…">
          <ul>
            {data?.results.map((vote) => (
              <li key={vote.id}>{vote.display_title}</li>
            ))}
          </ul>
        </Suspense>
      </main>

      <footer>
        <p>
          Built using the HowTheyVote.eu API and data licensed under the Open
          Database License.
        </p>
      </footer>
    </div>
  );
}

export default App;
