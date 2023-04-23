/**
 * @interface CircleOptions - The options for a circle
 * @implements {Drawable}
 * @param {string} fillColor - The fill color of the circle
 * @param {number} weight - The weight of the circle
 * @param {string} strokeColor - The stroke color of the circle
 * @public
 */
export interface CircleOptions {
  fillColor?: string;
  weight?: number;
  strokeColor?: string;
}
