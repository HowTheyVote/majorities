import type { Facet } from "./api";

export function prepareHistogramData(
  all: Array<Facet>,
  filtered: Array<Facet>,
) {
  const allByMonth: Record<string, number> = Object.fromEntries(
    all.map(({ value, count }) => [value, count]),
  );

  const filteredByMonth: Record<string, number> = Object.fromEntries(
    filtered.map(({ value, count }) => [value, count]),
  );

  const existingMonths = [
    ...new Set([...Object.keys(allByMonth), ...Object.keys(filteredByMonth)]),
  ].sort();

  if (existingMonths.length === 0) {
    return {};
  }

  const [startYear, startMonth] = existingMonths[0].split("-").map(Number);
  const [endYear, endMonth] = existingMonths[existingMonths.length - 1]
    .split("-")
    .map(Number);

  const months = new Set<string>();

  for (let year = startYear; year <= endYear; year++) {
    const firstMonth = year === startYear ? startMonth : 1;
    const lastMonth = year === endYear ? endMonth : 12;

    for (let month = firstMonth; month <= lastMonth; month++) {
      months.add(`${year}-${String(month).padStart(2, "0")}`);
    }
  }

  return Object.fromEntries(
    [...months].map((month) => [
      month,
      {
        all: allByMonth[month] ?? 0,
        filtered: filteredByMonth[month] ?? 0,
      },
    ]),
  );
}
