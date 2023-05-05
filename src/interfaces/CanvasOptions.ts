import { Point } from '../primitives/Point';

/**
 * @interface CanvasOptions - Canvas options
 * @property {HTMLElement} parent - Parent element
 * @property {Point} size - Canvas size
 * @property {boolean} [imageSmoothingEnabled] - Enable image smoothing
 * @property {ImageSmoothingQuality} [imageSmoothingQuality] - Image smoothing quality
 * @property {string} [backgroundColor] - Background color
 * @public
 */
export interface CanvasOptions {
  parent?: HTMLElement;
  size?: Point;
  imageSmoothingEnabled?: boolean;
  imageSmoothingQuality?: ImageSmoothingQuality;
  backgroundColor?: string;
}
