import { useCallback, useContext } from 'react';
import { ModalStateContext } from '../components/ModalStateProvider';
import { assertIsContextNotNull } from '../helpers/assertIsContextNotNull';
import { useModal } from './useModal';
import { LifecycleState } from '../types/public-types';
import { useAddListener } from './useAddListener';

export interface InternalModalHookOptions {
  onCloseStart?: () => void;
}

export function useInternalModal(options: InternalModalHookOptions = {}) {
  const modalStateContextValue = useContext(ModalStateContext);
  assertIsContextNotNull(modalStateContextValue);

  const { close } = useModal();

  const { instance, isActive } = modalStateContextValue;

  const { onCloseStart } = options;
  const { id, key, lifecycleState } = instance;

  useAddListener({
    listener: onCloseStart,
    add: (listener) => instance.addStartCloseListener(listener),
    remove: (listener) => instance.removeStartCloseListener(listener),
  });

  const closeSelf = useCallback(() => {
    close(id);
  }, [close, id]);

  return {
    closeSelf,
    id,
    key,
    lifecycleState,
    isActive,
    isClosing: lifecycleState === LifecycleState.CLOSING,
  };
}
