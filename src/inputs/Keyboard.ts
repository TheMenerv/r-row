import { GameCanvas } from '../GameCanvas';
import { GameLoop } from '../GameLoop';
import { KeyState } from '../enums/KeyState';

/**
 * @class Keyboard - A singleton class that handles keyboard input.
 * @public
 */
export class Keyboard {
  private static _instance: Keyboard;
  private _tempState: Map<string, 'up' | 'down'>;
  private _state: Map<string, KeyState>;

  /**
   * @constructor
   * @private
   */
  private constructor() {
    this._tempState = new Map<string, 'up' | 'down'>();
    this._state = new Map<string, KeyState>();

    const canvas = GameCanvas.instance.canvas;
    canvas.addEventListener('keydown', this._onKeyDown.bind(this), false);
    canvas.addEventListener('keyup', this._onKeyUp.bind(this), false);

    GameLoop.instance.subscribeToUpdate(this._update.bind(this));
  }

  /**
   * @get instance - The instance of the Keyboard class.
   * @returns {Keyboard} The instance of the Keyboard class.
   * @public
   * @example
   * Keyboard.instance;
   */
  public static get instance(): Keyboard {
    if (!Keyboard._instance) Keyboard._instance = new Keyboard();
    return Keyboard._instance;
  }

  /**
   * @method isDown - Check if a key is down.
   * @param {string} key - The key to check.
   * @returns {boolean} True if the key is down, false otherwise.
   * @public
   * @example
   * ServiceContainer.Keyboard.isDown('KeyA');
   */
  public isDown(key: string): boolean {
    return this._state.get(key)?.includes('down') ?? false;
  }

  /**
   * @method isUp - Check if a key is up.
   * @param {string} key - The key to check.
   * @returns {boolean} True if the key is up, false otherwise.
   * @public
   * @example
   * ServiceContainer.Keyboard.isUp('KeyA');
   */
  public isUp(key: string): boolean {
    return this._state.get(key)?.includes('up') ?? true;
  }

  /**
   * @method isJustDown - Check if a key is just down.
   * @param {string} key - The key to check.
   * @returns {boolean} True if the key is just down, false otherwise.
   * @public
   * @example
   * ServiceContainer.Keyboard.isJustDown('KeyA');
   */
  public isJustDown(key: string): boolean {
    return this._state.get(key) === KeyState.JustDown;
  }

  /**
   * @method isJustUp - Check if a key is just up.
   * @param {string} key - The key to check.
   * @returns {boolean} True if the key is just up, false otherwise.
   * @public
   * @example
   * ServiceContainer.Keyboard.isJustUp('KeyA');
   */
  public isJustUp(key: string): boolean {
    return this._state.get(key) === KeyState.JustUp;
  }

  /**
   * @method _update - Update the state of the keyboard.
   * @param {number} deltaTime - The time since the last update.
   * @returns {void}
   * @private
   */
  private _update(deltaTime: number): void {
    const oldState = this._state;
    this._tempState.forEach((state, key) => {
      if (oldState.get(key)?.includes('up') && state === KeyState.Down)
        this._state.set(key, KeyState.JustDown);
      else if (oldState.get(key)?.includes('down') && state === KeyState.Up)
        this._state.set(key, KeyState.JustUp);
      else this._state.set(key, state as KeyState);
    });
  }

  /**
   * @method _onKeyDown - Handle a key down event.
   * @param {KeyboardEvent} event - The event to handle.
   * @returns {void}
   * @private
   */
  private _onKeyDown(event: KeyboardEvent): void {
    event.preventDefault();
    this._tempState.set(event.code, 'down');
    if (!this._state.has(event.code)) this._state.set(event.code, KeyState.Up);
  }

  /**
   * @method _onKeyUp - Handle a key up event.
   * @param {KeyboardEvent} event - The event to handle.
   * @returns {void}
   * @private
   */
  private _onKeyUp(event: KeyboardEvent): void {
    event.preventDefault();
    this._tempState.set(event.code, 'up');
  }
}
