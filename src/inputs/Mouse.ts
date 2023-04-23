import { GameCanvas } from '../GameCanvas';
import { GameLoop } from '../GameLoop';
import { KeyState } from '../enums/KeyState';
import { Point } from '../primitives/Point';
import { AssetStore } from '../assets/AssetStore';
import { MouseButton } from '../enums/MouseButton';

/**
 * @class Mouse - A singleton class that handles mouse input.
 * @public
 */
export class Mouse {
  private static _instance: Mouse;
  private _position: Point;
  private _tempState: Map<MouseButton, 'up' | 'down'>;
  private _state: Map<MouseButton, KeyState>;

  /**
   * @constructor
   * @private
   */
  private constructor() {
    this._position = new Point(0, 0);
    this._tempState = new Map<MouseButton, 'up' | 'down'>();
    this._state = new Map<MouseButton, KeyState>();

    const canvas = GameCanvas.instance.canvas;
    canvas.addEventListener('mousedown', this._onMouseDown.bind(this), false);
    canvas.addEventListener('mouseup', this._onMouseUp.bind(this), false);
    canvas.addEventListener('mousemove', this._onMouseMove.bind(this), false);
    canvas.addEventListener(
      'contextmenu',
      this._onContextMenu.bind(this),
      false
    );

    GameLoop.instance.subscribeToUpdate(this._update.bind(this));
  }

  /**
   * @get instance - The instance of the Mouse class.
   * @returns {Mouse} The instance of the Mouse class.
   * @public
   * @example
   * Mouse.instance;
   */
  public static get instance(): Mouse {
    if (!Mouse._instance) Mouse._instance = new Mouse();
    return Mouse._instance;
  }

  /**
   * @get position - The position of the mouse.
   * @returns {Point} The position of the mouse.
   * @public
   * @example
   * ServiceContainer.Mouse.position;
   */
  public get position(): Point {
    return this._position;
  }

  /**
   * @method isDown - Check if a button is down.
   * @param {MouseButton} button - The button to check.
   * @returns {boolean} True if the button is down, false otherwise.
   * @public
   * @example
   * ServiceContainer.Mouse.isDown(MouseButton.Left);
   */
  public isDown(button: MouseButton): boolean {
    return this._state.get(button)?.includes('down') ?? false;
  }

  /**
   * @method isUp - Check if a button is up.
   * @param {MouseButton} button - The button to check.
   * @returns {boolean} True if the button is up, false otherwise.
   * @public
   * @example
   * ServiceContainer.Mouse.isUp(MouseButton.Left);
   */
  public isUp(button: MouseButton): boolean {
    return this._state.get(button)?.includes('up') ?? true;
  }

  /**
   * @method isJustDown - Check if a button is just down.
   * @param {MouseButton} button - The button to check.
   * @returns {boolean} True if the button is just down, false otherwise.
   * @public
   * @example
   * ServiceContainer.Mouse.isJustDown(MouseButton.Left);
   */
  public isJustDown(button: MouseButton): boolean {
    return this._state.get(button) === KeyState.JustDown;
  }

  /**
   * @method isJustUp - Check if a button is just up.
   * @param {MouseButton} button - The button to check.
   * @returns {boolean} True if the button is just up, false otherwise.
   * @public
   * @example
   * ServiceContainer.Mouse.isJustUp(MouseButton.Left);
   */
  public isJustUp(button: MouseButton): boolean {
    return this._state.get(button) === KeyState.JustUp;
  }

  /**
   * @method setCursor - Set the cursor image.
   * @param {string} image - The image to use for the cursor.
   * @param {Point | number} offset - The offset of the cursor.
   * @returns {Mouse}
   * @public
   * @example
   * ServiceContainer.Mouse.setCursor('cursor.png', new Point(0, 0));
   * @example
   * ServiceContainer.Mouse.setCursor('cursor.png', 0);
   */
  public setCursor(image: string, offset: Point | number): Mouse {
    const cursorImage = AssetStore.instance.getImage(image);
    if (!cursorImage) throw new Error('Cursor image not found.');

    const parentNode = GameCanvas.instance.canvas.parentNode as HTMLElement;
    const node = parentNode || GameCanvas.instance.canvas;

    if (typeof offset === 'number') offset = new Point(offset, offset);

    node.style.cursor = `url(${cursorImage.src}) ${offset.x} ${offset.y}, default`;
    return this;
  }

  /**
   * @method _onMouseDown - Handle the mouse down event.
   * @param {MouseEvent} event - The mouse event.
   * @returns {void}
   * @private
   */
  private _onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    const button: MouseButton = event.button;
    this._tempState.set(button, 'down');
    if (!this._state.has(button)) this._state.set(button, KeyState.Up);
  }

  /**
   * @method _onMouseUp - Handle the mouse up event.
   * @param {MouseEvent} event - The mouse event.
   * @returns {void}
   * @private
   */
  private _onMouseUp(event: MouseEvent): void {
    event.preventDefault();
    const button: MouseButton = event.button;
    this._tempState.set(button, 'up');
  }

  /**
   * @method _onMouseMove - Handle the mouse move event.
   * @param {MouseEvent} event - The mouse event.
   * @returns {void}
   * @private
   */
  private _onMouseMove(event: MouseEvent): void {
    const canvasPosition = GameCanvas.instance.position;
    const scale = GameCanvas.instance.scale;
    const x = (event.clientX - canvasPosition.x) / scale;
    const y = (event.clientY - canvasPosition.y) / scale;
    this._position = new Point(x, y);
  }

  /**
   * @method _onContextMenu - Handle the context menu event.
   * @param {MouseEvent} event - The mouse event.
   * @returns {void}
   * @private
   */
  private _onContextMenu(event: MouseEvent): void {
    event.preventDefault();
  }

  /**
   * @method _update - Update the mouse state.
   * @param {number} deltaTime - The time since the last update.
   * @returns {void}
   * @private
   */
  private _update(deltaTime: number): void {
    const oldState = this._state;
    this._state.forEach((state, key) => {
      if (!oldState.has(key)) oldState.set(key, KeyState.Up);
      if (oldState.get(key)?.includes('up') && state === KeyState.Down)
        this._state.set(key, KeyState.JustDown);
      else if (oldState.get(key)?.includes('down') && state === KeyState.Up)
        this._state.set(key, KeyState.JustUp);
      else this._state.set(key, state as KeyState);
    });
  }
}
