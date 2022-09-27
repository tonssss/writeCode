export function myNew<T>(fn: Function, ...args: any[]): T {
  const obj = Object.create(fn.prototype)
  fn.apply(obj, args)
  return obj
}