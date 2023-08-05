import {
  LifecycleStateLiteral,
  LifecycleState,
  ModalId,
} from '../../types/public-types';
import { DelayerAccumulator } from './DelayerAccumulator';
import { IModalState } from './IModalState';
import { ListenersAccumulator } from './ListenersAccumulator';
import { ModalInstanceOptions } from './useModalManager';

export interface ModalInstanceLifecycleHooks {
  onCloseStart?: (instance: ModalInstance) => void;
  onClosed?: (instance: ModalInstance) => void;
  onOpen?: (instance: ModalInstance) => void;
}

export type StartCloseListener = () => void;

export class ModalInstance {
  lifecycleState: LifecycleStateLiteral = LifecycleState.PENDING;
  private readonly closeDelayers = new DelayerAccumulator();
  private readonly startCloseListenersAccumulator =
    new ListenersAccumulator<StartCloseListener>();

  constructor(
    private readonly element: React.ComponentType<any>,
    public readonly id: ModalId,
    public readonly key: PropertyKey,
    private readonly options: ModalInstanceOptions
  ) {
    this.closeDelayers.addListener(() => {
      this.endClose();
    });
  }

  public get Element() {
    return this.element;
  }

  public get props() {
    return this.options.modalOptions.props ?? {};
  }

  addCloseDelayer() {
    return this.closeDelayers.add();
  }

  removeCloseDelayer(delayerId: number) {
    this.closeDelayers.remove(delayerId);
  }

  addStartCloseListener(listener: StartCloseListener) {
    this.startCloseListenersAccumulator.addListener(listener);
  }

  removeStartCloseListener(listener: StartCloseListener) {
    this.startCloseListenersAccumulator.removeListener(listener);
  }

  startClose() {
    if (
      this.lifecycleState === LifecycleState.CLOSED ||
      this.lifecycleState !== LifecycleState.OPENED
    )
      return;
    this.lifecycleState = LifecycleState.CLOSING;
    this.executeHook('onCloseStart');
    this.startCloseListenersAccumulator.execute();
    this.closeDelayers.activate();
  }

  endClose() {
    if (this.lifecycleState === LifecycleState.CLOSED) return;
    this.lifecycleState = LifecycleState.CLOSED;
    this.executeHook('onClosed');
  }

  open() {
    if (this.lifecycleState !== LifecycleState.PENDING) return;
    this.lifecycleState = LifecycleState.OPENED;
    this.executeHook('onOpen');
  }

  private executeHook(hook: keyof ModalInstanceLifecycleHooks) {
    const callback = this.options.hooks ? this.options.hooks[hook] : null;
    if (callback) callback(this);
  }

  toState(): IModalState {
    return {
      id: this.id,
      Element: this.element,
      key: this.key,
      props: this.props,
      lifecycleState: this.lifecycleState,
    };
  }
}
