export function isEmptyValue(value: unknown) {
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'boolean') return value === false
  return value === '' || value === null || value === undefined
}
