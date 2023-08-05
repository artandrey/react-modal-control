import React from 'react';
import { ModalRenderer, ModalWindowsProvider } from '../../components';
import MODALS from './modals';
import { LifecycleOptionsVariants } from '../../types/public-types';

export type AppOptions = React.PropsWithChildren & LifecycleOptionsVariants;

const ProviderWithModals: React.FC<AppOptions> = ({
  children,
  ...restOptions
}) => {
  return (
    <ModalWindowsProvider modals={MODALS} {...restOptions}>
      <ModalRenderer>{(modal) => modal}</ModalRenderer>
      {children}
    </ModalWindowsProvider>
  );
};

export default ProviderWithModals;
