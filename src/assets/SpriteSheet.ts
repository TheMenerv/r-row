import { Sprite } from './Sprite';
import { SpriteSheetAnimation } from './SpriteSheetAnimation';
import { Point } from '../primitives/Point';

/**
 * @class SpriteSheet - A sprite sheet.
 * @extends {Sprite}
 * @public
 */
export class SpriteSheet extends Sprite {
  private _animations: Map<string, SpriteSheetAnimation>;
  private _currentAnimation?: SpriteSheetAnimation;
  private _currentAnimationName?: string;
  private _frameSize: Point;

  /**
   * @constructor - Creates a new sprite sheet.
   * @param {string} imageName - The name of the image to use.
   * @param {Point} frameSize - The size of a single frame.
   * @public
   * @example
   * const spriteSheet = new SpriteSheet('myImage', new Point(32, 32));
   * spriteSheet.addAnimation('walk', new SpriteSheetAnimation([0, 1, 2, 3], 0.1));
   */
  public constructor(imageName: string, frameSize: Point) {
    super(imageName);
    this._animations = new Map<string, SpriteSheetAnimation>();
    this._frameSize = frameSize;
  }

  /**
   * @get currentAnimation - The current animation.
   * @returns {SpriteSheetAnimation | undefined} - The current animation.
   * @public
   * @example
   * const spriteSheet = new SpriteSheet('myImage', new Point(32, 32));
   * spriteSheet.addAnimation('walk', new SpriteSheetAnimation([0, 1, 2, 3], 0.1));
   * spriteSheet.setAnimation('walk');
   * console.log(spriteSheet.currentAnimation);
   */
  public get currentAnimation(): SpriteSheetAnimation | undefined {
    return this._currentAnimation;
  }

  /**
   * @get currentAnimationName - The name of the current animation.
   * @returns {string | undefined} - The name of the current animation.
   * @public
   * @example
   * const spriteSheet = new SpriteSheet('myImage', new Point(32, 32));
   * spriteSheet.addAnimation('walk', new SpriteSheetAnimation([0, 1, 2, 3], 0.1));
   * spriteSheet.setAnimation('walk');
   * if (spriteSheet.currentAnimationName === 'walk') {
   *   // Do something
   * }
   */
  public get currentAnimationName(): string | undefined {
    return this._currentAnimationName;
  }

  /**
   * @get currentAnimationFrame - The current frame of the animation.
   * @returns {number} - The current frame of the animation.
   * @public
   * @example
   * const spriteSheet = new SpriteSheet('myImage', new Point(32, 32));
   * spriteSheet.addAnimation('walk', new SpriteSheetAnimation([0, 1, 2, 3], 0.1));
   * spriteSheet.setAnimation('walk');
   * console.log(spriteSheet.currentAnimationFrame);
   */
  public get currentAnimationFrame(): number {
    return this._currentAnimation?.currentFrame ?? 0;
  }

  /**
   * @get isAnimationEnded - Whether the animation has ended.
   * @returns {boolean} - Whether the animation has ended.
   * @public
   * @example
   * const spriteSheet = new SpriteSheet('myImage', new Point(32, 32));
   * spriteSheet.addAnimation('walk', new SpriteSheetAnimation([0, 1, 2, 3], 0.1));
   * spriteSheet.setAnimation('walk');
   * if (spriteSheet.isAnimationEnded) {
   *   // Do something
   * }
   */
  public get isAnimationEnded(): boolean {
    return this._currentAnimation?.isEnded ?? false;
  }

  /**
   * @method addAnimation - Adds an animation to the sprite sheet.
   * @param {string} name - The name of the animation.
   * @param {SpriteSheetAnimation} animation - The animation to add.
   * @returns {SpriteSheet} - The sprite sheet.
   * @public
   * @example
   * const spriteSheet = new SpriteSheet('myImage', new Point(32, 32));
   * spriteSheet.addAnimation('walk', new SpriteSheetAnimation([0, 1, 2, 3], 0.1));
   */
  public addAnimation(
    name: string,
    animation: SpriteSheetAnimation
  ): SpriteSheet {
    if (this._animations.has(name))
      throw new Error(`Animation with name ${name} already exists`);
    this._animations.set(name, animation);
    return this;
  }

