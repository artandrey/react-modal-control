import React, { useContext } from 'react';
import { ModalWindowsContext } from './ModalWindowsProvider';
import { assertIsContextNotNull } from '../helpers/assertIsContextNotNull';
import { useEventStateConsumer } from '../hooks/useEventStateConsumer';
import { ModalStateProvider } from './ModalStateProvider';

export interface ModalRendererProps {
  children: (modal: React.ReactNode) => React.ReactNode;
}

/**
 * A React component responsible for rendering and managing modal windows within a React application.
 * It retrieves modal windows from the modal context and renders them accordingly.
 *
 * @param {ModalRendererProps} props - The component's props.
 * @returns {React.ReactNode} - The rendered modal windows within the application's layout.
 *
 * @throws {TypeError} If `children` is not provided as a valid React component.
 *
 * @example
 * // Import the ModalRenderer component
 * import { ModalRenderer } from 'react-modal-control';
 *
 * // Within your application's layout
 * function App() {
 *   return (
 *     <ModalWindowsProvider
 *       type="queue"
 *       appearenceMode="after-close"
 *       modals={MODAL_WINDOWS}
 *     >
 *       //rest of your code
 *       <ModalRenderer>
 *         {(modal) => (
 *           <div className="modal-window-wrapper">
 *             {modal}
 *           </div>
 *         )}
 *       </ModalRenderer>
 *     </ModalWindowsProvider>
 *   );
 * }
 */
export const ModalRenderer: React.FC<ModalRendererProps> = ({ children }) => {
  const modalContextValues = useContext(ModalWindowsContext);
  assertIsContextNotNull(modalContextValues);

  const { eventProvider } = modalContextValues;

  const modals = useEventStateConsumer(eventProvider);

  return (
    <>
      {modals.map((Modal, i, array) => (
        <ModalStateProvider
          key={Modal.id}
          modalInstance={modalContextValues.getInstanceById(Modal.id)!}
          isActive={i === array.length - 1}
        >
          {children(<Modal.Element key={Modal.id} {...Modal.props} />)}
        </ModalStateProvider>
      ))}
    </>
  );
};
