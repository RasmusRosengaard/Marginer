export function formatGold(copper: number): string {
  const sign = copper < 0 ? '-' : ''
  const abs = Math.abs(Math.round(copper))
  const g = Math.floor(abs / 10000)
  const s = Math.floor((abs % 10000) / 100)
  const c = abs % 100
  if (g > 0) return `${sign}${g.toLocaleString()}g ${String(s).padStart(2, '0')}s ${String(c).padStart(2, '0')}c`
  if (s > 0) return `${sign}${s}s ${String(c).padStart(2, '0')}c`
  return `${sign}${c}c`
}
