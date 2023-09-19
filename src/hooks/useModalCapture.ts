import { useCallback, useContext, useEffect, useRef } from 'react';
import { ModalStateContext } from '../components/ModalStateProvider';
import { assertIsContextNotNull } from '../helpers/assertIsContextNotNull';
import { useAddListener } from './useAddListener';

/**
 * A custom hook for capturing and controlling the closing of a modal window with optional animations.
 * This hook allows you to delay the modal window's closure and release it manually, often used for animations.
 *
 * @param {() => void} [onCloseStart] - An optional callback function to be executed when the modal's close operation starts.
 * @returns {() => void} - A function to release the modal window's close capture and trigger the closure.
 *
 * @throws {TypeError} If used outside of a modal window component wrapped by `ModalStateProvider`.
 *
 * @example
 * // Import the useModalCapture hook
 * import { useModalCapture } from 'react-modal-control';
 *
 * function Delay({ isClosing, timeout }) {
 *   const release = useModalCapture();
 *
 *   useEffect(() => {
 *     if (isClosing) {
 *       const timeoutId = setTimeout(() => {
 *         release();
 *       }, timeout);
 *
 *       return () => clearTimeout(timeoutId);
 *     }
 *   }, [isClosing]);
 *
 *   return <p>Timout is: {timeout} ms</p>;
 * }
 *
 * function Modal() {
 *   const { isClosing } = useInternalModal();
 *
 *   return (
 *     <div>
 *       <Delay timeout={1000} isClosing={isClosing} />
 *       <Delay timeout={2000} isClosing={isClosing} />
 *     </div>
 *   );
 * }
 */
export function useModalCapture(onCloseStart?: () => void): () => void {
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
