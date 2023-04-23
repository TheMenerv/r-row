import { Drawable } from './Drawable';
import { Updatable } from './Updatable';

/**
 * @interface Scene - Scene interface
 * @method load - Load method
 * @method unload - Unload method
 * @extends IUpdatable
 * @extends IDrawable
 * @public
 */
export interface Scene extends Updatable, Drawable {
  load(data?: any): void;
  unload(): void;
}
