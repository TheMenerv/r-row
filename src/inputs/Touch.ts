import { Point } from '../primitives/Point';
import { TouchState } from '../enums/TouchState';
import { GameCanvas } from '../GameCanvas';
import { GameLoop } from '../GameLoop';

/**
 * @class Touch - The Touch class is used to handle touch events.
 * @public
 */
export class Touch {
  private static _instance: Touch;
  private _position: Point;
  private _state?: TouchState;
  private _tempState?: TouchState;
  private _oldState?: TouchState;
  private _clickTimer: number;
  private _clickDelay: number;
  private _isDown: boolean;
  private _isUp: boolean;
  private _isClicked: boolean;

  /**
   * @constructor
   * @private
   */
  private constructor() {
    this._position = new Point(0, 0);
    this._clickTimer = 0;
    this._clickDelay = 0.3;
    this._isDown = false;
    this._isUp = true;
    this._isClicked = false;

    const canvas = GameCanvas.instance.canvas;
    canvas.addEventListener('touchstart', this._onTouchStart.bind(this), {
      passive: true,
    });
    canvas.addEventListener('touchend', this._onTouchEnd.bind(this), {
      passive: true,
    });
    canvas.addEventListener('touchmove', this._onTouchMove.bind(this), {
      passive: true,
    });
    canvas.addEventListener('touchcancel', this._onTouchCancel.bind(this), {
      passive: true,
    });

    GameLoop.instance.subscribeToUpdate(this._update.bind(this));
  }

  /**
   * @get instance - The instance of the Touch class.
   * @returns {Touch} The instance of the Touch class.
   * @public
   * @example
   * Touch.instance;
   */
  public static get instance(): Touch {
    if (!Touch._instance) Touch._instance = new Touch();
    return Touch._instance;
  }

  /**
   * @get position - The position of the touch.
   * @returns {Point} The position of the touch.
   * @public
   * @example
   * ServiceContainer.Touch.position;
   */
  public get position(): Point {
    return this._position;
  }

  /**
   * @get isStarted - Returns true if the touch has started.
   * @returns {boolean} Returns true if the touch has started.
   * @public
   * @example
   * ServiceContainer.Touch.isStarted;
   */
  public get isStarted(): boolean {
    return this._state === TouchState.Started;
  }

  /**
   * @get isMoved - Returns true if the touch has moved.
   * @returns {boolean} Returns true if the touch has moved.
   * @public
   * @example
   * ServiceContainer.Touch.isMoved;
   */
  public get isMoved(): boolean {
    return this._state === TouchState.Moved;
  }

  /**
   * @get isEnded - Returns true if the touch has ended.
   * @returns {boolean} Returns true if the touch has ended.
   * @public
   * @example
   * ServiceContainer.Touch.isEnded;
   */
  public get isEnded(): boolean {
    return this._state === TouchState.Ended;
  }

  /**
   * @get isCancelled - Returns true if the touch has been cancelled.
   * @returns {boolean} Returns true if the touch has been cancelled.
   * @public
   * @example
   * ServiceContainer.Touch.isCancelled;
   */
  public get isCancelled(): boolean {
    return this._state === TouchState.Cancelled;
  }

  /**
   * @get isDown - Returns true if the touch is down.
   * @returns {boolean} Returns true if the touch is down.
   * @public
   * @example
   * ServiceContainer.Touch.isDown;
   */
  public get isDown(): boolean {
    return this._isDown;
  }

  /**
   * @get isUp - Returns true if the touch is up.
   * @returns {boolean} Returns true if the touch is up.
   * @public
   * @example
   * ServiceContainer.Touch.isUp;
   */
  public get isUp(): boolean {
    return this._isUp;
  }

  /**
   * @get isClicked - Returns true if the touch is clicked.
   * @returns {boolean} Returns true if the touch is clicked.
   * @public
   * @example
   * ServiceContainer.Touch.isClicked;
   */
  public get isClicked(): boolean {
    return this._isClicked;
  }

  /**
   * @method setClickDelay - Sets the click delay.
   * @param {number} delay - The click delay.
   * @returns {vois}
   * @public
   * @example
   * ServiceContainer.Touch.setClickDelay(0.5);
   */
  public setClickDelay(delay: number): void {
    this._clickDelay = delay;
  }

  /**
   * @get isTouchScreen - Returns true if the device is a touch screen.
   * @returns {boolean} Returns true if the device is a touch screen.
   * @public
   * @example
   * ServiceContainer.Touch.isTouchScreen;
   */
  public get isTouchScreen(): boolean {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  /**
   * @method _onTouchStart - The touch start event handler.
   * @param {TouchEvent} event - The touch event.
   * @returns {void}
   * @private
   */
  private _onTouchStart(event: TouchEvent): void {
    event.preventDefault();
    this._tempState = TouchState.Started;
    this._updatePositionFromTouchEvent(event);
    this._isDown = true;
    this._isUp = false;
  }

  /**
   * @method _onTouchEnd - The touch end event handler.
   * @param {TouchEvent} event - The touch event.
   * @returns {void}
   * @private
   */
  private _onTouchEnd(event: TouchEvent): void {
    event.preventDefault();
    this._tempState = TouchState.Ended;
    this._isDown = false;
    this._isUp = true;
  }

  /**
   * @method _onTouchMove - The touch move event handler.
   * @param {TouchEvent} event - The touch event.
   * @returns {void}
   * @private
   */
  private _onTouchMove(event: TouchEvent): void {
    event.preventDefault();
    this._tempState = TouchState.Moved;
    this._updatePositionFromTouchEvent(event);
    this._isDown = true;
    this._isUp = false;
  }

  /**
   * @method _onTouchCancel - The touch cancel event handler.
   * @param {TouchEvent} event - The touch event.
   * @returns {void}
   * @private
   */
  private _onTouchCancel(event: TouchEvent): void {
    event.preventDefault();
    this._tempState = TouchState.Cancelled;
    this._isDown = false;
    this._isUp = true;
  }

  /**
   * @method _updatePositionFromTouchEvent - Updates the position from a touch event.
   * @param {TouchEvent} event - The touch event.
   * @returns {void}
   * @private
   */
  private _updatePositionFromTouchEvent(event: TouchEvent): void {
    const gameCanvas = GameCanvas.instance;
    const CanvasPosition = gameCanvas.position;
    const baseSize = gameCanvas.baseSize;
    const scale = gameCanvas.scale;
    const changedTouch = event.changedTouches[0];
    let x = (changedTouch.pageX - CanvasPosition.x) / scale;
    if (x < 0) x = 0;
    else if (x > baseSize.x) x = baseSize.x;
    let y = (changedTouch.pageY - CanvasPosition.y) / scale;
    if (y < 0) y = 0;
    else if (y > baseSize.y) y = baseSize.y;
    this._position = new Point(x, y);
  }

  /**
   * @method _update - Updates the touch.
   * @param {number} deltaTime - The time since the last update.
   * @returns {void}
   * @private
   */
  private _update(deltaTime: number): void {
    if (!this.isTouchScreen) return;
    this._isClicked = false;
    this._clickTimer += deltaTime;
    if (
      this._tempState === TouchState.Started &&
      this._oldState === TouchState.Started
    )
      this._clickTimer = 0;
    if (this._tempState === TouchState.Ended) this._state = this._tempState;
    else if (this._state === this._tempState) {
      this._state = undefined;
      this._tempState = undefined;
    } else {
      if (this._clickTimer <= this._clickDelay) this._isClicked = true;
      this._state = TouchState.Ended;
    }
    this._oldState = this._state;
  }
}
