import { UpdateFunction } from '../types/UpdateFunction';

/**
 * @interface Updatable - Updatable interface
 * @property {UpdateFunction} update - The function that is called every frame.
 * @public
 */
export interface Updatable {
  update: UpdateFunction;
}
