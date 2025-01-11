export const numberFormatter = new Intl.NumberFormat(undefined, {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 2,
});

export const rechartNumberFormatter = (
  value: number | bigint | Intl.StringNumericLiteral
) => numberFormatter.format(value);

export function chartDataConversion(input: {
  [k: string]: { [k: string]: number };
}) {
  return Object.entries(input).map(([year, values]) => ({
    year,
    ...values,
  }));
}
