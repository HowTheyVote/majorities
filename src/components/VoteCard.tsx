import { BaseVote } from "../lib/api"
import FormattedDate from "./FormattedDate";

import "./VoteCard.css";

type VoteCardProps = {
  vote: BaseVote;
};

function VoteCard({ vote }: VoteCardProps) {
  return (
    <div className="vote-card">
      <a
        className="vote-card__title"
        href={`https://howtheyvote.eu/votes/${vote.id}`}
        target="_blank"
        rel="noopener"
      >
        {vote.display_title}
      </a>
      <br />
      <span className="vote-card__meta">
        <FormattedDate timestamp={vote.timestamp} />
        {vote.reference && (
          <>
            {" · "}
            {vote.reference}
          </>
        )}
        {vote.description && (
          <>
            {" · "}
            {vote.description}
          </>
        )}
      </span>
    </div>
  );
}

export default VoteCard;
