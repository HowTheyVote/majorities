import { AxisBottom } from "@visx/axis";
import { localPoint } from "@visx/event";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import { TooltipWithBounds, useTooltip } from "@visx/tooltip";
import type { ScaleBand, ScaleLinear } from "@visx/vendor/d3-scale";
import { type MouseEventHandler, useMemo, useRef } from "react";
import Summary from "./Summary";

import "./Histogram.css";

type Month = string;
type Values = { all: number; filtered: number };

type HistogramProps = {
  data: Record<Month, Values>;
  selectedGroups: Array<string>;
};

const width = 640;
const height = 240;

const SERIES = ["all", "filtered"] as const;

const formatMonth = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    year: "2-digit",
  });

function Histogram({ data, selectedGroups }: HistogramProps) {
  const ref = useRef<HTMLDivElement>(null);

  const {
    showTooltip,
    hideTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft,
    tooltipTop,
  } = useTooltip<{ month: Month; values: Values }>();

  // Leave some space for the x axis
  const innerHeight = height - 24;

  const sortedMonths = useMemo(
    () => Object.keys(data).sort((a, b) => a.localeCompare(b)),
    [data],
  );

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        domain: sortedMonths,
        range: [0, width],
      }),
    [sortedMonths],
  );

  const yScale = useMemo(() => {
    const maxCount = Math.max(1, ...Object.values(data).map(({ all }) => all));

    return scaleLinear<number>({
      domain: [0, maxCount],
      range: [innerHeight, 0],
      nice: true,
    });
  }, [data, innerHeight]);

  return (
    <div ref={ref} className="histogram">
      <svg
        aria-label="Number of votes by month"
        role="img"
        viewBox={`0 0 ${width} ${height}`}
      >
        <Group>
          {sortedMonths.map((month) => (
            <BarStack
              key={month}
              month={month}
              values={data[month]}
              xScale={xScale}
              yScale={yScale}
              innerHeight={innerHeight}
              onMouseMove={(event) => {
                const point = localPoint(ref.current!, event);
                showTooltip({
                  tooltipData: { month, values: data[month] },
                  tooltipLeft: point?.x,
                  tooltipTop: point?.y,
                });
              }}
              onMouseLeave={hideTooltip}
            />
          ))}

          <Axis scale={xScale} top={innerHeight} />
        </Group>
      </svg>

      {tooltipOpen && tooltipData && (
        <Tooltip
          selectedGroups={selectedGroups}
          data={tooltipData}
          left={tooltipLeft}
          top={tooltipTop}
        />
      )}
    </div>
  );
}

type BarStackProps = {
  month: Month;
  values: Values;
  xScale: ScaleBand<Month>;
  yScale: ScaleLinear<number, number>;
  innerHeight: number;
  onMouseMove: MouseEventHandler;
  onMouseLeave: MouseEventHandler;
};

function BarStack({
  month,
  values,
  xScale,
  yScale,
  innerHeight,
  onMouseMove,
  onMouseLeave,
}: BarStackProps) {
  const bandX = xScale(month) ?? 0;
  const bandwidth = xScale.bandwidth();
  const inset = (bandwidth * 0.2) / 2;

  return (
    <Group
      className="histogram__stack"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <rect
        className="histogram__dummy"
        x={bandX}
        y={0}
        width={bandwidth}
        height={innerHeight}
      />
      {SERIES.map((key) => {
        const bandY = yScale(values[key]);
        const x = bandX + inset;
        const y = bandY;
        const width = bandwidth - 2 * inset;
        const height = innerHeight - y;

        return (
          <Bar
            key={key}
            className="histogram__bar"
            data-series={key}
            x={x}
            y={y}
            width={width}
            height={height}
          />
        );
      })}
    </Group>
  );
}

type AxisProps = {
  scale: ScaleBand<string>;
  top: number;
};

function Axis({ scale, top }: AxisProps) {
  return (
    <AxisBottom
      top={top}
      scale={scale}
      tickFormat={formatMonth}
      tickLabelProps={() => ({})}
      tickClassName="histogram__tick"
      axisLineClassName="histogram__axis-line"
    />
  );
}

type TooltipProps = {
  selectedGroups: Array<string>;
  data: { month: Month; values: Values };
  left: number | undefined;
  top: number | undefined;
};

function Tooltip({ selectedGroups, data, left, top }: TooltipProps) {
  return (
    <TooltipWithBounds
      unstyled
      applyPositionStyle
      left={left}
      top={top}
      className="histogram__tooltip"
    >
      <Summary
        month={data.month}
        countAll={data.values.all}
        countFiltered={data.values.filtered}
        selectedGroups={selectedGroups}
      />
    </TooltipWithBounds>
  );
}

export default Histogram;
