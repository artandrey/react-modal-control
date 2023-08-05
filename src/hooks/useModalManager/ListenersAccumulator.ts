export type Listener<A, R> = (arg: A) => R;

export class ListenersAccumulator<L extends Listener<any, any>> {
  private readonly listeners: Set<L> = new Set();

  addListener(listener: L) {
    this.listeners.add(listener);
  }

  removeListener(listener: L) {
    this.listeners.delete(listener);
  }

  execute(...arg: Parameters<L>) {
    this.listeners.forEach((listener) => listener(arg));
  }
}
