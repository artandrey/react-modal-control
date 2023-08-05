import { cleanup, renderHook } from '@testing-library/react';
import { useEventState } from '../hooks/useEventState';
import { expectTypeOf, vi } from 'vitest';

describe('Tests for useEventState hook', () => {
  afterAll(() => cleanup());

  test('getState should return current value', () => {
    const { result } = renderHook(() => useEventState(1));
    const [getState, setState] = result.current;

    expect(getState()).toBe(1);

    setState(2);

    expect(getState()).toBe(2);
  });

  test('If value is declared at start get state return type should be only value', () => {
    const { result } = renderHook(() => useEventState(1));
    const [getState] = result.current;

    expectTypeOf(getState()).toEqualTypeOf<number>();
  });

  test('Event State Provider should fire CusomEvent after state change', () => {
    const { result } = renderHook(() => useEventState(1));
    const [, setState, eventProvider] = result.current;

    let receivedEvent: Event;

    const listeners = {
      listener1(event: CustomEvent<number>) {
        receivedEvent = event;
      },
    };

    const listener1Spy = vi.spyOn(listeners, 'listener1');

    eventProvider.subscribe((event) =>
      listeners.listener1(event as CustomEvent<number>)
    );

    setState(2);

    expect(listener1Spy).toBeCalled();
    expect(receivedEvent!).toBeInstanceOf(CustomEvent);
    expect((receivedEvent! as CustomEvent).detail).toBe(2);
  });
});
