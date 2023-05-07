import { Drawable } from '../interfaces/Drawable';
import { PointOptions } from '../interfaces/PointOptions';
import { Circle } from './Circle';
import { Line } from './Line';
import { Rectangle } from './Rectangle';

/**
 * @class Point - A point in 2D space
 * @implements {IDrawable}
 * @public
 */
export class Point implements Drawable {
  /**
   * @constructor
   * @param {number} x - The x coordinate
   * @param {number} y - The y coordinate
   * @param {PointOptions} [options={}] - The options for the point
   * @public
   * @example
   * const point = new Point(10, 10);
   * @example
   * const point = new Point(10, 10, { color: 'red', weight: 2 });
   */
  public constructor(
    public x: number,
    public y: number,
    private options: PointOptions = {}
  ) {}

  /**
   * @method setOptions - Set the options of the point
   * @param {PointOptions} options - The options to set
   * @returns {Point} - The point with the new options
   * @public
   * @example
   * const point = new Point(10, 10);
   * point.setOptions({ color: 'red', weight: 2 });
   */
  public setOptions(options: PointOptions): Point {
    this.options = options;
    return this;
  }

  /**
   * @method fromArray - Create a point from an array
   * @param {number[]} arr - The array to create the point from
   * @returns {Point} The point created from the array
   * @static
   * @public
   * @example
   * const point = Point.fromArray([10, 10]);
   */
  public static fromArray(arr: [number, number]): Point {
    return new Point(arr[0], arr[1]);
  }

  /**
   * @method toArray - Convert a point to an array
   * @returns {number[]} The array created from the point
   * @public
   * @example
   * const point = new Point(10, 10);
   * const arr = point.toArray();
   */
  public toArray(): number[] {
    return [this.x, this.y];
  }

  /**
   * @method add - Addition with another point
   * @param {Point} point - The point to add
   * @returns {Point}- The result of the addition
   * @public
   * @example
   * const point1 = new Point(10, 10);
   * const point2 = new Point(10, 10);
   * const result = point1.add(point2);
   */
  public add(point: Point): Point {
    return new Point(this.x + point.x, this.y + point.y);
  }

  /**
   * @method subtract - Subtraction with another point
   * @param {Point} point - The point to subtract
   * @returns {Point} The result of the subtraction
   * @public
   * @example
   * const point1 = new Point(10, 10);
   * const point2 = new Point(10, 10);
   * const result = point1.subtract(point2);
   */
  public subtract(point: Point): Point {
    return new Point(this.x - point.x, this.y - point.y);
  }

  /**
   * @method multiply - Multiplication with another point
   * @param {Point} point - The point to multiply
   * @returns {Point} The result of the multiplication
   * @public
   * @example
   * const point1 = new Point(10, 10);
   * const point2 = new Point(10, 10);
   * const result = point1.multiply(point2);
   */
  public multiply(point: Point): Point {
    return new Point(this.x * point.x, this.y * point.y);
  }

  /**
   * @method divide - Division with another point
   * @param {Point} point - The point to divide
   * @returns {Point} The result of the division
   * @public
   * @example
   * const point1 = new Point(10, 10);
   * const point2 = new Point(10, 10);
   * const result = point1.divide(point2);
   */
  public divide(point: Point): Point {
    return new Point(this.x / point.x, this.y / point.y);
  }

  /**
   * @method equals - Check if the point is equal to another point
   * @param {Point} point - The point to check
   * @returns {boolean} Whether the points are equal
   * @public
   * @example
   * const point1 = new Point(10, 10);
   * const point2 = new Point(10, 10);
   * const result = point1.equals(point2);
   */
  public equals(point: Point): boolean {
    return this.x === point.x && this.y === point.y;
  }

