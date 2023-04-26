import { GameCanvas } from './GameCanvas';
import { GameLoop } from './GameLoop';
import { SceneManager } from './SceneManager';
import { CanvasOptions } from './interfaces/CanvasOptions';
import { ScenesContainer } from './types/ScenesContainer';
import { Keyboard } from './inputs/Keyboard';
import { Mouse } from './inputs/Mouse';
import { Touch } from './inputs/Touch';

/**
 * @class Game - The main game class.
 * @public
 */
export class Game {
  /**
   * @constructor
   * @public
   */
  constructor() {
    const logo = `    Powered by
        ██████╗       ██████╗  ██████╗ ██╗    ██╗  █╗
        ██╔══██╗      ██╔══██╗██╔═══██╗██║    ██║  ██╗
    ███╗██████╔╝█████╗██████╔╝██║   ██║██║ █╗ ██║█████╗
    ╚══╝██╔══██╗╚════╝██╔══██╗██║   ██║██║███╗██║╚═██╔╝
        ██║  ██║      ██║  ██║╚██████╔╝╚███╔███╔╝  █╔╝
        ╚═╝  ╚═╝      ╚═╝  ╚═╝ ╚═════╝  ╚══╝╚══╝   ╚╝
    Developed with ♥️ by Yoan B. (Menerv)
    More info at https://github.com/TheMenerv/r-row`;
    console.log(logo);
  }

  /**
   * @method start - Start the game.
   * @returns {Game} The instance of the Game class.
   * @public
   * @example
   * const game = new Game();
   * game.start();
   */
  public start(): Game {
    GameLoop.instance;
    Keyboard.instance;
    Mouse.instance;
    Touch.instance;
    return this;
  }

  /**
   * @method createCanvas - Create the game canvas.
   * @param {CanvasOptions} [canvasOptions] - The options for the canvas.
   * @returns {Game} The instance of the Game class.
   * @public
   * @example
   * const game = new Game();
   * game.createCanvas({ width: 800, height: 600 });
   */
  public createCanvas(canvasOptions?: CanvasOptions): Game {
    GameCanvas.instance.init(canvasOptions);
    return this;
  }

  /**
   * @method addScenesAndSelect - Add scenes to the scene manager and select a scene.
   * @param {ScenesContainer} scenes - The scenes to add.
   * @param {string} sceneName - The name of the scene to select.
   * @returns {Game} The instance of the Game class.
   * @public
   * @example
   * const game = new Game();
   * game.addScenesAndSelect({ scene1: new Scene1(), scene2: new Scene2() }, 'scene1');
   */
  public addScenesAndSelect(scenes: ScenesContainer, sceneName: string): Game {
    SceneManager.instance.addScenes(scenes).setScene(sceneName);
    return this;
  }
}
