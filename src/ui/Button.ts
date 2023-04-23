import { Clickable } from './Clickable';
import { NineSlice } from './NineSlice';
import { Sprite } from '../assets/Sprite';
import { Rectangle } from '../primitives/Rectangle';
import { ButtonOptions } from '../interfaces/ButtonOptions';
import { Drawable } from '../interfaces/Drawable';
import { ClickableState } from '../enums/ClickableState';

/**
 * @class Button - Represents a clickable button.
 * @extends {Clickable}
 * @implements {Drawable}
 * @public
 */
export class Button extends Clickable implements Drawable {
  private _nineSlices: Map<ClickableState, NineSlice> | null;
  private _sprites: Map<ClickableState, Sprite> | null;

  /**
   * @constructor - Creates a new button.
   * @param {Rectangle} area - The clickable area.
   * @param {ButtonOptions} options - The button options.
   * @param {boolean} [disabled=false] - Whether the button is disabled.
   * @public
   * @example
   * const button = new Button(new Rectangle(0, 0, 100, 100), {
   *   nineSlices: new Map([
   *     [ClickableState.Released, new NineSlice(new Rectangle(0, 0, 100, 100), 10, 10, 10, 10)],
   *     ...
   *    ]),
   * });
   */
  constructor(
    area: Rectangle,
    options: ButtonOptions,
    disabled: boolean = false
  ) {
    if (options.nineSlices && options.sprites) {
      throw new Error('Button cannot have both a nine slice and a sprite');
    } else if (!options.nineSlices && !options.sprites) {
      throw new Error('Button must have either a nine slice or a sprite');
    }

    super(area, disabled);

    this._nineSlices = null;
    this._sprites = null;

    if (options.nineSlices) {
      this._initNineSlice(options);
    }

    if (options.sprites) {
      this._initSprite(options);
    }

    return this;
  }

  /**
   * @method update - Updates the button.
   * @param {number} deltaTime - The time since the last update.
   * @returns {void}
   * @public
   * @example
   * button.update(deltaTime);
   */
  public update(deltaTime: number): void {
    super.update(deltaTime);
    if (this.isDisabled) return;
    if (this._nineSlices) {
      const nineSlice = this._nineSlices.get(this._state);
      if (!nineSlice) return;
      nineSlice.area = this.area;
    }
    if (this._sprites) {
      const sprite = this._sprites.get(this._state);
      if (!sprite) return;
      sprite.position = this.area.position;
      this.area.size = sprite.size;
    }
  }

  /**
   * @method draw - Draws the button.
   * @param {CanvasRenderingContext2D} context - The canvas rendering context.
   * @returns {void}
   * @public
   * @example
   * button.draw(context);
   */
  public draw(context: CanvasRenderingContext2D): void {
    if (this._nineSlices) {
      const nineSlice = this._nineSlices.get(this._state);
      nineSlice?.draw(context);
    } else if (this._sprites) {
      const sprite = this._sprites.get(this._state);
      sprite?.draw(context);
    }
  }

  /**
   * @method _initNineSlice - Initializes the nine slice.
   * @param {ButtonOptions} options - The button options.
   * @returns {void}
   * @private
   */
  private _initNineSlice(options: ButtonOptions) {
    if (!options.nineSlices) return;

    this._nineSlices = new Map();
    this._nineSlices.set(
      ClickableState.Released,
      options.nineSlices.get(ClickableState.Released) as NineSlice
    );
    this._nineSlices.set(
      ClickableState.Hovered,
      options.nineSlices.get(ClickableState.Hovered) as NineSlice
    );
    this._nineSlices.set(
      ClickableState.Clicked,
      options.nineSlices.get(ClickableState.Clicked) as NineSlice
    );
    this._nineSlices.set(
      ClickableState.Disabled,
      options.nineSlices.get(ClickableState.Disabled) as NineSlice
    );
  }

  /**
   * @method _initSprite - Initializes the sprite.
   * @param {ButtonOptions} options - The button options.
   * @returns {void}
   * @private
   */
  private _initSprite(options: ButtonOptions) {
    if (!options.sprites) return;

    this._sprites = new Map();
    this._sprites.set(
      ClickableState.Released,
      options.sprites.get(ClickableState.Released) as Sprite
    );
    this._sprites.set(
      ClickableState.Hovered,
      options.sprites.get(ClickableState.Hovered) as Sprite
    );
    this._sprites.set(
      ClickableState.Clicked,
      options.sprites.get(ClickableState.Clicked) as Sprite
    );
    this._sprites.set(
      ClickableState.Disabled,
      options.sprites.get(ClickableState.Disabled) as Sprite
    );
    this._sprites.forEach((sprite) => {
      sprite.position = this.area.position;
    });
  }
}
