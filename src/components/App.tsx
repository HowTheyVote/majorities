import { Suspense } from "react";
import Spinner from "./Spinner";
import Tracker from "./Tracker";

import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <span className="app__logo">HowTheyVote.eu Majority Tracker</span>
      </header>

      <main className="app__main">
        <Suspense
          fallback={
            <div className="app__loading">
              <Spinner />
            </div>
          }
        >
          <Tracker />
        </Suspense>
      </main>

      <footer className="app__footer">
        <p>
          Help us improve this tool by taking a two minute{" "}
          <a href="https://tally.so/r/zENZz1" target="_blank" rel="noopener">
            feedback survey
          </a>
          .
        </p>
        <p>
          Built using the HowTheyVote.eu API and data licensed under the Open
          Database License.
        </p>
      </footer>
    </div>
  );
}

export default App;
