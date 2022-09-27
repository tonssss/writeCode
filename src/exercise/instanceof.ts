export function myInstanceof(instance: any, origin: any): boolean {
  if (instance == null) return false
  const type = typeof instance
  if (type !== 'object' && type !== 'function') {
    return false
  }

  let tempInstance = instance
  while (tempInstance) {
    if (tempInstance.__proto__ === origin.prototype) {
      return true
    }
    tempInstance = tempInstance.__proto__
  }

  return false
}