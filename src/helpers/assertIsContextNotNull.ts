export function assertIsContextNotNull<T>(
  value: T,
  displayName?: string
): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error(
      `The value of context is ${value}. Make shure that you wrapped your App at ${
        displayName ?? 'required Context Provider'
      }`
    );
  }
}
