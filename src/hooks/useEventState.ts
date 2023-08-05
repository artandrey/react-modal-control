import { MutableRefObject, useCallback, useRef } from 'react';
import { useConst } from './useConst';

const EVENT_NAME = 'onstatechange';

// type EventTargetWithoutDispatch = Omit<EventTarget, 'dispatchEvent'>;

type SetStateFunction<S> = (prevState: S) => S;

type SetStateAction<S> = S | SetStateFunction<S>;

export class EventStateProvider<T> {
  readonly __stateType?: T;
  constructor(
    private readonly eventName: string,
    private readonly eventTarget: EventTarget,
    private readonly stateRef: MutableRefObject<T>
  ) {}

  subscribe(listener: EventListenerOrEventListenerObject) {
    this.eventTarget.addEventListener(this.eventName, listener);
  }

  unsubscribe(listener: EventListenerOrEventListenerObject) {
    this.eventTarget.addEventListener(this.eventName, listener);
  }

  getCurrentValue() {
    return this.stateRef.current;
  }

  update(value: T) {
    this.eventTarget.dispatchEvent(
      new CustomEvent(this.eventName, { detail: value })
    );
  }
}

export function useEventState<T>(): readonly [
  () => T | undefined,
  (value: SetStateAction<T>) => void,
  EventStateProvider<T>
];
export function useEventState<T>(
  initialState: T
): readonly [
  () => T,
  (value: SetStateAction<T>) => void,
  EventStateProvider<T>
];
export function useEventState<T>(
  initialState?: T
): readonly [
  () => T | undefined,
  (value: SetStateAction<T>) => void,
  EventStateProvider<T | undefined>
] {
  const state = useRef(initialState);

  const eventProvider = useConst(
    new EventStateProvider(EVENT_NAME, new EventTarget(), state)
  );

  const setState = useCallback((value: SetStateAction<T>) => {
    if (typeof value !== 'function') {
      state.current = value;
    } else {
      state.current = (value as SetStateFunction<T | undefined>)(state.current);
    }
    eventProvider.update(state.current);
  }, []);

  const getState = useCallback(() => {
    return state.current;
  }, []);

  return [getState, setState, eventProvider] as const;
}
