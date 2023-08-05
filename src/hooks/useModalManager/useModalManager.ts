import { useCallback, useRef } from 'react';
import {
  AppearenceMode,
  AppearenceMods,
  LifecycleState,
  LifecycleType,
  LifecycleTypes,
  ModalId,
  ModalOpeningOptions,
  ModalWindows,
} from '../../types/public-types';
import { generateId } from '../../helpers/generateId';
import { EventStateProvider, useEventState } from '../useEventState';
import { ModalInstance, ModalInstanceLifecycleHooks } from './ModalInstance';
import { IModalState } from './IModalState';
import { getFirstMapElement } from '../../helpers/getFirstMapElement';

export interface ModalInstanceOptions {
  hooks?: ModalInstanceLifecycleHooks;
  modalOptions: ModalOpeningOptions<any>;
}

export interface LifecycleOptions {
  type: LifecycleTypes;
  appearenceMode?: AppearenceMods;
}

export interface ModalManagerOptions extends LifecycleOptions {
  modals: ModalWindows;
}

export interface ModalManager {
  open: (key: PropertyKey, options: ModalOpeningOptions<any>) => void;
  close: (id?: number) => void;
  eventProvider: EventStateProvider<IModalState[]>;
  getInstanceById(id: number): ModalInstance | undefined;
}

export function useModalManager(options: ModalManagerOptions): ModalManager {
  const { modals: modalWindows, type, appearenceMode } = options;

  const modalInstancesRef = useRef<Map<ModalId, ModalInstance>>(new Map());

  const [, setModals, eventProvider] = useEventState<IModalState[]>([]);

  const open = useCallback(
    (key: PropertyKey, options: ModalOpeningOptions<any>) => {
      const id = generateId();

      const modal = modalWindows[key];

      if (!modal)
        throw new Error(`Modal with key: ${String(key)} was not found`);

      function getFirstInQueue() {
        for (const queuedInstance of modalInstancesRef.current.values()) {
          if (queuedInstance.lifecycleState === LifecycleState.PENDING) {
            return queuedInstance;
          }
        }
      }

      const instance = new ModalInstance(modal, id, key, {
        modalOptions: options,
        hooks: {
          onClosed: (instance) => {
            setModals((modals) =>
              modals.filter((modal) => modal.id !== instance.id)
            );
            modalInstancesRef.current.delete(instance.id);

            if (
              type === LifecycleType.QUEUE &&
              appearenceMode === AppearenceMode.AFTER_CLOSE
            ) {
              getFirstInQueue()?.open();
            }
          },
          onOpen: () => {
            setModals((modals) => [...modals, instance.toState()]);
          },
          onCloseStart: (instance) => {
            setModals((modals) =>
              modals.map((modal) =>
                modal.id === instance.id ? instance.toState() : modal
              )
            );
            if (
              type === LifecycleType.QUEUE &&
              appearenceMode === AppearenceMode.DURING_CLOSE
            ) {
              getFirstInQueue()?.open();
            }
          },
        },
      });

      modalInstancesRef.current.set(instance.id, instance);

      if (
        modalInstancesRef.current.size === 1 ||
        type === LifecycleType.MULTIPLE
      ) {
        instance.open();
      }
    },
    [setModals, modalWindows, type, appearenceMode]
  );

  const close = useCallback(
    (id?: ModalId) => {
      const modals = modalInstancesRef.current;

      let modal: ModalInstance | void;

      if (id === undefined) {
        modal = getFirstMapElement(modals);
      } else {
        modal = modals.get(id);
      }

      if (!modal) return;

      modal.startClose();
    },
    [setModals]
  );

  const getInstanceById = useCallback((id: ModalId) => {
    return modalInstancesRef.current.get(id);
  }, []);

  return {
    open,
    close,
    eventProvider,
    getInstanceById,
  };
}
