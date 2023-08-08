import { useContext } from 'react';
import { ModalWindowsContext } from '../components/ModalWindowsProvider';
import { assertIsContextNotNull } from '../helpers/assertIsContextNotNull';
import { ExtractProps, OptionalIfPropsEmptyObject } from '../types/types';
import { ModalOpeningOptions, ModalWindows } from '../types/public-types';

// type OpenFunction<T extends ModalWindows, _K extends keyof T> = (key: _K, options: ModalOpeningOptions<OptionalIfPropsEmptyObject<ExtractProps<T[_K]>>>) => number;

export function useModal<T extends ModalWindows>() {
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
