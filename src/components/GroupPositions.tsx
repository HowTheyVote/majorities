import type { Group, VoteStats } from "../lib/api";

import "./GroupPositions.css";

type GroupStats = Array<{
  group: Group;
  stats: VoteStats;
}>;

type GroupPositionsProps = {
  stats?: GroupStats;
};

function GroupPositions({ stats }: GroupPositionsProps) {
  if (!stats) {
    return null;
  }

  const positions = computeGroupPositions(stats);

  return (
    <ul className="group-positions">
      {stats.map(({ group }) => (
        <li
          key={group.code}
          className="group-positions__group"
          data-position={positions[group.code]}
        >
          {group.short_label}
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
