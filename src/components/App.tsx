import { Suspense } from "react";
import Spinner from "./Spinner";
import Tracker from "./Tracker";

import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__logo">HowTheyVote.eu Majority Tracker</h1>
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
          Built using the HowTheyVote.eu API and data licensed under the Open
          Database License.
        </p>
      </footer>
    </div>
  );
}

export default App;
