export function forcePositiveInteger(value: string) {
  return value.replace(/\D+/g, '');
}
