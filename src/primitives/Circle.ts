import { Drawable } from '../interfaces/Drawable';
import { CircleOptions } from '../interfaces/CircleOptions';
import { Line } from './Line';
import { Point } from './Point';
import { Rectangle } from './Rectangle';

/**
 * @class Circle - A circle in 2D space
 * @implements {IDrawable}
 * @public
 */
export class Circle implements Drawable {
  /**
   * @constructor
   * @param {Point} position - The position of the circle
   * @param {number} radius - The radius of the circle
   * @param {CircleOptions} [options={}] - The options for the circle
   * @public
   * @example
   * const circle = new Circle(new Point(10, 10), 10);
   * @example
   * const circle = new Circle(new Point(10, 10), 10, { fillColor: 'red', weight: 2, strokeColor: 'blue' });
   */
  public constructor(
    public position: Point,
    public radius: number,
    public options: CircleOptions = {}
  ) {}

  /**
   * @method setOptions - Set the options of the circle
   * @param {CircleOptions} options - The options to set
   * @returns {Circle} The circle with the new options
   * @public
   * @example
   * const circle = new Circle(new Point(10, 10), 10);
   * circle.setOptions({ fillColor: 'red', weight: 2, strokeColor: 'blue' });
   */
  public setOptions(options: CircleOptions): Circle {
    this.options = options;
    return this;
  }

  /**
   * @method fromArray - Create a circle from an array
   * @param {number[]} array - The array to create the circle from
   * @returns {Circle} The circle created from the array
   * @static
   * @public
   * @example
   * const circle = Circle.fromArray([10, 10, 10]);
   */
  public static fromArray(array: [number, number, number]): Circle {
    return new Circle(new Point(array[0], array[1]), array[2]);
  }

  /**
   * @method toArray - Convert a circle to an array
   * @returns {number[]} The array created from the circle
   * @public
   * @example
   * const circle = new Circle(new Point(10, 10), 10);
   * const array = circle.toArray();
   */
  public toArray(): [number, number, number] {
    return [this.position.x, this.position.y, this.radius];
  }

  /**
   * @method equals - Check if the circle is equal to another circle
   * @param {Circle} circle - The circle to compare with
   * @returns {boolean} Whether the circles are equal
   * @public
   * @example
   * const circle1 = new Circle(new Point(10, 10), 10);
   * const circle2 = new Circle(new Point(10, 10), 10);
   * const circle3 = new Circle(new Point(10, 10), 20);
   * circle1.equals(circle2); // true
   * circle1.equals(circle3); // false
   * circle2.equals(circle3); // false
   */
  public equals(circle: Circle): boolean {
    return (
      this.position.equals(circle.position) && this.radius === circle.radius
    );
  }

  /**
   * @method isContainsPoint - Check if the circle contains a point
   * @param {Point} point - The point to check
   * @returns {boolean} Whether the circle contains the point
   * @public
   * @example
   * const circle = new Circle(new Point(10, 10), 10);
   * circle.isContainsPoint(new Point(10, 10)); // true
   */
  public isContainsPoint(point: Point): boolean {
    return this.position.getDistanceWithPoint(point) <= this.radius;
  }

  /**
   * @method isIntersectsWithCircle - Check if the circle intersects with another circle
   * @param {Circle} circle - The circle to check
   * @returns {boolean} Whether the circle intersects with the other circle
   * @public
   * @example
   * const circle1 = new Circle(new Point(10, 10), 10);
   * const circle2 = new Circle(new Point(10, 10), 10);
   * const circle3 = new Circle(new Point(10, 10), 20);
   * circle1.isIntersectsWithCircle(circle2); // true
   * circle1.isIntersectsWithCircle(circle3); // true
   * circle2.isIntersectsWithCircle(circle3); // true
   */
  public isIntersectsWithCircle(circle: Circle): boolean {
    return (
      this.position.getDistanceWithPoint(circle.position) <=
      this.radius + circle.radius
    );
  }

  /**
   * @method isIntersectsWithLine - Check if the circle intersects with a line
   * @param {Line} line - The line to check
   * @returns {boolean} Whether the circle intersects with the line
   * @public
   * @example
   * const circle = new Circle(new Point(10, 10), 10);
   * const line = new Line(new Point(0, 0), new Point(20, 20));
   * circle.isIntersectsWithLine(line); // true
   */
  public isIntersectsWithLine(line: Line): boolean {
    const a = line.end.y - line.start.y;
    const b = line.start.x - line.end.x;
    const c = a * line.start.x + b * line.start.y;
    const d = a * this.position.x + b * this.position.y - c;
    const e = Math.sqrt(a * a + b * b);
    const distLine = Math.abs(d) / e;
    return distLine <= this.radius;
  }

