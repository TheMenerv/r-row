import { Point } from '../primitives/Point';
import { AssetStore } from './AssetStore';
import { Drawable } from '../interfaces/Drawable';

/**
 * @class Sprite - Represents a drawable image.
 * @implements {Drawable}
 * @public
 */
export class Sprite implements Drawable {
  protected _image: HTMLImageElement;
  protected _position: Point;
  protected _size: Point;
  protected _scale: Point;
  protected _isVerticalFlipped: boolean;
  protected _isHorizontalFlipped: boolean;

  /**
   * @constructor
   * @param {string} name - The name of the image to use.
   * @public
   * @example
   * const sprite = new Sprite('myImage');
   */
  public constructor(name: string) {
    const image = AssetStore.instance.images.get(name);
    if (!image) throw new Error(`Image ${name} does not exist.`);

    this._image = image;
    this._position = new Point(-9999, -9999);
    this._size = new Point(image.width, image.height);
    this._scale = new Point(1, 1);
    this._isVerticalFlipped = false;
    this._isHorizontalFlipped = false;
  }

  /**
   * @get position - The position of the sprite.
   * @returns {Point} - The position of the sprite.
   * @public
   * @example
   * const sprite = new Sprite('myImage');
   * console.log(sprite.position);
   */
  public get position(): Point {
    return this._position;
  }

  /**
   * @set position - The position of the sprite.
   * @param {Point} value - The position of the sprite.
   * @public
   * @example
   * const sprite = new Sprite('myImage');
   * sprite.position = new Point(100, 100);
   */
  public set position(value: Point) {
    this._position = value;
  }

  /**
   * @get size - The size of the sprite.
   * @returns {Point} - The size of the sprite.
   * @public
   * @example
   * const sprite = new Sprite('myImage');
   * console.log(sprite.size);
   */
  public get size(): Point {
    return this._size;
  }

  /**
   * @set size - The size of the sprite.
   * @param {Point} value - The size of the sprite.
   * @public
   * @example
   * const sprite = new Sprite('myImage');
   * sprite.size = new Point(100, 100);
   */
  public set size(value: Point) {
    this._size = value;
  }

  /**
   * @get scale - The scale of the sprite.
   * @returns {Point} - The scale of the sprite.
   * @public
   * @example
   * const sprite = new Sprite('myImage');
   * console.log(sprite.scale);
   */
  public get scale(): Point {
    return this._scale;
  }

  /**
   * @set scale - The scale of the sprite.
   * @param {Point} value - The scale of the sprite.
   * @public
   * @example
   * const sprite = new Sprite('myImage');
   * sprite.scale = new Point(2, 2);
   */
  public set scale(value: Point) {
    this._scale = value;
  }

  /**
   * @get isVerticalFlipped - Whether the sprite is vertically flipped.
   * @returns {boolean} - Whether the sprite is vertically flipped.
   * @public
   * @example
   * const sprite = new Sprite('myImage');
   * console.log(sprite.isVerticalFlipped);
   */
  public get isVerticalFlipped(): boolean {
    return this._isVerticalFlipped;
  }

  /**
   * @set isVerticalFlipped - Whether the sprite is vertically flipped.
   * @param {boolean} value - Whether the sprite is vertically flipped.
   * @public
   * @example
   * const sprite = new Sprite('myImage');
   * sprite.isVerticalFlipped = true;
   */
  public set isVerticalFlipped(value: boolean) {
    this._isVerticalFlipped = value;
  }

  /**
   * @get isHorizontalFlipped - Whether the sprite is horizontally flipped.
   * @returns {boolean} - Whether the sprite is horizontally flipped.
   * @public
   * @example
   * const sprite = new Sprite('myImage');
   * console.log(sprite.isHorizontalFlipped);
   */
  public get isHorizontalFlipped(): boolean {
    return this._isHorizontalFlipped;
  }

  /**
   * @set isHorizontalFlipped - Whether the sprite is horizontally flipped.
   * @param {boolean} value - Whether the sprite is horizontally flipped.
   * @public
   * @example
   * const sprite = new Sprite('myImage');
   * sprite.isHorizontalFlipped = true;
   */
  public set isHorizontalFlipped(value: boolean) {
    this._isHorizontalFlipped = value;
  }

  /**
   * @get size - The size of the sprite.
   * @returns {Point} - The size of the sprite.
   * @public
   * @example
   * const sprite = new Sprite('myImage');
   * sprite.size = new Point(100, 100);
   */
  public draw(context: CanvasRenderingContext2D): void {
    context.save();

    context.translate(this._position.x, this._position.y);
    context.scale(this._scale.x, this._scale.y);
    context.translate(-this._size.x / 2, -this._size.y / 2);

    if (this._isVerticalFlipped) {
      context.translate(this._size.x, 0);
      context.scale(-this._scale.x, this._scale.y);
    }

    if (this._isHorizontalFlipped) {
      context.translate(0, this._size.y);
      context.scale(this._scale.x, -this._scale.y);
    }

    context.drawImage(this._image, 0, 0, this._size.x, this._size.y);

    context.restore();
  }
}
