import { NineSliceMode } from '../enums/NineSliceMode';
import { Rectangle } from '../primitives/Rectangle';
import { AssetStore } from '../assets/AssetStore';
import { Point } from '../primitives/Point';

/**
 * @class NineSlice - A class for drawing nine-slice images
 * @public
 */
export class NineSlice {
  private _area: Rectangle;
  private _leftLimit: number;
  private _rightLimit: number;
  private _topLimit: number;
  private _bottomLimit: number;
  private _image: HTMLImageElement;
  private _scale: Point;
  private _mode: NineSliceMode;

  /**
   * @constructor
   * @param {Rectangle} area - The area to draw the nine-slice image
   * @param {number} leftLimit - The left limit of the nine-slice image
   * @param {number} rightLimit - The right limit of the nine-slice image
   * @param {number} topLimit - The top limit of the nine-slice image
   * @param {number} bottomLimit - The bottom limit of the nine-slice image
   * @param {string} imageName - The name of the image to draw
   * @param {NineSliceMode} [mode=NineSliceMode.Stretch] - The mode to draw the nine-slice image
   * @param {Point} [scale=new Point(1, 1)] - The scale of the nine-slice image
   * @public
   * @example
   * const nineSlice = new NineSlice(
   *   new Rectangle(new Point(0, 0), new Point(100, 100)),
   *   10,
   *   10,
   *   10,
   *   10,
   *   'myImage',
   *   NineSliceMode.Stretch,
   *   new Point(1, 1)
   * );
   * @example
   * const nineSlice = new NineSlice(
   *   new Rectangle(new Point(0, 0), new Point(100, 100)),
   *   10,
   *   10,
   *   10,
   *   10,
   *   'myImage',
   * );
   */
  constructor(
    area: Rectangle,
    leftLimit: number,
    rightLimit: number,
    topLimit: number,
    bottomLimit: number,
    imageName: string,
    mode: NineSliceMode = NineSliceMode.Stretch,
    scale: Point = new Point(1, 1)
  ) {
    this._area = area;
    this._leftLimit = leftLimit;
    this._rightLimit = rightLimit;
    this._topLimit = topLimit;
    this._bottomLimit = bottomLimit;
    this._image = AssetStore.instance.getImage(imageName);
    this._mode = mode;
    this._scale = scale;
  }

  /**
   * @get area - The area to draw the nine-slice image
   * @returns {Rectangle}
   * @public
   * @example
   * const nineSlice = new NineSlice(...);
   * const area = nineSlice.area;
   */
  public get area(): Rectangle {
    return this._area;
  }

  /**
   * @set area - The area to draw the nine-slice image
   * @param {Rectangle} area - The area to draw the nine-slice image
   * @public
   * @example
   * const nineSlice = new NineSlice(...);
   * nineSlice.area = new Rectangle(...);
   */
  public set area(area: Rectangle) {
    this._area = area;
  }

  /**
   * @method draw - Draws the nine-slice image
   * @param {CanvasRenderingContext2D} context - The context to draw to
   * @returns {void}
   * @public
   * @example
   * nineSlice.draw(context);
   */
  public draw(context: CanvasRenderingContext2D): void {
    if (this._mode === NineSliceMode.Stretch) {
      this._drawStretch(context);
    } else {
      this._drawRepeat(context);
    }
  }

  /**
   * @method _drawTopLeft - Draws the nine-slice image
   * @param {CanvasRenderingContext2D} context - The context to draw to
   * @returns {void}
   * @private
   */
  private _drawTopLeft(context: CanvasRenderingContext2D): void {
    const iWidth = this._image.width;
    const iHeight = this._image.height;
    const x1 = this._leftLimit;
    const x2 = iWidth - this._rightLimit;
    const y1 = this._topLimit;
    const y2 = iHeight - this._bottomLimit;
    const sx = 0;
    const sy = 0;
    const sWidth = x1;
    const sHeight = y1;
    const dx = this._area.position.x - this._area.size.x / 2;
    const dy = this._area.position.y - this._area.size.y / 2;
    const dWidth = x1 * this._scale.x;
    const dHeight = y1 * this._scale.y;
    context.drawImage(
      this._image,
      sx,
      sy,
      sWidth,
      sHeight,
      dx,
      dy,
      dWidth,
      dHeight
    );
  }

