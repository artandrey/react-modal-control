import { useEffect, useInsertionEffect, useRef } from 'react';

export interface AddListenerHookOptions<
  L extends (...args: unknown[]) => void
> {
  add: (listener: L) => void;
  remove: (listener: L) => void;
  listener: L | undefined;
}

export function useAddListener<L extends (...args: unknown[]) => void>(
  options: AddListenerHookOptions<L>
) {
  const { add, remove, listener } = options;
  const listenerRef = useRef(listener);

  useInsertionEffect(() => {
    listenerRef.current = listener;
  }, [listener]);

  useEffect(() => {
    const listener = (...args: unknown[]) =>
      listenerRef.current && listenerRef.current(...args);

    add(listener as L);

    return () => remove(listener as L);
  }, [add, remove]);
}
