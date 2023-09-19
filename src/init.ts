import { useModal } from './hooks/useModal';
import { ModalWindows } from './types/public-types';

/**
 * Initializes the modal control system with the provided modal window components.
 * This function prepares and returns the `useModal` hook customized for the specified modal components.
 *
 * @template T - A generic type representing the modal window components.
 * @param {T} modals - An object containing the modal window components.
 * @returns {{
 *   useModal: (useModal<T>)
 * }} - An object with the customized `useModal` hook.
 *
 * @example
 * // Import the init function
 * import { init } from 'react-modal-control';
 *
 * // Define your modal window components
 * const MODAL_WINDOWS = {
 *   myModal: MyModalComponent,
 *   anotherModal: AnotherModalComponent,
 * };
 *
 * // Initialize the useModal hook for the specified modal components
 * const { useModal } = init(MODAL_WINDOWS);
 *
 * // Now you can use the customized useModal hook to manage your modals
 * function MyComponent() {
 *   const { open, close } = useModal();
 *
 *   // Use open and close functions to manage modals
 *
 *   return (
 *     // Your component JSX
 *   );
 * }
 */
// eslint-disable-next-line
export function init<T extends ModalWindows>(
  modals: T
): {
  useModal: typeof useModal<T>;
} {
  return {
    useModal: useModal<T>,
  };
}
