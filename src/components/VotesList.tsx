import type { Vote } from "../lib/api";
import FormattedDate from "./FormattedDate";

import "./VotesList.css";

type VotesListProps = {
  votes: Array<Vote>;
};

function VotesList({ votes }: VotesListProps) {
  return (
    <ul className="votes-list">
      {votes.map((vote) => (
        <li key={vote.id}>
          <a
            className="votes-list__title"
            href={`https://howtheyvote.eu/votes/${vote.id}`}
            target="_blank"
            rel="noopener"
          >
            {vote.display_title}
          </a>
          <br />
          <span className="votes-list__meta">
            <FormattedDate timestamp={vote.timestamp} />
            {vote.description && (
              <>
                {" · "}
                {vote.description}
              </>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default VotesList;
