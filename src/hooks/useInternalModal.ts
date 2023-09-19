import { useCallback, useContext } from 'react';
import { ModalStateContext } from '../components/ModalStateProvider';
import { assertIsContextNotNull } from '../helpers/assertIsContextNotNull';
import { useModal } from './useModal';
import { LifecycleState, LifecycleStateLiteral } from '../types/public-types';
import { useAddListener } from './useAddListener';

export interface InternalModalHookOptions {
  onCloseStart?: () => void;
}
/**
 * A custom hook for managing internal state and interactions within a modal window component.
 * This hook provides access to modal-specific information and actions, such as closing the modal,
 * checking the modal's lifecycle state, and adding an onCloseStart listener.
 *
 * @param {InternalModalHookOptions} [options={}] - An optional object with hook configuration options.
 * @returns {{
 *   closeSelf: () => void,
 *   id: number,
 *   key: PropertyKey,
 *   lifecycleState: LifecycleStateLiteral,
 *   isActive: boolean,
 *   isClosing: boolean
 * }} - An object containing functions and data related to the internal state of the modal window.
 *
 * @throws {Error} If used outside of a modal window component wrapped by `ModalStateProvider`.
 *
 * @example
 * // Import the useInternalModal hook
 * import { useInternalModal } from 'react-modal-control';
 *
 * // Inside a modal window component
 * function MyModal() {
 *   // Initialize the useInternalModal hook
 *   const {
 *     closeSelf,
 *     id,
 *     key,
 *     lifecycleState,
 *     isActive,
 *     isClosing,
 *   } = useInternalModal();
 *
 *   // Function to close the modal from inside
 *   function handleCloseModal() {
 *     closeSelf();
 *   }
 *
 *   return (
 *     <div>
 *       <h2>My Modal</h2>
 *       <p>Modal ID: {id}</p>
 *       <p>Modal Key: {key}</p>
 *       <p>Modal Lifecycle State: {lifecycleState}</p>
 *       <p>Is Active: {isActive ? 'Yes' : 'No'}</p>
 *       <p>Is Closing: {isClosing ? 'Yes' : 'No'}</p>
 *       <button onClick={handleCloseModal}>Close Modal</button>
 *     </div>
 *   );
 * }
 */
export function useInternalModal(options: InternalModalHookOptions = {}): {
  closeSelf: () => void;
  id: number;
  key: PropertyKey;
  lifecycleState: LifecycleStateLiteral;
  isActive: boolean;
  isClosing: boolean;
} {
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
