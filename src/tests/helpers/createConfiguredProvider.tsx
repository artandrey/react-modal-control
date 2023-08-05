import React from 'react';
import ProviderWithModals, {
  AppOptions,
} from '../testing-app/ProviderWithModals';

export const createConfiguredProvider = (props: AppOptions) => {
  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <ProviderWithModals {...props}>{children}</ProviderWithModals>;
  };
  return Wrapper;
};
