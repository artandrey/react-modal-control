import { generateId } from '../../helpers/generateId';
import { ListenersAccumulator } from './ListenersAccumulator';

export type DelayerListener = () => void;

export class DelayerAccumulator {
  private delayers: Set<number> = new Set();
  private listenersAccumulator = new ListenersAccumulator<DelayerListener>();
  private isActivated: boolean = false;
  private isExecuted: boolean = false;

  add() {
    const id = generateId();
    this.delayers.add(id);
    return id;
  }

  remove(delayerId: number) {
    this.delayers.delete(delayerId);
    if (this.delayers.size === 0 && this.isActivated) this.executeListeners();
  }

  addListener(onRelease: DelayerListener) {
    this.listenersAccumulator.addListener(onRelease);
  }

  removeListener(onRelease: DelayerListener) {
    this.listenersAccumulator.removeListener(onRelease);
  }

  private executeListeners() {
    if (!this.isExecuted) this.listenersAccumulator.execute();
    this.isExecuted = true;
  }

  activate() {
    this.isActivated = true;
    if (this.delayers.size === 0) this.executeListeners();
  }
}