  /**
   * @method resetAnimation - Resets the animation.
   * @returns {SpriteSheet} - The sprite sheet.
   * @public
   * @example
   * const spriteSheet = new SpriteSheet('myImage', new Point(32, 32));
   * spriteSheet.addAnimation('attack', new SpriteSheetAnimation([0, 1, 2, 3], 0.1));
   * spriteSheet.setAnimation('attack');
   * if (spriteSheet.isAnimationEnded) {
   *   spriteSheet.resetAnimation();
   * }
   */
  public resetAnimation(): SpriteSheet {
    this._currentAnimation?.reset();
    return this;
  }

  /**
   * @method setAnimation - Sets the current animation.
   * @param {string} name - The name of the animation.
   * @param {boolean} [reset=true] - Whether to reset the animation.
   * @returns {SpriteSheet} - The sprite sheet.
   * @public
   * @example
   * const spriteSheet = new SpriteSheet('myImage', new Point(32, 32));
   * spriteSheet.addAnimation('walk', new SpriteSheetAnimation([0, 1, 2, 3], 0.1));
   * spriteSheet.setAnimation('walk');
   */
  public setAnimation(name: string, reset: boolean = true): SpriteSheet {
    if (!this._animations.has(name))
      throw new Error(`Animation with name ${name} does not exist`);
    this._currentAnimation = this._animations.get(name);
    this._currentAnimationName = name;
    if (reset) this.resetAnimation();
    return this;
  }

  /**
   * @method update - Updates the sprite sheet.
   * @param {number} deltaTime - The time since the last update.
   * @returns {void}
   * @public
   * @example
   * const spriteSheet = new SpriteSheet('myImage', new Point(32, 32));
   * spriteSheet.addAnimation('walk', new SpriteSheetAnimation([0, 1, 2, 3], 0.1));
   * spriteSheet.setAnimation('walk');
   * spriteSheet.update(deltaTime);
   */
  public update(deltaTime: number): void {
    if (!this._currentAnimation) return;
    this._currentAnimation.update(deltaTime);
  }

  /**
   * @method draw - Draws the sprite sheet.
   * @param {CanvasRenderingContext2D} context - The context to draw on.
   * @public
   * @example
   * const spriteSheet = new SpriteSheet('myImage', new Point(32, 32));
   * spriteSheet.addAnimation('walk', new SpriteSheetAnimation([0, 1, 2, 3], 0.1));
   * spriteSheet.setAnimation('walk');
   * spriteSheet.draw(context);
   */
  public draw(context: CanvasRenderingContext2D): void {
    if (!this._currentAnimation) return;

    context.save();

    const frame =
      this._currentAnimation.frames[this._currentAnimation.currentFrame];
    const column = this._image.width / this._frameSize.x;
    const sourceX = (frame % column) * this._frameSize.x;
    const sourceY = Math.floor(frame / column) * this._frameSize.y;

    context.translate(this._position.x, this._position.y);
    context.scale(this._scale.x, this._scale.y);
    context.translate(-this._frameSize.x / 2, -this._frameSize.y / 2);

    if (this._isVerticalFlipped) {
      context.translate(this._frameSize.x, 0);
      context.scale(-this._scale.x, this._scale.y);
    }

    if (this._isHorizontalFlipped) {
      context.translate(0, this._frameSize.y);
      context.scale(this._scale.x, -this._scale.y);
    }

    context.drawImage(
      this._image,
      sourceX,
      sourceY,
      this._frameSize.x,
      this._frameSize.y,
      0,
      0,
      this._frameSize.x,
      this._frameSize.y
    );

    context.restore();
  }
}
