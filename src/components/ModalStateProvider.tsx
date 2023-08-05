import React, { PropsWithChildren } from 'react';
import { ModalInstance } from '../hooks/useModalManager/ModalInstance';

export interface ModalContext {
  instance: ModalInstance;
  isActive: boolean;
}

export const ModalStateContext = React.createContext<ModalContext | null>(null);

interface ModalStateProviderProps {
  modalInstance: ModalInstance;
  isActive: boolean;
}

export const ModalStateProvider: React.FC<
  PropsWithChildren<ModalStateProviderProps>
> = ({ children, modalInstance, isActive }) => {
  return (
    <ModalStateContext.Provider value={{ instance: modalInstance, isActive }}>
      {children}
    </ModalStateContext.Provider>
  );
};
