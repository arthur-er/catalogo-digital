import { toFormat as toDineroFormat } from 'dinero.js'

export default function toFormat(dineroObject, locale = 'pt-BR', options = {}) {
  function transformer({ amount, currency }) {
    return amount.toLocaleString(locale, {
      ...options,
      style: 'currency',
      currency: currency.code,
    })
  }

  return toDineroFormat(dineroObject, transformer)
}
