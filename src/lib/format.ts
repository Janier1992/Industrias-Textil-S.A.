export function parseMonto(value: string): number {
  const parsed = parseInt(String(value).replace(/[^0-9-]/g, ""), 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function formatMonto(value: number): string {
  const sign = value < 0 ? "-" : "";
  return `${sign}$${Math.abs(Math.round(value)).toLocaleString("es-CO")}`;
}

export function countBy<T>(items: T[], keyFn: (item: T) => string): Record<string, number> {
  const map: Record<string, number> = {};
  for (const item of items) {
    const key = keyFn(item);
    map[key] = (map[key] ?? 0) + 1;
  }
  return map;
}

export interface DonutLegendItem {
  label: string;
  count: number;
  color: string;
}

export interface DonutResult {
  gradient: string;
  legend: DonutLegendItem[];
}

export function buildDonut(
  counts: Record<string, number>,
  colorMap: Record<string, string>,
  fallbackColor = "oklch(0.8 0.01 85)",
): DonutResult {
  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
  let acc = 0;
  const stops: string[] = [];
  const legend: DonutLegendItem[] = [];

  for (const [label, count] of Object.entries(counts)) {
    const pct = (count / total) * 100;
    const start = acc;
    const end = acc + pct;
    const color = colorMap[label] ?? fallbackColor;
    stops.push(`${color} ${start}% ${end}%`);
    legend.push({ label, count, color });
    acc = end;
  }

  return { gradient: `conic-gradient(${stops.join(", ")})`, legend };
}

let idCounter = 0;
export function nextId(prefix: string): string {
  idCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${idCounter}`;
}
