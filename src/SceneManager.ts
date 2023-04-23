import { Scene } from './interfaces/Scene';
import { ScenesContainer } from './types/ScenesContainer';

/**
 * @class SceneManager - Singleton class that manages scenes.
 * @public
 */
export class SceneManager {
  private static _instance: SceneManager;
  private _currentScene: Scene | undefined;
  private _scenesContainer: ScenesContainer;

  /**
   * @constructor
   * @private
   */
  private constructor() {
    this._scenesContainer = new Map<string, Scene>();
  }

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
   * @param {string} name - The name of the scene to set.
   * @param {any} [data] - The data to pass to the scene.
   * @returns {SceneManager}
   * @public
   * @example
   * ServiceContainer.setScene('game');
   */
  public setScene(name: string, data?: any): SceneManager {
    const newScene = this._scenesContainer.get(name);
    if (!newScene) throw new Error(`Scene ${name} does not exist.`);
    if (this._currentScene) this._currentScene.unload();
    this._currentScene = newScene;
    this._currentScene.load(data);
    return this;
  }

  /**
   * @method addScenes - Adds scenes to the scene manager.
   * @param {ScenesContainer} scenes - The scenes to add.
   * @returns {SceneManager}
   * @public
   * @example
   * ServiceContainer.SceneManager.addScenes({
   *   game: new GameScene(),
   *   menu: new MenuScene(),
   * });
   */
  public addScenes(scenes: ScenesContainer): SceneManager {
    scenes.forEach((scene, name) => this._addScene(name, scene));
    return this;
  }

  /**
   * @method _addScene - Adds a scene to the scene manager.
   * @param {string} name - The name of the scene to add.
   * @param {Scene} scene - The scene to add.
   * @returns {void}
   * @private
   * @example
   * const sceneManager = SceneManager.instance;
   * sceneManager._addScene('game', new GameScene());
   */
  private _addScene(name: string, scene: Scene): void {
    if (this._scenesContainer.has(name))
      throw new Error(`Scene ${name} already exists.`);
    this._scenesContainer.set(name, scene);
  }
}
