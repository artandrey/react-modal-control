export type ModalWindows = Readonly<
  Record<PropertyKey, React.ComponentType<any>>
>;

export interface ModalOpeningOptions<P extends object> {
  props: (P & object) | undefined;
}

export type ModalId = number;

export enum LifecycleState {
  PENDING = 'PENDING',
  OPENED = 'OPENED',
  CLOSING = 'CLOSING',
  CLOSED = 'CLOSED',
}

export enum AppearenceMode {
  AFTER_CLOSE = 'after-close',
  DURING_CLOSE = 'during-close',
}

export enum LifecycleType {
  MULTIPLE = 'multiple',
  QUEUE = 'queue',
}

export type LifecycleStateLiteral = 'PENDING' | 'OPENED' | 'CLOSING' | 'CLOSED';
export type AppearenceMods = 'after-close' | 'during-close';
export type LifecycleTypes = 'multiple' | 'queue';

export type LifecycleOptionsVariants =
  | {
      type: 'multiple';
    }
  | {
      type: 'queue';
      appearenceMode: AppearenceMods;
    };
