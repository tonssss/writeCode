export function getType(x: any): string {
  const originType = Object.prototype.toString.call(x)
  const index = originType.indexOf(' ')
  const type = originType.slice(index + 1, -1)
  return type.toLowerCase()
}