  /**
   * @method _drawTopRight - Draws the nine-slice image
   * @param {CanvasRenderingContext2D} context - The context to draw to
   * @returns {void}
   * @private
   */
  private _drawTopRight(context: CanvasRenderingContext2D): void {
    const iWidth = this._image.width;
    const iHeight = this._image.height;
    const x1 = this._leftLimit;
    const x2 = iWidth - this._rightLimit;
    const y1 = this._topLimit;
    const y2 = iHeight - this._bottomLimit;
    const sx = iWidth - this._rightLimit;
    const sy = 0;
    const sWidth = this._rightLimit;
    const sHeight = y1;
    const dx =
      this._area.position.x +
      this._area.size.x / 2 -
      this._rightLimit * this._scale.x;
    const dy = this._area.position.y - this._area.size.y / 2;
    const dWidth = x1 * this._scale.x;
    const dHeight = y1 * this._scale.y;
    context.drawImage(
      this._image,
      sx,
      sy,
      sWidth,
      sHeight,
      dx,
      dy,
      dWidth,
      dHeight
    );
  }

  /**
   * @method _drawBottomLeft - Draws the nine-slice image
   * @param {CanvasRenderingContext2D} context - The context to draw to
   * @returns {void}
   * @private
   */
  private _drawBottomLeft(context: CanvasRenderingContext2D): void {
    const iWidth = this._image.width;
    const iHeight = this._image.height;
    const x1 = this._leftLimit;
    const x2 = iWidth - this._rightLimit;
    const y1 = this._topLimit;
    const y2 = iHeight - this._bottomLimit;
    const sx = 0;
    const sy = y2;
    const sWidth = x1;
    const sHeight = this._bottomLimit;
    const dx = this._area.position.x - this._area.size.x / 2;
    const dy =
      this._area.position.y +
      this._area.size.y / 2 -
      this._bottomLimit * this._scale.y;
    const dWidth = x1 * this._scale.x;
    const dHeight = this._bottomLimit * this._scale.y;
    context.drawImage(
      this._image,
      sx,
      sy,
      sWidth,
      sHeight,
      dx,
      dy,
      dWidth,
      dHeight
    );
  }

  /**
   * @method _drawBottomRight - Draws the nine-slice image
   * @param {CanvasRenderingContext2D} context - The context to draw to
   * @returns {void}
   * @private
   */
  private _drawBottomRight(context: CanvasRenderingContext2D): void {
    const iWidth = this._image.width;
    const iHeight = this._image.height;
    const x1 = this._leftLimit;
    const x2 = iWidth - this._rightLimit;
    const y1 = this._topLimit;
    const y2 = iHeight - this._bottomLimit;
    const sx = x2;
    const sy = y2;
    const sWidth = this._rightLimit;
    const sHeight = this._bottomLimit;
    const dx =
      this._area.position.x +
      this._area.size.x / 2 -
      this._rightLimit * this._scale.x;
    const dy =
      this._area.position.y +
      this._area.size.y / 2 -
      this._bottomLimit * this._scale.y;
    const dWidth = this._rightLimit * this._scale.x;
    const dHeight = this._bottomLimit * this._scale.y;
    context.drawImage(
      this._image,
      sx,
      sy,
      sWidth,
      sHeight,
      dx,
      dy,
      dWidth,
      dHeight
    );
  }

  /**
   * @method _drawStretch - Draws the nine-slice image in stretch mode
   * @param {CanvasRenderingContext2D} context - The context to draw to
   * @returns {void}
   * @private
   */
  private _drawStretch(context: CanvasRenderingContext2D): void {
    this._drawTopLeft(context);
    this._drawTopCenterStretch(context);
    this._drawTopRight(context);
    this._drawMiddleLeftStretch(context);
    this._drawMiddleCenterStretch(context);
    this._drawMiddleRightStretch(context);
    this._drawBottomLeft(context);
    this._drawBottomCenterStretch(context);
    this._drawBottomRight(context);
  }