  /**
   * @method getDistanceWithPoint - Get the distance between two points
   * @param {Point} point - The point to calculate the distance to
   * @returns {number} - The distance between the two points
   * @public
   * @example
   * const point1 = new Point(10, 10);
   * const point2 = new Point(20, 20);
   * const result = point1.getDistanceWithPoint(point2);
   */
  public getDistanceWithPoint(point: Point): number {
    return Math.sqrt(
      Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2)
    );
  }

  /**
   * @method isOnLine - Check if the point is on a line
   * @param {Line} line - The line to check
   * @param {number} [tolerance=0.1] - The tolerance of the check
   * @returns {boolean} - Whether the point is on the line
   * @public
   * @example
   * const point = new Point(10, 10);
   * const line = new Line(new Point(0, 0), new Point(20, 20));
   * const result = point.isOnLine(line);
   */
  public isOnLine(line: Line, tolerance: number = 0.1): boolean {
    return line.isContainsPoint(this, tolerance);
  }

  /**
   * @method isOnRectangle - Check if the point is on a rectangle
   * @param {Rectangle} rectangle - The rectangle to check
   * @returns {boolean} - Whether the point is on the rectangle
   * @public
   * @example
   * const point = new Point(10, 10);
   * const rectangle = new Rectangle(new Point(0, 0), new Point(20, 20));
   * const result = point.isOnRectangle(rectangle);
   */
  public isOnRectangle(rectangle: Rectangle): boolean {
    const topLine = rectangle.topLine;
    const rightLine = rectangle.rightLine;
    const bottomLine = rectangle.bottomLine;
    const leftLine = rectangle.leftLine;
    return (
      this.isOnLine(topLine) ||
      this.isOnLine(rightLine) ||
      this.isOnLine(bottomLine) ||
      this.isOnLine(leftLine)
    );
  }

  /**
   * @method isInRectangle - Check if the point is in a rectangle
   * @param {Rectangle} rectangle - The rectangle to check
   * @returns {boolean} - Whether the point is in the rectangle
   * @public
   * @example
   * const point = new Point(10, 10);
   * const rectangle = new Rectangle(new Point(0, 0), new Point(20, 20));
   * const result = point.isInRectangle(rectangle);
   */
  public isInRectangle(rectangle: Rectangle): boolean {
    return (
      this.x >= rectangle.top &&
      this.x <= rectangle.bottom &&
      this.y >= rectangle.left &&
      this.y <= rectangle.right
    );
  }

  /**
   * @method isOnCircle - Check if the point is on a circle
   * @param {Circle} circle - The circle to check
   * @param {number} [tolerance=0.1] - The tolerance of the check
   * @returns {boolean} - Whether the point is on the circle
   * @public
   * @example
   * const point = new Point(10, 10);
   * const circle = new Circle(new Point(0, 0), 10);
   * const result = point.isOnCircle(circle);
   */
  public isOnCircle(circle: Circle, tolerance: number = 0.1): boolean {
    const distance = this.getDistanceWithPoint(circle.position);
    return Math.abs(distance - circle.radius) <= tolerance;
  }

  /**
   * @method isInCircle - Check if the point is in a circle
   * @param {Circle} circle - The circle to check
   * @param {number} [tolerance=0.1] - The tolerance of the check
   * @returns {boolean} - Whether the point is in the circle
   * @public
   * @example
   * const point = new Point(10, 10);
   * const circle = new Circle(new Point(0, 0), 10);
   * const result = point.isInCircle(circle);
   */
  public isInCircle(circle: Circle, tolerance: number = 0.1): boolean {
    const distance = this.getDistanceWithPoint(circle.position);
    return distance <= circle.radius + tolerance;
  }

  /**
   * @method clone - Create a copy of the point
   * @returns {Point} The copy of the point
   * @public
   * @example
   * const point = new Point(10, 10);
   * const copy = point.clone();
   */
  public clone(): Point {
    return new Point(this.x, this.y, this.options);
  }

  /**
   * @method draw - Draw the point on the canvas
   * @param {CanvasRenderingContext2D} ctx - The canvas context
   * @returns {void}
   * @public
   * @example
   * const point = new Point(10, 10);
   * point.draw(ctx);
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    if (this.options.color) ctx.fillStyle = this.options.color;
    const radius = this.options.weight || 4;
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }
}
