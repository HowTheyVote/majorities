import { AxisBottom } from "@visx/axis";
import { localPoint } from "@visx/event";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import Summary from "./Summary";

import "./Histogram.css";

type Month = string;
type Values = { all: number; filtered: number };

type HistogramProps = {
  data: Record<Month, Values>;
};

const width = 640;
const height = 240;

const SERIES = ["all", "filtered"] as const;

const formatMonth = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    year: "2-digit",
  });

function Histogram({ data }: HistogramProps) {
  const {
    showTooltip,
    hideTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft,
    tooltipTop,
  } = useTooltip<{ month: Month; values: Values }>();
  const { containerRef, TooltipInPortal } = useTooltipInPortal();

  const innerHeight = height - 24;

  const sortedMonths = Object.keys(data).sort((a, b) => a.localeCompare(b));

  const maxCount = Math.max(1, ...Object.values(data).map(({ all }) => all));

  const xScale = scaleBand<string>({
    domain: sortedMonths,
    range: [0, width],
    padding: 0.2,
  });

  const yScale = scaleLinear<number>({
    domain: [0, maxCount],
    range: [innerHeight, 0],
    nice: true,
  });

  return (
    <div className="histogram">
      <svg
        ref={containerRef}
        aria-label="Number of votes by month"
        role="img"
        viewBox={`0 0 ${width} ${height}`}
      >
        <Group>
          {sortedMonths.map((month) => {
            const values = data[month];
            const x = xScale(month);

            return (
              <Group
                key={month}
                className="histogram__stack"
                onMouseMove={(event) => {
                  const point = localPoint(event);
                  showTooltip({
                    tooltipData: { month, values },
                    tooltipLeft: point?.x,
                    tooltipTop: point?.y,
                  });
                }}
                onMouseLeave={hideTooltip}
              >
                {SERIES.map((key) => {
                  const y = yScale(values[key]);

                  return (
                    <Bar
                      key={key}
                      className="histogram__bar"
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
            tickFormat={formatMonth}
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

      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          unstyled
          applyPositionStyle
          left={tooltipLeft}
          top={tooltipTop}
          className="histogram__tooltip"
        >
          <Summary
            month={tooltipData.month}
            countAll={tooltipData.values.all}
            countFiltered={tooltipData.values.filtered}
          />
        </TooltipInPortal>
      )}
    </div>
  );
}

export default Histogram;
