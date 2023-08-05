export function getFirstMapElement<T>(map: Map<unknown, T>): T | void {
  return map.values().next().value;
}
