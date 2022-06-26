type AnyFn = (...args: any) => any

export default function debounce<T extends AnyFn>(func: T, timeout = 300) {
  let timer

  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}
