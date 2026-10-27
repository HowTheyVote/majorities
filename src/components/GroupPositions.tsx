import type { Group, VoteStats } from "../lib/api";
import { GROUPS } from "../lib/groups";

import "./GroupPositions.css";

type GroupStats = Array<{
  group: Group;
  stats: VoteStats;
}>;

type GroupPositionsProps = {
  stats?: GroupStats;
};

function GroupPositions({ stats }: GroupPositionsProps) {
  const positions = stats ? computeGroupPositions(stats) : {};

  return (
    <ul className="group-positions">
      {GROUPS.map(({ code, short_label }) => (
        <li
          key={code}
          className="group-positions__group"
          data-position={positions[code]}
        >
          {short_label}
        </li>
      ))}
    </ul>
  );
}

function computeGroupPositions(groupStats: GroupStats) {
  const positions: Record<string, string> = {};
  const keys = ["FOR", "AGAINST", "ABSTENTION"] as const;

  for (const { group, stats } of groupStats) {
    const position = keys.reduce((a, b) => (stats[a] >= stats[b] ? a : b));

    if (stats[position] === 0) {
      continue;
    }

    positions[group.code] = position;
  }

  return positions;
}

export default GroupPositions;
