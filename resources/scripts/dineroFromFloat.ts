import { BRL } from '@dinero.js/currencies'
import { dinero } from 'dinero.js'

export default function dineroFromFloat({ amount: float, currency = BRL }) {
  const factor = currency.base ** currency.exponent
  const amount = Math.round(float * factor)

  return dinero({ amount, currency })
}
