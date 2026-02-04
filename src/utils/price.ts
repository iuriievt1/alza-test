import { decodeHtml } from './html'


export function parseCzk(priceHtml: string): number {
  const decoded = decodeHtml(priceHtml ?? '')
  // Ponecháme pouze čísla a oddělovače
  const digits = decoded.replace(/[^\d,.-]/g, '').replace(',', '.')
  const n = Number.parseFloat(digits)
  return Number.isFinite(n) ? n : 0
}


export function formatCzk(value: number): string {
  return new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK', maximumFractionDigits: 0 }).format(value)
}
