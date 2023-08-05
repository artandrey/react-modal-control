import { ModalId } from '../types/public-types';

export function generateId(): ModalId {
  return Math.random();
}
