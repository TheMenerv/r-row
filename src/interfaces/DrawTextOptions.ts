/**
 * @interface DrawTextOptions - Draw text options interface
 * @property color - Text color
 * @property align - Text align
 * @property fontName - Font name
 * @property fontSize - Font size (css format)
 * @property strokeColor - Stroke color
 * @property strokeSize - Stroke size
 * @public
 */
export interface DrawTextOptions {
  color?: string;
  align?: 'right' | 'center' | 'left';
  fontName?: string;
  fontSize?: string;
  strokeColor?: string;
  strokeSize?: number;
}