  /**
   * @method _drawTopCenterStretch - Draws the nine-slice image in stretch mode
   * @param {CanvasRenderingContext2D} context - The context to draw to
   * @returns {void}
   * @private
   */
  private _drawTopCenterStretch(context: CanvasRenderingContext2D): void {
    const iWidth = this._image.width;
    const iHeight = this._image.height;
    const x1 = this._leftLimit;
    const x2 = iWidth - this._rightLimit;
    const y1 = this._topLimit;
    const y2 = iHeight - this._bottomLimit;
    const w = iWidth - this._leftLimit - this._rightLimit;
    const sx = x1;
    const sy = 0;
    const sWidth = w;
    const sHeight = y1;
    const dx =
      this._area.position.x - this._area.size.x / 2 + x1 * this._scale.x;
    const dy = this._area.position.y - this._area.size.y / 2;
    const dWidth =
      this._area.size.x -
      this._leftLimit * this._scale.x -
      this._rightLimit * this._scale.x;
    const dHeight = y1 * this._scale.y;
    context.drawImage(
      this._image,
      sx,
      sy,
      sWidth,
      sHeight,
      dx,
      dy,
      dWidth,
      dHeight
    );
  }

  /**
   * @method _drawMiddleLeftStretch - Draws the nine-slice image in stretch mode
   * @param {CanvasRenderingContext2D} context - The context to draw to
   * @returns {void}
   * @private
   */
  private _drawMiddleLeftStretch(context: CanvasRenderingContext2D): void {
    const iWidth = this._image.width;
    const iHeight = this._image.height;
    const x1 = this._leftLimit;
    const x2 = iWidth - this._rightLimit;
    const y1 = this._topLimit;
    const y2 = this._bottomLimit;
    const h = iHeight - this._topLimit - this._bottomLimit;
    const sx = 0;
    const sy = y1;
    const sWidth = this._leftLimit;
    const sHeight = h;
    const dx = this._area.position.x - this._area.size.x / 2;
    const dy =
      this._area.position.y -
      this._area.size.y / 2 +
      this._topLimit * this._scale.y;
    const dWidth = x1 * this._scale.x;
    const dHeight =
      this._area.size.y -
      this._topLimit * this._scale.y -
      this._bottomLimit * this._scale.y;
    context.drawImage(
      this._image,
      sx,
      sy,
      sWidth,
      sHeight,
      dx,
      dy,
      dWidth,
      dHeight
    );
  }

  /**
   * @method _drawMiddleCenterStretch - Draws the nine-slice image in stretch mode
   * @param {CanvasRenderingContext2D} context - The context to draw to
   * @returns {void}
   * @private
   */
  private _drawMiddleCenterStretch(context: CanvasRenderingContext2D): void {
    const iWidth = this._image.width;
    const iHeight = this._image.height;
    const x1 = this._leftLimit;
    const x2 = iWidth - this._rightLimit;
    const y1 = this._topLimit;
    const y2 = this._bottomLimit;
    const w = iWidth - this._leftLimit - this._rightLimit;
    const h = iHeight - this._topLimit - this._bottomLimit;
    const sx = x1;
    const sy = y1;
    const sWidth = w;
    const sHeight = h;
    const dx =
      this._area.position.x -
      this._area.size.x / 2 +
      this._leftLimit * this._scale.x;
    const dy =
      this._area.position.y -
      this._area.size.y / 2 +
      this._topLimit * this._scale.y;
    const dWidth =
      this._area.size.x -
      this._leftLimit * this._scale.x -
      this._rightLimit * this._scale.x;
    const dHeight =
      this._area.size.y -
      this._topLimit * this._scale.y -
      this._bottomLimit * this._scale.y;
    context.drawImage(
      this._image,
      sx,
      sy,
      sWidth,
      sHeight,
      dx,
      dy,
      dWidth,
      dHeight
    );
  }

