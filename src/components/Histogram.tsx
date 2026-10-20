import { AxisBottom } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";

import "./Histogram.css";

type HistogramProps = {
  data: Record<string, { all: number; filtered: number }>;
};

const width = 640;
const height = 240;

function Histogram({ data }: HistogramProps) {
  const innerWidth = width;
  const innerHeight = height - 24;

  const sortedMonths = [...Object.keys(data)].sort((a, b) =>
    a.localeCompare(b),
  );

  const maxCount = Math.max(1, ...Object.values(data).map(({ all }) => all));

  const xScale = scaleBand<string>({
    domain: sortedMonths,
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
        {Object.entries(data).map(([month, values]) => {
          const x = xScale(month);
          const series = ["all", "filtered"] as const;

          return (
            <Group key={month} className="histogram__stack">
              {series.map((key) => {
                const y = yScale(values[key]);

                return (
                  <Bar
                    key={key}
                    className={`histogram__bar`}
                    data-series={key}
                    x={x}
                    y={y}
                    width={xScale.bandwidth()}
                    height={innerHeight - y}
                  />
                );
              })}
            </Group>
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
