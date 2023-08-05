export function assertIsEventCustom<T>(
  event: Event
): asserts event is CustomEvent<T> {
  if (!(event instanceof CustomEvent))
    throw new Error('Recieved Event is not a CustomEvent');
}