  /**
   * @method _drawMiddleRightStretch - Draws the nine-slice image in stretch mode
   * @param {CanvasRenderingContext2D} context - The context to draw to
   * @returns {void}
   * @private
   */
  private _drawMiddleRightStretch(context: CanvasRenderingContext2D): void {
    const iWidth = this._image.width;
    const iHeight = this._image.height;
    const x1 = this._leftLimit;
    const x2 = iWidth - this._rightLimit;
    const y1 = this._topLimit;
    const y2 = this._bottomLimit;
    const h = iHeight - this._topLimit - this._bottomLimit;
    const sx = x2;
    const sy = y1;
    const sWidth = this._leftLimit;
    const sHeight = h;
    const dx =
      this._area.position.x +
      this._area.size.x / 2 -
      this._rightLimit * this._scale.x;
    const dy =
      this._area.position.y -
      this._area.size.y / 2 +
      this._topLimit * this._scale.y;
    const dWidth = x1 * this._scale.x;
    const dHeight =
      this._area.size.y -
      this._topLimit * this._scale.y -
      this._bottomLimit * this._scale.y;
    context.drawImage(
      this._image,
      sx,
      sy,
      sWidth,
      sHeight,
      dx,
      dy,
      dWidth,
      dHeight
    );
  }

  /**
   * @method _drawBottomCenterStretch - Draws the nine-slice image in stretch mode
   * @param {CanvasRenderingContext2D} context - The context to draw to
   * @returns {void}
   * @private
   */
  private _drawBottomCenterStretch(context: CanvasRenderingContext2D): void {
    const iWidth = this._image.width;
    const iHeight = this._image.height;
    const x1 = this._leftLimit;
    const x2 = iWidth - this._rightLimit;
    const y1 = this._topLimit;
    const y2 = iHeight - this._bottomLimit;
    const w = iWidth - this._leftLimit - this._rightLimit;
    const sx = x1;
    const sy = y2;
    const sWidth = w;
    const sHeight = this._bottomLimit;
    const dx =
      this._area.position.x + x1 * this._scale.x - this._area.size.x / 2;
    const dy =
      this._area.position.y +
      this._area.size.y / 2 -
      this._bottomLimit * this._scale.y;
    const dWidth =
      this._area.size.x -
      this._leftLimit * this._scale.x -
      this._rightLimit * this._scale.x;
    const dHeight = this._bottomLimit * this._scale.y;
    context.drawImage(
      this._image,
      sx,
      sy,
      sWidth,
      sHeight,
      dx,
      dy,
      dWidth,
      dHeight
    );
  }

  /**
   * @method _drawRepeat - Draws the nine-slice image in repeat mode
   * @param {CanvasRenderingContext2D} context - The context to draw to
   * @returns {void}
   * @private
   */
  private _drawRepeat(context: CanvasRenderingContext2D): void {
    this._drawTopLeft(context);
    this._drawTopCenterRepeat(context);
    this._drawTopRight(context);
    this._drawMiddleLeftRepeat(context);
    this._drawMiddleCenterRepeat(context);
    this._drawMiddleRightRepeat(context);
    this._drawBottomLeft(context);
    this._drawBottomCenterRepeat(context);
    this._drawBottomRight(context);
  }

  /**
   * @method _drawTopCenterRepeat - Draws the nine-slice image in repeat mode
   * @param {CanvasRenderingContext2D} context - The context to draw to
   * @returns {void}
   * @private
   */
  private _drawTopCenterRepeat(context: CanvasRenderingContext2D): void {
    const iWidth = this._image.width;
    const iHeight = this._image.height;
    const x1 = this._leftLimit;
    const x2 = iWidth - this._rightLimit;
    const y1 = this._topLimit;
    const y2 = iHeight - this._bottomLimit;
    const w = iWidth - this._leftLimit - this._rightLimit;
    const sx = x1;
    const sy = 0;
    const sWidth = w;
    const sHeight = y1;
    const dx =
      this._area.position.x - this._area.size.x / 2 + x1 * this._scale.x;
    const dy = this._area.position.y - this._area.size.y / 2;
    const dWidth =
      this._area.size.x -
      this._leftLimit * this._scale.x -
      this._rightLimit * this._scale.x;
    const dHeight = y1 * this._scale.y;

    const repeatCount = Math.ceil(dWidth / (sWidth * this._scale.x));
    for (let i = 0; i < repeatCount; i++) {
      const currentDx = dx + i * sWidth * this._scale.x;
      const currentDWidth =
        i === repeatCount - 1
          ? dWidth - i * sWidth * this._scale.x
          : sWidth * this._scale.x;

      const currentSWidth =
        i === repeatCount - 1 ? currentDWidth / this._scale.x : sWidth;

      context.drawImage(
        this._image,
        sx,
        sy,
        currentSWidth,
        sHeight,
        currentDx,
        dy,
        currentDWidth,
        dHeight
      );
    }
  }

