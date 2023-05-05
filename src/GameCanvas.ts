import { Point } from './primitives/Point';
import { CanvasOptions } from './interfaces/CanvasOptions';

const DEFAULT_CANVAS_SIZE = new Point(800, 600);

/**
 * @class GameCanvas - Singleton class that manages the game canvas.
 * @public
 */
export class GameCanvas {
  private static _instance: GameCanvas;
  private static _isInitialized: boolean = false;
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _baseSize: Point;
  private _scale: number;
  private _imageSmoothingEnabled: boolean;
  private _imageSmoothingQuality: ImageSmoothingQuality;
  private _backgroundColor: string;

  /**
   * @constructor
   * @private
   */
  private constructor() {
    this._baseSize = DEFAULT_CANVAS_SIZE;
    this._scale = 1;
    this._imageSmoothingEnabled = false;
    this._imageSmoothingQuality = 'high';
    this._backgroundColor = '#000000';

    this._canvas = document.createElement('canvas');
    this._context = this._canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  /**
   * @get instance - Returns the instance of the GameCanvas class.
   * @returns {GameCanvas} The instance of the GameCanvas class.
   * @static
   * @public
   * @example
   * const gameCanvas = GameCanvas.instance;
   */
  public static get instance(): GameCanvas {
    if (!GameCanvas._instance) GameCanvas._instance = new GameCanvas();
    return GameCanvas._instance;
  }

  /**
   * @method init - Initialize the canvas.
   * @param {CanvasOptions} [options] - The options to set the canvas.
   * @returns {GameCanvas} The instance of the GameCanvas class.
   * @public
   * @example
   * ServiceContainer.GameCanvas.init();
   * @example
   * ServiceContainer.GameCanvas.init({ width: 800, height: 600, parent: document.body, imageSmoothingEnabled: true, backgroundColor: '#000' });
   */
  public init(options?: CanvasOptions): GameCanvas {
    const DEFAULT_CANVAS_PARENT = document.body;
    const DEFAULT_IMAGE_SMOOTHING_ENABLED = false;
    const DEFAULT_IMAGE_SMOOTHING_QUALITY = 'high';
    const DEFAULT_BACKGROUND_COLOR = '#000000';

    this._scale = 1;
    this._canvas.tabIndex = 0;

    this._baseSize = options
      ? options.size || DEFAULT_CANVAS_SIZE
      : DEFAULT_CANVAS_SIZE;

    this._imageSmoothingEnabled = options
      ? options.imageSmoothingEnabled || DEFAULT_IMAGE_SMOOTHING_ENABLED
      : DEFAULT_IMAGE_SMOOTHING_ENABLED;

    this._imageSmoothingQuality = options
      ? options.imageSmoothingQuality || DEFAULT_IMAGE_SMOOTHING_QUALITY
      : DEFAULT_IMAGE_SMOOTHING_QUALITY;

    this._backgroundColor = options
      ? options.backgroundColor || DEFAULT_BACKGROUND_COLOR
      : DEFAULT_BACKGROUND_COLOR;

    const parent = options
      ? options.parent || DEFAULT_CANVAS_PARENT
      : DEFAULT_CANVAS_PARENT;

    parent.appendChild(this._canvas);
    window.addEventListener('resize', () => this._resize());
    window.addEventListener('orientationchange', () => this._resize());

    GameCanvas._isInitialized = true;

    this._resize();
    this._canvas.focus();

    return GameCanvas._instance;
  }

  /**
   * @get canvas - Returns the canvas element.
   * @returns {HTMLCanvasElement} The canvas element.
   * @public
   * @example
   * ServiceContainer.GameCanvas.canvas;
   */
  public get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  /**
   * @get context - Returns the canvas context.
   * @returns {CanvasRenderingContext2D} The canvas context.
   * @public
   * @example
   * ServiceContainer.GameCanvas.context;
   */
  public get context(): CanvasRenderingContext2D {
    return this._context;
  }

  /**
   * @get baseSize - Returns the base size of the canvas.
   * @returns {Point} The base size of the canvas.
   * @public
   * @example
   * ServiceContainer.GameCanvas.baseSize;
   */
  public get baseSize(): Point {
    return this._baseSize;
  }

  /**
   * @get scale - Returns the scale of the canvas.
   * @returns {number} The scale of the canvas.
   * @public
   * @example
   * ServiceContainer.GameCanvas.scale;
   */
  public get scale(): number {
    return this._scale;
  }

  /**
   * @get position - Returns the position of the canvas.
   * @returns {Point} The position of the canvas.
   * @public
   * @example
   * ServiceContainer.GameCanvas.position;
   */
  public get position(): Point {
    const rect = this._canvas.getBoundingClientRect();
    return new Point(rect.left, rect.top);
  }

  /**
   * @method fullscreen - Sets the canvas to fullscreen.
   * @returns {GameCanvas} The instance of the GameCanvas class.
   * @public
   * @example
   * ServiceContainer.GameCanvas.fullscreen();
   */
  public fullscreen(): GameCanvas {
    if (!GameCanvas._isInitialized)
      throw new Error('GameCanvas not initialized. Call init().');
    this._canvas.requestFullscreen();
    return this;
  }

  /**
   * @method exitFullscreen - Exits fullscreen mode.
   * @returns {GameCanvas} The instance of the GameCanvas class.
   * @public
   * @example
   * ServiceContainer.GameCanvas.exitFullscreen();
   */
  public exitFullscreen(): GameCanvas {
    if (!GameCanvas._isInitialized)
      throw new Error('GameCanvas not initialized. Call init().');
    document.exitFullscreen();
    return this;
  }

  /**
   * @method toggleFullscreen - Toggles fullscreen mode.
   * @returns {GameCanvas} The instance of the GameCanvas class.
   * @public
   * @example
   * ServiceContainer.GameCanvas.toggleFullscreen();
   */
  public toggleFullscreen(): GameCanvas {
    if (!GameCanvas._isInitialized)
      throw new Error('GameCanvas not initialized. Call init().');
    if (document.fullscreenElement) {
      this.exitFullscreen();
    } else {
      this.fullscreen();
    }
    return this;
  }

  /**
   * @method clearScreen - Clears the canvas.
   * @returns {GameCanvas} The instance of the GameCanvas class.
   * @public
   * @example
   * ServiceContainer.GameCanvas.clearScreen();
   */
  public clearScreen(): GameCanvas {
    if (!GameCanvas._isInitialized)
      throw new Error('GameCanvas not initialized. Call init().');
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    return this;
  }

  /**
   * @method _resize - Resizes the canvas.
   * @returns {GameCanvas} The instance of the GameCanvas class.
   * @private
   * @example
   * const gameCanvas = GameCanvas.instance;
   * gameCanvas._resize();
   */
  private _resize(): GameCanvas {
    if (!GameCanvas._isInitialized)
      throw new Error('GameCanvas not initialized. Call init().');
    const windowSize = new Point(window.innerWidth, window.innerHeight);
    const ratio = this._baseSize.x / this._baseSize.y;
    this._scale = this._getScale(windowSize, ratio);
    const size = this._baseSize.multiply(new Point(this._scale, this._scale));
    this._canvas.width = size.x;
    this._canvas.height = size.y;
    this._context.scale(this._scale, this._scale);
    this._context.imageSmoothingEnabled = this._imageSmoothingEnabled;
    this._context.imageSmoothingQuality = this._imageSmoothingQuality;
    this._context.fillStyle = this._backgroundColor;
    return this;
  }

  /**
   * @method _getScale - Returns the scale of the canvas.
   * @param {Point} windowSize - The size of the window.
   * @param {number} ratio - The ratio of the canvas.
   * @returns {number} The scale of the canvas.
   * @private
   * @example
   * const gameCanvas = GameCanvas.instance;
   * const windowSize = new Point(window.innerWidth, window.innerHeight);
   * const ratio = gameCanvas._baseSize.x / gameCanvas._baseSize.y;
   * const scale = gameCanvas._getScale(windowSize, ratio);
   */
  private _getScale(windowSize: Point, ratio: number): number {
    if (!GameCanvas._isInitialized)
      throw new Error('GameCanvas not initialized. Call init().');
    if (windowSize.x / windowSize.y > ratio) {
      return windowSize.y / this._baseSize.y;
    }
    return windowSize.x / this._baseSize.x;
  }
}
