/**
 * @class SpriteSheetAnimation - A class that represents a sprite sheet animation.
 * @public
 */
export class SpriteSheetAnimation {
  private _frames: number[];
  private _loop: boolean;
  private _speed: number;
  private _isEnded: boolean;
  private _timer: number;
  private _currentFrame: number;

  /**
   * @constructor - Creates a new sprite sheet animation.
   * @param {number[]} frames - The frames of the animation.
   * @param {number} speed - The speed of the animation.
   * @param {boolean} [loop=true] - Whether or not the animation should loop.
   * @public
   * @example
   * const animation = new SpriteSheetAnimation([0, 1, 2], 1, false);
   * @example
   * const animation = new SpriteSheetAnimation([0, 1, 2], 1);
   */
  constructor(frames: number[], speed: number, loop: boolean = true) {
    this._frames = frames;
    this._loop = loop;
    this._speed = speed;
    this._isEnded = false;
    this._timer = 0;
    this._currentFrame = 0;
  }

  /**
   * @get frames - Gets the frames of the animation.
   * @returns {number[]} The frames of the animation.
   * @public
   * @example
   * const animation = new SpriteSheetAnimation([0, 1, 2], 1);
   * const frames = animation.frames;
   */
  public get frames(): number[] {
    return this._frames;
  }

  /**
   * @get loop - Gets whether or not the animation should loop.
   * @returns {boolean} Whether or not the animation should loop.
   * @public
   * @example
   * const animation = new SpriteSheetAnimation([0, 1, 2], 1);
   * const loop = animation.loop;
   */
  public get loop(): boolean {
    return this._loop;
  }

  /**
   * @get speed - Gets the speed of the animation.
   * @returns {number} The speed of the animation.
   * @public
   * @example
   * const animation = new SpriteSheetAnimation([0, 1, 2], 1);
   * const speed = animation.speed;
   */
  public get speed(): number {
    return this._speed;
  }

  /**
   * @get isEnded - Gets whether or not the animation has ended.
   * @returns {boolean} Whether or not the animation has ended.
   * @public
   * @example
   * const animation = new SpriteSheetAnimation([0, 1, 2], 1);
   * const isEnded = animation.isEnded;
   */
  public get isEnded(): boolean {
    return this._isEnded;
  }

  /**
   * @get currentFrame - Gets the current frame of the animation.
   * @returns {number} The current frame of the animation.
   * @public
   * @example
   * const animation = new SpriteSheetAnimation([0, 1, 2], 1);
   * const currentFrame = animation.currentFrame;
   */
  public get currentFrame(): number {
    return this._currentFrame;
  }

  /**
   * @set currentFrame - Sets the current frame of the animation.
   * @param {number} value - The value to set the current frame to.
   * @returns
   * @public
   * @example
   * const animation = new SpriteSheetAnimation([0, 1, 2], 1);
   * animation.currentFrame = 1;
   */
  public set currentFrame(value: number) {
    this._currentFrame = value;
  }

  /**
   * @method reset - Resets the animation.
   * @returns {void}
   * @public
   * @example
   * const animation = new SpriteSheetAnimation([0, 1, 2], 1);
   * animation.reset();
   */
  public reset(): void {
    this._isEnded = false;
    this._timer = 0;
    this._currentFrame = 0;
  }

  /**
   * @method update - Updates the animation.
   * @param {number} deltaTime - The time since the last frame.
   * @returns {void}
   * @public
   * @example
   * const animation = new SpriteSheetAnimation([0, 1, 2], 1);
   * animation.update(deltaTime);
   */
  public update(deltaTime: number): void {
    this._timer += deltaTime;
    if (this._timer >= 1 / this._speed) {
      this._timer = 0;
      this._currentFrame++;
      if (this._currentFrame >= this._frames.length) {
        if (this._loop) {
          this._currentFrame = 0;
        } else {
          this._currentFrame = this._frames.length - 1;
          this._isEnded = true;
        }
      }
    }
  }
}