  /**
   * @method _drawMiddleLeftRepeat - Draws the nine-slice image in repeat mode
   * @param {CanvasRenderingContext2D} context - The context to draw to
   * @returns {void}
   * @private
   */
  private _drawMiddleLeftRepeat(context: CanvasRenderingContext2D): void {
    const iWidth = this._image.width;
    const iHeight = this._image.height;
    const x1 = this._leftLimit;
    const x2 = iWidth - this._rightLimit;
    const y1 = this._topLimit;
    const y2 = this._bottomLimit;
    const h = iHeight - this._topLimit - this._bottomLimit;
    const sx = 0;
    const sy = y1;
    const sWidth = this._leftLimit;
    const sHeight = h;
    const dx = this._area.position.x - this._area.size.x / 2;
    const dy =
      this._area.position.y -
      this._area.size.y / 2 +
      this._topLimit * this._scale.y;
    const dWidth = x1 * this._scale.x;
    const dHeight =
      this._area.size.y -
      this._topLimit * this._scale.y -
      this._bottomLimit * this._scale.y;

    const repeatCount = Math.ceil(dHeight / (sHeight * this._scale.y));
    for (let i = 0; i < repeatCount; i++) {
      const currentDy = dy + i * sHeight * this._scale.y;
      const currentDHeight =
        i === repeatCount - 1
          ? dHeight - i * sHeight * this._scale.y
          : sHeight * this._scale.y;

      const currentSHeight =
        i === repeatCount - 1 ? currentDHeight / this._scale.y : sHeight;

      context.drawImage(
        this._image,
        sx,
        sy,
        sWidth,
        currentSHeight,
        dx,
        currentDy,
        dWidth,
        currentDHeight
      );
    }
  }

  /**
   * @method _drawMiddleCenterRepeat - Draws the nine-slice image in repeat mode
   * @param {CanvasRenderingContext2D} context - The context to draw to
   * @returns {void}
   * @private
   */
  private _drawMiddleCenterRepeat(context: CanvasRenderingContext2D): void {
    const iWidth = this._image.width;
    const iHeight = this._image.height;
    const x1 = this._leftLimit;
    const x2 = iWidth - this._rightLimit;
    const y1 = this._topLimit;
    const y2 = this._bottomLimit;
    const w = iWidth - this._leftLimit - this._rightLimit;
    const h = iHeight - this._topLimit - this._bottomLimit;
    const sx = x1;
    const sy = y1;
    const sWidth = w;
    const sHeight = h;
    const dx =
      this._area.position.x -
      this._area.size.x / 2 +
      this._leftLimit * this._scale.x;
    const dy =
      this._area.position.y -
      this._area.size.y / 2 +
      this._topLimit * this._scale.y;
    const dWidth =
      this._area.size.x -
      this._leftLimit * this._scale.x -
      this._rightLimit * this._scale.x;
    const dHeight =
      this._area.size.y -
      this._topLimit * this._scale.y -
      this._bottomLimit * this._scale.y;

    const repeatXCount = Math.ceil(dWidth / (sWidth * this._scale.x));
    const repeatYCount = Math.ceil(dHeight / (sHeight * this._scale.y));

    for (let i = 0; i < repeatXCount; i++) {
      for (let j = 0; j < repeatYCount; j++) {
        const currentDx = dx + i * sWidth * this._scale.x;
        const currentDy = dy + j * sHeight * this._scale.y;

        const currentDWidth =
          i === repeatXCount - 1
            ? dWidth - i * sWidth * this._scale.x
            : sWidth * this._scale.x;
        const currentDHeight =
          j === repeatYCount - 1
            ? dHeight - j * sHeight * this._scale.y
            : sHeight * this._scale.y;

        const currentSWidth =
          i === repeatXCount - 1 ? currentDWidth / this._scale.x : sWidth;
        const currentSHeight =
          j === repeatYCount - 1 ? currentDHeight / this._scale.y : sHeight;

        context.drawImage(
          this._image,
          sx,
          sy,
          currentSWidth,
          currentSHeight,
          currentDx,
          currentDy,
          currentDWidth,
          currentDHeight
        );
      }
    }
  }

