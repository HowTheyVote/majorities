import { type FocusEvent, type MouseEvent, useId, useRef } from "react";
import type { Group, VoteStats } from "../lib/api";
import { GROUPS } from "../lib/groups";
import Popover from "./Popover";

import "./GroupPositions.css";

type GroupStats = Array<{
  group: Group;
  stats: VoteStats;
}>;

type GroupPositionsProps = {
  stats?: GroupStats;
};

function GroupPositions({ stats }: GroupPositionsProps) {
  const statsByGroup = stats
    ? Object.fromEntries(stats.map(({ group, stats }) => [group.code, stats]))
    : {};

  return (
    <ul className="group-positions">
      {GROUPS.map(({ code, short_label }) => (
        <GroupPosition
          key={code}
          stats={statsByGroup[code]}
          short_label={short_label}
        />
      ))}
    </ul>
  );
}

type GroupPositionProps = {
  short_label: string;
  stats?: VoteStats;
};

function GroupPosition({ short_label, stats }: GroupPositionProps) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  const showPopover = (
    event: MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>,
  ) => {
    ref.current?.togglePopover({ force: true, source: event.currentTarget });
  };

  const hidePopover = (
    event: MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>,
  ) => {
    ref.current?.togglePopover({ force: false, source: event.currentTarget });
  };

  return (
    <li>
      <button
        type="button"
        className="group-positions__group"
        data-position={computeGroupPosition(stats)}
        aria-describedby={id}
        onMouseEnter={showPopover}
        onMouseLeave={hidePopover}
        onFocus={showPopover}
        onBlur={hidePopover}
      >
        <span>{short_label}</span>
      </button>
      {stats && (
        <Popover ref={ref} id={id} popover="manual">
          <strong>{stats.FOR} MEPs</strong> voted for.
          <br />
          <strong>{stats.AGAINST} MEPs</strong> voted against.
          <br />
          <strong>{stats.ABSTENTION} MEPs</strong> abstained.
          <br />
          <strong>{stats.DID_NOT_VOTE} MEPs</strong> did not vote.
          <br />
        </Popover>
      )}
    </li>
  );
}

function computeGroupPosition(stats?: VoteStats) {
  if (!stats) {
    return null;
  }

  const keys = ["FOR", "AGAINST", "ABSTENTION"] as const;
  const position = keys.reduce((a, b) => (stats[a] >= stats[b] ? a : b));

  if (stats[position] === 0) {
    return null;
  }

  return position;
}

export default GroupPositions;
