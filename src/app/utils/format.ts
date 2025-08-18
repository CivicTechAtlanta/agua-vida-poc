export function formatSig2(val: number | string | null | undefined): string {
  if (val === null || val === undefined || val === "") return "-";
  const num = Number(val);
  if (!isFinite(num)) return "-";
  if (num === 0) return "0";
  // Use toPrecision for significant digits; convert back to number to avoid scientific notation where possible
  return Number(num.toPrecision(2)).toString();
}

// Return a number rounded to 2 significant figures (or null), suitable for storing in state
export function toSig2Number(val: number | string | null | undefined): number | null {
  if (val === null || val === undefined || val === "") return null;
  const num = Number(val);
  if (!isFinite(num)) return null;
  if (num === 0) return 0;
  return Number(num.toPrecision(2));
}