  /**
   * @method _drawMiddleRightRepeat - Draws the nine-slice image in repeat mode
   * @param {CanvasRenderingContext2D} context - The context to draw to
   * @returns {void}
   * @private
   */
  private _drawMiddleRightRepeat(context: CanvasRenderingContext2D): void {
    const iWidth = this._image.width;
    const iHeight = this._image.height;
    const x1 = this._leftLimit;
    const x2 = iWidth - this._rightLimit;
    const y1 = this._topLimit;
    const y2 = this._bottomLimit;
    const h = iHeight - this._topLimit - this._bottomLimit;
    const sx = x2;
    const sy = y1;
    const sWidth = this._leftLimit;
    const sHeight = h;
    const dx =
      this._area.position.x +
      this._area.size.x / 2 -
      this._rightLimit * this._scale.x;
    const dy =
      this._area.position.y -
      this._area.size.y / 2 +
      this._topLimit * this._scale.y;
    const dWidth = x1 * this._scale.x;
    const dHeight =
      this._area.size.y -
      this._topLimit * this._scale.y -
      this._bottomLimit * this._scale.y;

    const repeatCount = Math.ceil(dHeight / (sHeight * this._scale.y));
    for (let i = 0; i < repeatCount; i++) {
      const currentDy = dy + i * sHeight * this._scale.y;
      const currentDHeight =
        i === repeatCount - 1
          ? dHeight - i * sHeight * this._scale.y
          : sHeight * this._scale.y;

      const currentSHeight =
        i === repeatCount - 1 ? currentDHeight / this._scale.y : sHeight;

      context.drawImage(
        this._image,
        sx,
        sy,
        sWidth,
        currentSHeight,
        dx,
        currentDy,
        dWidth,
        currentDHeight
      );
    }
  }

  /**
   * @method _drawBottomCenterRepeat - Draws the nine-slice image in repeat mode
   * @param {CanvasRenderingContext2D} context - The context to draw to
   * @returns {void}
   * @private
   */
  private _drawBottomCenterRepeat(context: CanvasRenderingContext2D): void {
    const iWidth = this._image.width;
    const iHeight = this._image.height;
    const x1 = this._leftLimit;
    const x2 = iWidth - this._rightLimit;
    const y1 = this._topLimit;
    const y2 = iHeight - this._bottomLimit;
    const w = iWidth - this._leftLimit - this._rightLimit;
    const sx = x1;
    const sy = y2;
    const sWidth = w;
    const sHeight = this._bottomLimit;
    const dx =
      this._area.position.x + x1 * this._scale.x - this._area.size.x / 2;
    const dy =
      this._area.position.y +
      this._area.size.y / 2 -
      this._bottomLimit * this._scale.y;
    const dWidth =
      this._area.size.x -
      this._leftLimit * this._scale.x -
      this._rightLimit * this._scale.x;
    const dHeight = this._bottomLimit * this._scale.y;

    const repeatCount = Math.ceil(dWidth / (sWidth * this._scale.x));
    for (let i = 0; i < repeatCount; i++) {
      const currentDx = dx + i * sWidth * this._scale.x;
      const currentDWidth =
        i === repeatCount - 1
          ? dWidth - i * sWidth * this._scale.x
          : sWidth * this._scale.x;

      const currentSWidth =
        i === repeatCount - 1 ? currentDWidth / this._scale.x : sWidth;

      context.drawImage(
        this._image,
        sx,
        sy,
        currentSWidth,
        sHeight,
        currentDx,
        dy,
        currentDWidth,
        dHeight
      );
    }
  }
}
