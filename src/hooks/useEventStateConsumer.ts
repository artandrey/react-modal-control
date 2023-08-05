import { useState } from 'react';
import { EventStateProvider } from './useEventState';
import { assertIsEventCustom } from '../helpers/assertIsEventCustom';
import { useAddListener } from './useAddListener';

export function useEventStateConsumer<T>(provider: EventStateProvider<T>) {
  const [state, setState] = useState<T>(provider.getCurrentValue());

  const listener = (event: Event) => {
    assertIsEventCustom<T>(event);

    setState(event.detail);
  };

  useAddListener({
    listener,
    add: (listener) => provider.subscribe(listener),
    remove: (listener) => provider.unsubscribe(listener),
  });

  return state;
}
