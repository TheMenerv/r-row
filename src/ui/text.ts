import { DrawTextOptions } from '../interfaces/DrawTextOptions';
import { Point } from '../primitives/Point';

/**
 * @function drawText - Draw text on the canvas
 * @param {CanvasRenderingContext2D} context - The canvas context
 * @param {string} text - The text to draw
 * @param {Point} position - The position of the text
 * @param {DrawTextOptions} [options] - The options for drawing the text
 */
export function drawText(
  context: CanvasRenderingContext2D,
  text: string,
  position: Point,
  options?: DrawTextOptions
) {
  const DEFAULT_OPTIONS = {
    fillColor: '#000',
    align: 'left',
    fontName: 'Arial',
    fontSize: '8px',
    strokeColor: '#000',
    strokeSize: 0,
  };

  let fillColor = DEFAULT_OPTIONS.fillColor;
  let align = DEFAULT_OPTIONS.align;
  let fontName = DEFAULT_OPTIONS.fontName;
  let fontSize = DEFAULT_OPTIONS.fontSize;
  let strokeColor = DEFAULT_OPTIONS.strokeColor;
  let strokeSize = DEFAULT_OPTIONS.strokeSize;

  if (options) {
    fillColor = options.fillColor ? options.fillColor : fillColor;
    align = options.align ? options.align : align;
    fontName = options.fontName ? options.fontName : fontName;
    fontSize = options.fontSize ? options.fontSize : fontSize;
    strokeColor = options.strokeColor ? options.strokeColor : strokeColor;
    strokeSize = options.strokeSize ? options.strokeSize : strokeSize;
  }

  context.save();

  context.fillStyle = fillColor;
  context.font = `${fontSize} ${fontName}`;
  context.strokeStyle = strokeColor;
  context.lineWidth = strokeSize;
  context.textAlign = align as CanvasTextAlign;

  if (options)
    if (options.strokeSize || options.strokeColor)
      context.strokeText(text, position.x, position.y);

  context.fillText(text, position.x, position.y);

  context.restore();
}
