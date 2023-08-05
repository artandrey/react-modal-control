import React, { useContext } from 'react';
import { ModalWindowsContext } from './ModalWindowsProvider';
import { assertIsContextNotNull } from '../helpers/assertIsContextNotNull';
import { useEventStateConsumer } from '../hooks/useEventStateConsumer';
import { ModalStateProvider } from './ModalStateProvider';

export interface ModalRendererProps {
  children: (modal: React.ReactNode) => React.ReactNode;
}

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
