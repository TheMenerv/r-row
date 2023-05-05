import { Point } from '../primitives/Point';
import { AssetStore } from './AssetStore';

/**
 * @class TileSet - A class for drawing tiles from a tileset image.
 * @public
 */
export class TileSet {
  private _image: HTMLImageElement;
  private _position: Point;
  private _size: Point;
  private _scale: Point;
  private _frameSize: Point;
  private _cachedTiles: Map<string, HTMLCanvasElement>;

  /**
   * @constructor - Creates a new tile set.
   * @param {string} imageName - The name of the image to use.
   * @param {Point} frameSize - The size of a single frame.
   * @param {Point} [scale=new Point(1, 1)] - The scale of the tile.
   * @public
   * @example
   * const tileSet = new TileSet('myImage', new Point(32, 32));
   * @example
   * const tileSet = new TileSet('myImage', new Point(32, 32), new Point(2, 2));
   */
  public constructor(
    imageName: string,
    frameSize: Point,
    scale: Point = new Point(1, 1)
  ) {
    this._image = AssetStore.instance.getImage(imageName);
    if (!this._image) throw new Error(`Image ${imageName} not found.`);

    this._position = new Point(-99999, -99999);
    this._size = new Point(this._image.width, this._image.height);
    this._scale = scale;
    this._frameSize = frameSize;

    this._cachedTiles = new Map<string, HTMLCanvasElement>();
  }

  /**
   * @method drawTile - Draws a tile from the tile set.
   * @param {CanvasRenderingContext2D} context - The context to draw to.
   * @param {number} TileId - The id of the tile to draw.
   * @param {Point} position - The position to draw the tile at.
   * @param {boolean} [useCache=true] - Whether or not to use the cache.
   * @returns {void}
   * @public
   * @example
   * const tileSet = new TileSet('myImage', new Point(32, 32));
   * tileSet.drawTile(context, 0, new Point(0, 0));
   */
  public drawTile(
    context: CanvasRenderingContext2D,
    TileId: number,
    position: Point,
    useCache?: boolean
  ): void {
    const cacheKey = `${this._image.src}-${TileId}`;
    const cachedTile = this._cachedTiles.get(cacheKey);
    if (useCache && cachedTile) {
      context.drawImage(cachedTile, position.x, position.y);
      return;
    }

    const sx =
      (TileId % (this._size.x / this._frameSize.x)) * this._frameSize.x;
    const sy =
      Math.floor(TileId / (this._size.x / this._frameSize.x)) *
      this._frameSize.y;

    if (useCache) {
      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = this._frameSize.x * this._scale.x;
      offscreenCanvas.height = this._frameSize.y * this._scale.y;
      const offscreenCtx = offscreenCanvas.getContext('2d');

      offscreenCtx?.drawImage(
        this._image,
        sx,
        sy,
        this._frameSize.x,
        this._frameSize.y,
        0,
        0,
        this._frameSize.x * this._scale.x,
        this._frameSize.y * this._scale.y
      );

      this._cachedTiles.set(cacheKey, offscreenCanvas);
      context.drawImage(offscreenCanvas, position.x, position.y);
      return;
    }

    context.drawImage(
      this._image,
      sx,
      sy,
      this._frameSize.x,
      this._frameSize.y,
      position.x,
      position.y,
      this._frameSize.x * this._scale.x,
      this._frameSize.y * this._scale.y
    );
  }
}
