import { useCallback, useContext, useEffect, useRef } from 'react';
import { ModalStateContext } from '../components/ModalStateProvider';
import { assertIsContextNotNull } from '../helpers/assertIsContextNotNull';
import { useAddListener } from './useAddListener';

export function useModalCapture(onCloseStart?: () => void) {
  const modalStateContextValue = useContext(ModalStateContext);
  assertIsContextNotNull(modalStateContextValue);
  const { instance } = modalStateContextValue;

  useAddListener({
    listener: onCloseStart,
    add: (listener) => instance.addStartCloseListener(listener),
    remove: (listener) => instance.removeStartCloseListener(listener),
  });

  const delayerRef = useRef<number>();

  const release = useCallback(() => {
    if (delayerRef.current !== undefined) {
      instance.removeCloseDelayer(delayerRef.current);
    }
  }, [instance.removeCloseDelayer]);

  useEffect(() => {
    delayerRef.current = instance.addCloseDelayer();

    return () => release();
  }, [instance.addCloseDelayer, release]);

  return release;
}
