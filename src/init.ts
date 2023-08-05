import { useModal } from './hooks/useModal';
import { ModalWindows } from './types/public-types';

// eslint-disable-next-line
export function init<T extends ModalWindows>(modals: T) {
  return {
    useModal: useModal<T>,
  };
}
