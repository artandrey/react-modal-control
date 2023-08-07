import { ModalId } from '../types/public-types';

let id = 1;

export function generateId(): ModalId {
  return id++;
}
