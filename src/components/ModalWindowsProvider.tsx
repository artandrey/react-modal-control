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
