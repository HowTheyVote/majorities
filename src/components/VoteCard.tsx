import { useIntersectionObserver } from "usehooks-ts";
import { type BaseVote, useVote } from "../lib/api";
import FormattedDate from "./FormattedDate";
import GroupPositions from "./GroupPositions";

import "./VoteCard.css";

type VoteCardProps = {
  vote: BaseVote;
};

function VoteCard({ vote }: VoteCardProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    freezeOnceVisible: true,
  });

  const { data } = useVote({
    id: vote.id,
    enabled: isIntersecting,
  });

  return (
    <div ref={ref} className="vote-card">
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
