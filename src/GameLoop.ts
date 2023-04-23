import { SceneManager } from './SceneManager';
import { GameCanvas } from './GameCanvas';
import { UpdateFunction } from './types/UpdateFunction';

/**
 * @class GameLoop - Singleton class that handles the game loop.
 * @public
 */
export class GameLoop {
  private static _instance: GameLoop;
  private _deltaTime: number;
  private _lastTime: number;
  private _updateSubscribers: UpdateFunction[];

  /**
   * @constructor
   * @private
   */
  private constructor() {
    this._deltaTime = 0;
    this._lastTime = 0;
    this._updateSubscribers = [];
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
    currentScene?.draw(gameCanvas.context);

    requestAnimationFrame(this._loop.bind(this));
  }
}
