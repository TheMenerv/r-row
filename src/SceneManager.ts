import { Scene } from './interfaces/Scene';

/**
 * @class SceneManager - Singleton class that manages scenes.
 * @public
 */
export class SceneManager {
  private static _instance: SceneManager;
  private _currentScene?: Scene;

  /**
   * @constructor
   * @private
   */
  private constructor() {}

  /**
   * @method get instance - Returns the instance of the SceneManager class.
   * @returns {SceneManager} The instance of the SceneManager class.
   * @static
   * @public
   * @example
   * const sceneManager = SceneManager.instance;
   */
  public static get instance(): SceneManager {
    if (!SceneManager._instance) SceneManager._instance = new SceneManager();
    return SceneManager._instance;
  }

  /**
   * @method get currentScene - Returns the current scene.
   * @returns {Scene | undefined} The current scene.
   * @public
   * @example
   * ServiceContainer.SceneManager.currentScene;
   */
  public get currentScene(): Scene | undefined {
    return this._currentScene;
  }

  /**
   * @method setScene - Sets the current scene.
   * @param {Scene} scene - The scene to set.
   * @param {any} [data] - The data to pass to the scene.
   * @returns {SceneManager}
   * @public
   * @example
   * ServiceContainer.setScene(new GameScene());
   * @example
   * ServiceContainer.setScene(new GameScene(), { difficulty: 1 });
   */
  public setScene(scene: Scene, data?: any): SceneManager {
    if (this._currentScene) this._currentScene.unload();
    this._currentScene = scene;
    this._currentScene.load(data);
    return this;
  }
}
