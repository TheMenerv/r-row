import { Updatable } from '../interfaces/Updatable';
import { Rectangle } from '../primitives/Rectangle';
import { Mouse } from '../inputs/Mouse';
import { Touch } from '../inputs/Touch';
import { MouseButton } from '../enums/MouseButton';
import { ClickableState } from '../enums/ClickableState';

/**
 * @class Clickable - A class that represents a clickable area.
 * @implements Updatable
 * @public
 */
export class Clickable implements Updatable {
  protected _area: Rectangle;
  protected _state: ClickableState;

  /**
   * @constructor
   * @param {Rectangle} area - The clickable area.
   * @param {boolean} [disabled=false] - Whether the clickable is disabled.
   * @public
   * @example
   * const clickable = new Clickable(new Rectangle(0, 0, 100, 100));
   */
  constructor(area: Rectangle, disabled: boolean = false) {
    this._area = area;
    this._state = disabled ? ClickableState.Disabled : ClickableState.Released;
  }

  /**
   * @get area - The clickable area.
   * @returns {Rectangle}
   * @public
   * @example
   * const clickable = new Clickable(new Rectangle(0, 0, 100, 100));
   * const area = clickable.area;
   */
  public get area(): Rectangle {
    return this._area;
  }

  /**
   * @get isDisabled - Whether the clickable is disabled.
   * @returns {boolean}
   * @public
   * @example
   * const clickable = new Clickable(new Rectangle(0, 0, 100, 100));
   * const isDisabled = clickable.isDisabled;
   */
  public get isDisabled(): boolean {
    return this._state === ClickableState.Disabled;
  }

  /**
   * @get isClicked - Whether the clickable is clicked.
   * @returns {boolean}
   * @public
   * @example
   * const clickable = new Clickable(new Rectangle(0, 0, 100, 100));
   * const isClicked = clickable.isClicked;
   */
  public get isClicked(): boolean {
    return this._state === ClickableState.Clicked;
  }

  /**
   * @get isPressed - Whether the clickable is pressed.
   * @returns {boolean}
   * @public
   * @example
   * const clickable = new Clickable(new Rectangle(0, 0, 100, 100));
   * const isPressed = clickable.isPressed;
   */
  public get isPressed(): boolean {
    return this._state === ClickableState.Pressed;
  }

  /**
   * @get isHovered - Whether the clickable is hovered.
   * @returns {boolean}
   * @public
   * @example
   * const clickable = new Clickable(new Rectangle(0, 0, 100, 100));
   * const isHovered = clickable.isHovered;
   */
  public get isHovered(): boolean {
    return (
      this._state === ClickableState.Hovered ||
      this._state === ClickableState.Pressed ||
      this._state === ClickableState.Clicked
    );
  }

  /**
   * @get isReleased - Whether the clickable is released.
   * @returns {boolean}
   * @public
   * @example
   * const clickable = new Clickable(new Rectangle(0, 0, 100, 100));
   * const isReleased = clickable.isReleased;
   */
  public get isReleased(): boolean {
    return this._state === ClickableState.Released;
  }

  /**
   * @method disable - Disables the clickable.
   * @param {boolean} [disabled=true] - Whether the clickable is disabled.
   * @returns {void}
   * @public
   * @example
   * const clickable = new Clickable(new Rectangle(0, 0, 100, 100));
   * clickable.disable();
   */
  public disable(disabled: boolean = true): void {
    this._state = disabled ? ClickableState.Disabled : ClickableState.Released;
  }

  /**
   * @method enable - Enables the clickable.
   * @param {boolean} [enabled=true] - Whether the clickable is enabled.
   * @returns {void}
   * @public
   * @example
   * const clickable = new Clickable(new Rectangle(0, 0, 100, 100));
   * clickable.enable();
   */
  public enable(enabled: boolean = true): void {
    this.disable(!enabled);
  }

  /**
   * @method update - Updates the clickable state.
   * @param {number} deltaTime - The time since the last update.
   * @public
   * @example
   * const clickable = new Clickable(new Rectangle(0, 0, 100, 100));
   * clickable.update(deltaTime);
   */
  public update(deltaTime: number): void {
    if (this._state === ClickableState.Disabled) return;

    const mouse = Mouse.instance;
    const touch = Touch.instance;

    const isUserClicking = mouse.isJustUp(MouseButton.Left) || touch.isClicked;
    const isUserHovering =
      this._area.isContainsPoint(mouse.position) ||
      this._area.isContainsPoint(touch.position);
    const isUserPressing = mouse.isDown(MouseButton.Left) || touch.isDown;

    if (isUserClicking && isUserHovering) this._state = ClickableState.Clicked;
    else if (isUserPressing && isUserHovering)
      this._state = ClickableState.Pressed;
    else if (isUserHovering) this._state = ClickableState.Hovered;
    else this._state = ClickableState.Released;
  }
}
