import { GameCanvas } from './GameCanvas';
import { GameLoop } from './GameLoop';
import { SceneManager } from './SceneManager';
import { AssetStore } from './assets/AssetStore';
import { Keyboard } from './inputs/Keyboard';
import { Mouse } from './inputs/Mouse';
import { Touch } from './inputs/Touch';

/**
 * @class ServiceContainer - A container for all the services.
 * @public
 */
export class ServiceContainer {
  /**
   * @get AssetStore - The AssetStore service instance.
   * @returns {AssetStore} The instance of the AssetStore class.
   * @public
   * @example
   * ServiceContainer.AssetStore;
   */
  public static AssetStore: AssetStore = AssetStore.instance;

  /**
   * @get GameCanvas - The GameCanvas service instance.
   * @returns {GameCanvas} The instance of the GameCanvas class.
   * @public
   * @example
   * ServiceContainer.GameCanvas;
   */
  public static GameCanvas: GameCanvas = GameCanvas.instance;

  /**
   * @get GameLoop - The GameLoop service instance.
   * @returns {GameLoop} The instance of the GameLoop class.
   * @public
   * @example
   * ServiceContainer.GameLoop;
   */
  public static GameLoop: GameLoop = GameLoop.instance;

  /**
   * @get Keyboard - The Keyboard service instance.
   * @returns {Keyboard} The instance of the Keyboard class.
   * @public
   * @example
   * ServiceContainer.Keyboard;
   */
  public static Keyboard: Keyboard = Keyboard.instance;

  /**
   * @get Mouse - The Mouse service instance.
   * @returns {Mouse} The instance of the Mouse class.
   * @public
   * @example
   * ServiceContainer.Mouse;
   */
  public static Mouse: Mouse = Mouse.instance;

  /**
   * @get SceneManager - The SceneManager service instance.
   * @returns {SceneManager} The instance of the SceneManager class.
   * @public
   * @example
   * ServiceContainer.SceneManager;
   */
  public static SceneManager: SceneManager = SceneManager.instance;

  /**
   * @get Touch - The Touch service instance.
   * @returns {Touch} The instance of the Touch class.
   * @public
   * @example
   * ServiceContainer.Touch;
   */
  public static Touch: Touch = Touch.instance;
}
