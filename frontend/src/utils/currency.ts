export const FREE_SHIPPING_THRESHOLD = 60

const euroFormatter = new Intl.NumberFormat('ro-RO', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

export function formatPrice(value: number) {
  return euroFormatter.format(value)
}
