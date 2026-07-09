export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const fmtUSD = (n: number, frac = 0) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: frac,
    maximumFractionDigits: frac,
  });

export const fmtNum = (n: number) => n.toLocaleString("en-US");
