import { vi } from 'vitest';
import { DelayerAccumulator } from '../hooks/useModalManager/DelayerAccumulator';

describe('Delayer Accumulator test', () => {
  test('Should run listeners if delayers are not set', () => {
    const listeners = {
      listener1: () => {},
    };

    const listener1Spy = vi.spyOn(listeners, 'listener1');

    const delayerAccumulator = new DelayerAccumulator();

    delayerAccumulator.addListener(() => listeners.listener1());

    delayerAccumulator.activate();

    expect(listener1Spy).toBeCalled();
  });

  test('Should run listeners only after deleyers were removed', () => {
    const listeners = {
      listener1: () => {},
    };

    const listener1Spy = vi.spyOn(listeners, 'listener1');

    const delayerAccumulator = new DelayerAccumulator();

    delayerAccumulator.addListener(() => listeners.listener1());

    const delayer1 = delayerAccumulator.add();
    const delayer2 = delayerAccumulator.add();

    delayerAccumulator.activate();

    expect(listener1Spy).not.toBeCalled();

    delayerAccumulator.remove(delayer1);

    expect(listener1Spy).not.toBeCalled();

    delayerAccumulator.remove(delayer2);

    expect(listener1Spy).toBeCalled();
  });
});
