import React, { useMemo } from 'react';
import {
  ModalManager,
  useModalManager,
} from '../hooks/useModalManager/useModalManager';
import { LifecycleOptionsVariants, ModalWindows } from '../types/public-types';
import { AppearenceMode, LifecycleType } from '../types/public-types';

export const ModalWindowsContext = React.createContext<ModalManager | null>(
  null
);

const DEFAULT_OPTIONS: LifecycleOptionsVariants = {
  type: LifecycleType.QUEUE,
  appearenceMode: AppearenceMode.AFTER_CLOSE,
};

export type ModalWindowsProviderOptions = {
  modals: ModalWindows;
} & LifecycleOptionsVariants;

/**
 * A React component that provides context for managing modal windows within a React application.
 * It encapsulates modal-related functions such as opening, closing, event handling, and instance retrieval.
 *
 * @param {React.PropsWithChildren<ModalWindowsProviderOptions>} props - The component's props.
 * @returns {React.ReactNode} - The rendered child components within the modal windows context.
 *
 * @throws {TypeError} If `children` is not provided as a valid React component.
 *
 * @example
 * // Import the ModalWindowsProvider component
 * import { ModalWindowsProvider } from 'react-modal-control';
 *
 * // Wrap your entire application with ModalWindowsProvider
 * function App() {
 *   return (
 *     <ModalWindowsProvider
 *       type="queue"
 *       appearenceMode="after-close"
 *       modals={MODAL_WINDOWS}
 *     >
 *       // your app code
 *     </ModalWindowsProvider>
 *   );
 * }
 */
export const ModalWindowsProvider: React.FC<
  React.PropsWithChildren<ModalWindowsProviderOptions>
> = ({ children, ...modalsOptions }) => {
  const { open, close, eventProvider, getInstanceById } = useModalManager({
    ...DEFAULT_OPTIONS,
    ...modalsOptions,
  });

  const value = useMemo(() => {
    return {
      open,
      close,
      eventProvider,
      getInstanceById,
    };
  }, [open, close, eventProvider, getInstanceById]);

  return (
    <ModalWindowsContext.Provider value={value}>
      {children}
    </ModalWindowsContext.Provider>
  );
};
