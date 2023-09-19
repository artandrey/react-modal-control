import { useContext } from 'react';
import { ModalWindowsContext } from '../components/ModalWindowsProvider';
import { assertIsContextNotNull } from '../helpers/assertIsContextNotNull';
import { ExtractProps, OptionalIfPropsEmptyObject } from '../types/types';
import { ModalOpeningOptions, ModalWindows } from '../types/public-types';

// type OpenFunction<T extends ModalWindows, _K extends keyof T> = (key: _K, options: ModalOpeningOptions<OptionalIfPropsEmptyObject<ExtractProps<T[_K]>>>) => number;
/**
 * A custom hook for managing modal windows within a React application.
 * This hook allows you to open and close modal windows defined in the `ModalWindowsProvider`.
 *
 * @template T - A generic type representing the modal window components.
 * @param {void} - This function takes no parameters directly.
 * @returns {{
 *   open: <_K extends keyof T>(
 *     key: _K,
 *     ...[options]: OptionalIfPropsEmptyObject<
 *       ModalOpeningOptions<ExtractProps<T[_K]>>
 *     >
 *   ) => number,
 *   close: (id?: number | undefined) => void
 * }} - An object containing functions for opening and closing modal windows.
 *
 * @throws {Error} If used outside of the `ModalWindowsProvider` context.
 *
 * @example
 * // Import the useModal hook
 * import { useModal } from './hooks/useModal';
 *
 * // Inside a functional component
 * function MyComponent() {
 *   // Initialize the useModal hook
 *   const { open, close } = useModal();
 *
 *   // Function to open a modal
 *   function handleOpenModal() {
 *     // Open the 'myModal' with optional props
 *     const modalId = open('myModal', {
 *       props: {
 *         // ...props specific to 'myModal' component
 *       },
 *     });
 *   }
 *
 *   // Function to close the most recently opened modal
 *   function handleCloseModal() {
 *     close();
 *   }
 *
 *   return (
 *     <div>
 *       <button onClick={handleOpenModal}>Open Modal</button>
 *       <button onClick={handleCloseModal}>Close Modal</button>
 *     </div>
 *   );
 * }
 */
export function useModal<T extends ModalWindows>(): {
  open: <_K extends keyof T>(
    key: _K,
    ...[options]: OptionalIfPropsEmptyObject<
      ModalOpeningOptions<ExtractProps<T[_K]>>
    >
  ) => number;
  close: (id?: number | undefined) => void;
} {
  const modalsContextValues = useContext(ModalWindowsContext);
  assertIsContextNotNull(modalsContextValues, 'ModalWindowsProvider');

  const { open, close } = modalsContextValues;

  return {
    open: open as <_K extends keyof T>(
      key: _K,
      ...[options]: OptionalIfPropsEmptyObject<
        ModalOpeningOptions<ExtractProps<T[_K]>>
      >
    ) => number,
    close,
  };
}