  /**
   * @method getIntersectionsWithLine - Get the intersections with a line
   * @param {Line} line - The line to get the intersections with
   * @returns {Point[]} The intersections with the line
   * @public
   * @example
   * const circle = new Circle(new Point(10, 10), 10);
   * const line = new Line(new Point(0, 0), new Point(20, 20));
   * const intersections = circle.getIntersectionsWithLine(line);
   */
  public getIntersectionsWithLine(line: Line): Point[] {
    const a = line.end.y - line.start.y;
    const b = line.start.x - line.end.x;
    const c = a * line.start.x + b * line.start.y;
    const d = a * this.position.x + b * this.position.y - c;
    const e = Math.sqrt(a * a + b * b);
    const distLine = Math.abs(d) / e;
    if (distLine > this.radius) {
      return [];
    }
    const f = Math.sqrt(this.radius * this.radius - distLine * distLine);
    const p1 = new Point(
      (d * b - a * f) / (a * a + b * b),
      (d * a + b * f) / (a * a + b * b)
    );
    const p2 = new Point(
      (d * b + a * f) / (a * a + b * b),
      (d * a - b * f) / (a * a + b * b)
    );
    return [p1, p2];
  }

  /**
   * @method isIntersectsWithRectangle - Check if the circle intersects with a rectangle
   * @param {Rectangle} rectangle - The rectangle to check
   * @returns {boolean} Whether the circle intersects with the rectangle
   * @public
   * @example
   * const circle = new Circle(new Point(10, 10), 10);
   * const rectangle = new Rectangle(new Point(0, 0), new Size(20, 20));
   * circle.isIntersectsWithRectangle(rectangle); // true
   */
  public isIntersectsWithRectangle(rectangle: Rectangle): boolean {
    const x = Math.max(
      rectangle.position.x,
      Math.min(this.position.x, rectangle.position.x + rectangle.size.x)
    );
    const y = Math.max(
      rectangle.position.y,
      Math.min(this.position.y, rectangle.position.y + rectangle.size.y)
    );
    const distance = this.position.getDistanceWithPoint(new Point(x, y));
    return distance < this.radius;
  }

  /**
   * @method getIntersectionsWithRectangle - Get the intersections with a rectangle
   * @param {Rectangle} rectangle - The rectangle to get the intersections with
   * @returns {Point[]} The intersections with the rectangle
   * @public
   * @example
   * const circle = new Circle(new Point(10, 10), 10);
   * const rectangle = new Rectangle(new Point(0, 0), new Size(20, 20));
   * const intersections = circle.getIntersectionsWithRectangle(rectangle);
   */
  public getIntersectionsWithRectangle(rectangle: Rectangle): Point[] {
    const x = Math.max(
      rectangle.position.x,
      Math.min(this.position.x, rectangle.position.x + rectangle.size.x)
    );
    const y = Math.max(
      rectangle.position.y,
      Math.min(this.position.y, rectangle.position.y + rectangle.size.y)
    );
    const distance = this.position.getDistanceWithPoint(new Point(x, y));
    if (distance > this.radius) {
      return [];
    }
    const p1 = new Point(x, y);
    const p2 = new Point(x, y);
    if (x === rectangle.position.x) {
      p1.x -= this.radius;
      p2.x += this.radius;
    } else if (x === rectangle.position.x + rectangle.size.x) {
      p1.x += this.radius;
      p2.x -= this.radius;
    }
    if (y === rectangle.position.y) {
      p1.y -= this.radius;
      p2.y += this.radius;
    } else if (y === rectangle.position.y + rectangle.size.y) {
      p1.y += this.radius;
      p2.y -= this.radius;
    }
    return [p1, p2];
  }

  /**
   * @method clone - Clone the circle
   * @returns {Circle} The cloned circle
   * @public
   * @example
   * const circle = new Circle(new Point(10, 10), 10);
   * const clonedCircle = circle.clone();
   */
  public clone(): Circle {
    return new Circle(this.position.clone(), this.radius, this.options);
  }

  /**
   * @method draw - Draw the circle
   * @param {CanvasRenderingContext2D} ctx - The canvas context
   * @returns {void}
   * @public
   * @example
   * const circle = new Circle(new Point(10, 10), 10);
   * circle.draw(ctx);
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.beginPath();
    ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    if (this.options.fillColor) {
      ctx.fillStyle = this.options.fillColor;
      ctx.fill();
    }
    if (this.options.strokeColor) {
      ctx.lineWidth = this.options.weight || 1;
      ctx.strokeStyle = this.options.strokeColor;
      ctx.stroke();
    }
    ctx.restore();
  }
}
