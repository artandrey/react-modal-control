import { act, cleanup, renderHook } from '@testing-library/react';
import { useEventState } from '../hooks/useEventState';
import { useEventStateConsumer } from '../hooks/useEventStateConsumer';

describe('Tests for useEventStateConsumer hook', () => {
  afterAll(() => cleanup());

  const {
    result: {
      current: [, setState, eventProvider],
    },
  } = renderHook(() => useEventState(1));
  const { result } = renderHook(() => useEventStateConsumer(eventProvider));

  test('state shoul be equal to current value after initialization', () => {
    expect(result.current).toBe(1);
  });

  test('should update component state after changes inside useEventState', () => {
    act(() => setState(2));
    expect(result.current).toBe(2);
  });
});
