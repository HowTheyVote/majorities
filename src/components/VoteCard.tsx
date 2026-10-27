import { type BaseVote, useVote } from "../lib/api";
import FormattedDate from "./FormattedDate";
import GroupPositions from "./GroupPositions";

import "./VoteCard.css";

type VoteCardProps = {
  vote: BaseVote;
};

function VoteCard({ vote }: VoteCardProps) {
  const { data } = useVote(vote.id);

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
      <p className="vote-card__meta">
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
      </p>
      <GroupPositions stats={data?.stats.by_group} />
    </div>
  );
}

export default VoteCard;
