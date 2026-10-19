import { AxisBottom } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";

import type { Facet } from "../lib/api";

import "./Histogram.css";

type HistogramProps = {
  months: Array<Facet>;
};

const width = 640;
const height = 240;

function Histogram({ months }: HistogramProps) {
  const innerWidth = width;
  const innerHeight = height - 24;

  const sortedMonths = [...months].sort((a, b) =>
    a.value.localeCompare(b.value),
  );
  const maxCount = Math.max(1, ...sortedMonths.map((month) => month.count));

  const xScale = scaleBand<string>({
    domain: sortedMonths.map((month) => month.value),
    range: [0, innerWidth],
    padding: 0.2,
  });

  const yScale = scaleLinear<number>({
    domain: [0, maxCount],
    range: [innerHeight, 0],
    nice: true,
  });

  return (
    <svg
      className="histogram"
      aria-label="Number of votes by month"
      role="img"
      viewBox={`0 0 ${width} ${height}`}
    >
      <Group>
        {sortedMonths.map((month) => {
          const x = xScale(month.value);
          const y = yScale(month.count);

          if (x === undefined) {
            return null;
          }

          return (
            <Bar
              key={month.value}
              x={x}
              y={y}
              width={xScale.bandwidth()}
              height={innerHeight - y}
              fill="var(--color-bg)"
            />
          );
        })}

        <AxisBottom
          top={innerHeight}
          scale={xScale}
          tickFormat={(value: string) =>
            new Date(value).toLocaleDateString("en-US", {
              month: "short",
              year: "2-digit",
            })
          }
          tickLabelProps={() => ({
            fill: "var(--color-text-muted)",
            fontSize: 11,
            textAnchor: "middle",
          })}
          tickStroke="var(--color-border)"
          stroke="#fff"
        />
      </Group>
    </svg>
  );
}

export default Histogram;
