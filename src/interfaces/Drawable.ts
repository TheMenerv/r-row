/**
 * @interface Drawable - Drawable interface
 * @method draw - Draw method
 * @public
 */
export interface Drawable {
  draw(ctx: CanvasRenderingContext2D): void;
}
