import type { Vote } from "../lib/api";
import VoteCard from "./VoteCard";

import "./VotesList.css";

type VotesListProps = {
  votes: Array<Vote>;
};

function VotesList({ votes }: VotesListProps) {
  return (
    <ul className="votes-list">
      {votes.map((vote) => (
        <li key={vote.id}>
          <VoteCard vote={vote} />
        </li>
      ))}
    </ul>
  );
}

export default VotesList;
