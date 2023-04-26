import { SceneManager } from './SceneManager';
import { GameCanvas } from './GameCanvas';
import { UpdateFunction } from './types/UpdateFunction';
import { DrawFunction } from './types/DrawFunction';

/**
 * @class GameLoop - Singleton class that handles the game loop.
 * @public
 */
export class GameLoop {
  private static _instance: GameLoop;
  private _deltaTime: number;
  private _lastTime: number;
  private _updateSubscribers: UpdateFunction[];
  private _preRenderSubscribers: DrawFunction[];
  private _postRenderSubscribers: DrawFunction[];

  /**
   * @constructor
   * @private
   */
  private constructor() {
    this._deltaTime = 0;
    this._lastTime = 0;
    this._updateSubscribers = [];
    this._preRenderSubscribers = [];
    this._postRenderSubscribers = [];
    requestAnimationFrame(this._loop.bind(this));
  }

  /**
   * @get instance - The instance of the GameLoop class.
   * @returns {GameLoop} The instance of the GameLoop class.
   * @static
   * @public
   * @example
   * const gameLoop = GameLoop.instance;
   */
  public static get instance(): GameLoop {
    if (!GameLoop._instance) {
      GameLoop._instance = new GameLoop();
    }
    return GameLoop._instance;
  }

  /**
   * @method get FPS - Returns the current FPS.
   * @returns {number} The current FPS.
   * @public
   * @example
   * ServiceContainer.GameLoop.FPS;
   */
  public get FPS(): number {
    return Math.round(1000 / this._deltaTime);
  }

  /**
   * @method subscribeToUpdate - Subscribes a function to the update loop.
   * @param {UpdateFunction} subscriber - The function to subscribe.
   * @returns {GameLoop} The instance of the GameLoop class.
   * @public
   * @example
   * ServiceContainer.GameLoop.subscribeToUpdate((deltaTime) => {
   *   console.log(`deltaTime: ${deltaTime}`);
   * });
   */
  public subscribeToUpdate(subscriber: UpdateFunction): GameLoop {
    this._updateSubscribers.push(subscriber);
    return this;
  }

  /**
   * @method unsubscribeFromUpdate - Unsubscribes a function from the update loop.
   * @param {UpdateFunction} subscriber - The function to unsubscribe.
   * @returns {GameLoop} The instance of the GameLoop class.
   * @public
   * @example
   * const updateFunction = (deltaTime) => {
   *   console.log(`deltaTime: ${deltaTime}`);
   * };
   * const gameLoop = ServiceContainer.GameLoop;
   * gameLoop.subscribeToUpdate(updateFunction);
   * gameLoop.unsubscribeFromUpdate(updateFunction);
   */
  public unsubscribeFromUpdate(subscriber: UpdateFunction): GameLoop {
    const index = this._updateSubscribers.indexOf(subscriber);
    if (index > -1) {
      this._updateSubscribers.splice(index, 1);
    }
    return this;
  }

  /**
   * @method subscribeToPreRender - Subscribes a function to the pre-render loop.
   * @param {DrawFunction} subscriber - The function to subscribe.
   * @returns {GameLoop} The instance of the GameLoop class.
   * @public
   * @example
   * ServiceContainer.GameLoop.subscribeToPreRender((ctx) => {
   *   ctx.fillStyle = 'red';
   *   ctx.fillRect(0, 0, 100, 100);
   * });
   */
  public subscribeToPreRender(subscriber: DrawFunction): GameLoop {
    this._preRenderSubscribers.push(subscriber);
    return this;
  }

  /**
   * @method unsubscribeFromPreRender - Unsubscribes a function from the pre-render loop.
   * @param {DrawFunction} subscriber - The function to unsubscribe.
   * @returns {GameLoop} The instance of the GameLoop class.
   * @public
   * @example
   * const preRenderFunction = (ctx) => {
   *   ctx.fillStyle = 'red';
   *   ctx.fillRect(0, 0, 100, 100);
   * };
   * const gameLoop = ServiceContainer.GameLoop;
   * gameLoop.subscribeToPreRender(preRenderFunction);
   * gameLoop.unsubscribeFromPreRender(preRenderFunction);
   */
  public unsubscribeFromPreRender(subscriber: DrawFunction): GameLoop {
    const index = this._preRenderSubscribers.indexOf(subscriber);
    if (index > -1) {
      this._preRenderSubscribers.splice(index, 1);
    }
    return this;
  }

  /**
   * @method subscribeToPostRender - Subscribes a function to the post-render loop.
   * @param {DrawFunction} subscriber - The function to subscribe.
   * @returns {GameLoop} The instance of the GameLoop class.
   * @public
   * @example
   * ServiceContainer.GameLoop.subscribeToPostRender((ctx) => {
   *   ctx.fillStyle = 'red';
   *   ctx.fillRect(0, 0, 100, 100);
   * });
   */
  public subscribeToPostRender(subscriber: DrawFunction): GameLoop {
    this._postRenderSubscribers.push(subscriber);
    return this;
  }

  /**
   * @method unsubscribeFromPostRender - Unsubscribes a function from the post-render loop.
   * @param {DrawFunction} subscriber - The function to unsubscribe.
   * @returns {GameLoop} The instance of the GameLoop class.
   * @public
   * @example
   * const postRenderFunction = (ctx) => {
   *   ctx.fillStyle = 'red';
   *   ctx.fillRect(0, 0, 100, 100);
   * };
   * const gameLoop = ServiceContainer.GameLoop;
   * gameLoop.subscribeToPostRender(postRenderFunction);
   * gameLoop.unsubscribeFromPostRender(postRenderFunction);
   */
  public unsubscribeFromPostRender(subscriber: DrawFunction): GameLoop {
    const index = this._postRenderSubscribers.indexOf(subscriber);
    if (index > -1) {
      this._postRenderSubscribers.splice(index, 1);
    }
    return this;
  }

  /**
   * @method _loop - The game loop.
   * @param {number} time - The current time.
   * @returns {void}
   * @private
   */
  private _loop(time: number): void {
    this._deltaTime = time - this._lastTime;
    this._lastTime = time;

    const { currentScene } = SceneManager.instance;
    const gameCanvas = GameCanvas.instance;
    this._updateSubscribers.forEach((subscriber) =>
      subscriber(this._deltaTime)
    );
    currentScene?.update(this._deltaTime);
    gameCanvas.clearScreen();
    this._preRenderSubscribers.forEach((subscriber) =>
      subscriber(gameCanvas.context)
    );
    currentScene?.draw(gameCanvas.context);
    this._postRenderSubscribers.forEach((subscriber) =>
      subscriber(gameCanvas.context)
    );

    requestAnimationFrame(this._loop.bind(this));
  }
}
