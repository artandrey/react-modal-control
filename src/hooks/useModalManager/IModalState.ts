import { ModalId, LifecycleStateLiteral } from '../../types/public-types';

export interface IModalState<P = any> {
  readonly Element: React.ComponentType<P>;
  readonly id: ModalId;
  readonly key: PropertyKey;
  readonly props: P;
  readonly lifecycleState: LifecycleStateLiteral;
}
