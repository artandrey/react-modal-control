import { ModalOpeningOptions } from './public-types';

export type ExtractProps<T> = T extends React.ComponentType<infer U>
  ? U
  : never;

export type OptionalIfPropsEmptyObject<T> = T extends ModalOpeningOptions<
  infer P
> /* eslint-disable  @typescript-eslint/ban-types */
  ? {} extends P
    ? [parameter?: T]
    : [parameter: T]
  : never;
