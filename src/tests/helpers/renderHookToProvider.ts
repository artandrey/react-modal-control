import { renderHook, RenderHookResult } from '@testing-library/react';
import { AppOptions } from '../testing-app/ProviderWithModals';
import { createConfiguredProvider } from './createConfiguredProvider';

export const renderHookToProvider = <Result, Props>(
  render: (props: Props) => Result,
  providerOptions: AppOptions
): RenderHookResult<Result, Props> => {
  return renderHook(render, {
    wrapper: createConfiguredProvider(providerOptions),
  });
};
