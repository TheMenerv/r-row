import { Sprite } from './Sprite';
import { SpriteSheetAnimation } from './SpriteSheetAnimation';
import { Point } from '../primitives/Point';
import { GameLoop } from '../GameLoop';

/**
 * @class SpriteSheet - A sprite sheet.
 * @extends {Sprite}
 * @public
 */
export class SpriteSheet extends Sprite {
  private _animations: Map<string, SpriteSheetAnimation>;
  private _currentAnimation?: SpriteSheetAnimation;
  private _currentFrame: number;
  private _timerAnimation: number;
  private _frameSize: Point;
  private _isAnimationEnded: boolean;

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
    this._currentFrame = 0;
    this._timerAnimation = 0;
    this._frameSize = frameSize;
    this._isAnimationEnded = false;

    GameLoop.instance.subscribeToUpdate(this._update.bind(this));
  }

  /**
   * @get currentAnimation - The current animation.
   * @returns {SpriteSheetAnimation | undefined} - The current animation.
   * @public
   * @example
   * const spriteSheet = new SpriteSheet('myImage', new Point(32, 32));
   * spriteSheet.addAnimation('walk', new SpriteSheetAnimation([0, 1, 2, 3], 0.1));
   * spriteSheet.playAnimation('walk');
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
   * spriteSheet.playAnimation('walk');
   * if (spriteSheet.currentAnimationName === 'walk') {
   *   // Do something
   * }
   */
  public get currentAnimationName(): string | undefined {
    this._animations.forEach((animation, name) => {
      if (animation === this._currentAnimation) return name;
    });
    return undefined;
  }

  /**
   * @get isAnimationEnded - Whether the animation has ended.
   * @returns {boolean} - Whether the animation has ended.
   * @public
   * @example
   * const spriteSheet = new SpriteSheet('myImage', new Point(32, 32));
   * spriteSheet.addAnimation('walk', new SpriteSheetAnimation([0, 1, 2, 3], 0.1));
   * spriteSheet.playAnimation('walk');
   * if (spriteSheet.isAnimationEnded) {
   *   // Do something
   * }
   */
  public get isAnimationEnded(): boolean {
    return this._isAnimationEnded;
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
   * @method playAnimation - Plays an animation.
   * @param {string} name - The name of the animation.
   * @returns {SpriteSheet} - The sprite sheet.
   * @public
   * @example
   * const spriteSheet = new SpriteSheet('myImage', new Point(32, 32));
   * spriteSheet.addAnimation('walk', new SpriteSheetAnimation([0, 1, 2, 3], 0.1));
   * spriteSheet.playAnimation('walk');
   */
  public playAnimation(name: string): SpriteSheet {
    if (!this._animations.has(name))
      throw new Error(`Animation with name ${name} does not exist`);
    this._currentAnimation = this._animations.get(name);
    this._currentFrame = 0;
    this._timerAnimation = 0;
    this._isAnimationEnded = false;
    return this;
  }

  /**
   * @method draw - Draws the sprite sheet.
   * @param {CanvasRenderingContext2D} context - The context to draw on.
   * @public
   * @example
   * const spriteSheet = new SpriteSheet('myImage', new Point(32, 32));
   * spriteSheet.addAnimation('walk', new SpriteSheetAnimation([0, 1, 2, 3], 0.1));
   * spriteSheet.playAnimation('walk');
   * spriteSheet.draw(context);
   */
  public draw(context: CanvasRenderingContext2D): void {
    if (!this._currentAnimation) return;

    context.save();

    const frame = this._currentAnimation.frames[this._currentFrame];
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

  /**
   * @method cleanBeforeDestroy - Cleans the sprite sheet before destroying it.
   * @public
   * @example
   * const spriteSheet = new SpriteSheet('myImage', new Point(32, 32));;
   * spriteSheet.cleanBeforeDestroy();
   */
  public cleanBeforeDestroy(): void {
    GameLoop.instance.unsubscribeFromUpdate(this._update.bind(this));
  }

  /**
   * @method _update - Updates the sprite sheet.
   * @param {number} deltaTime - The time since the last update.
   * @returns {void}
   * @private
   */
  private _update(deltaTime: number): void {
    if (!this._currentAnimation) return;

    this._timerAnimation += deltaTime;
    if (this._timerAnimation >= this._currentAnimation.speed) {
      this._timerAnimation = 0;
      this._currentFrame++;
      if (this._currentFrame >= this._currentAnimation.frames.length) {
        if (this._currentAnimation.loop) {
          this._currentFrame = 0;
        } else {
          this._currentFrame = this._currentAnimation.frames.length - 1;
          this._isAnimationEnded = true;
        }
      }
    }
  }
}
