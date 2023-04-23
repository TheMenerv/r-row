import { Drawable } from '../interfaces/Drawable';
import { LineOptions } from '../interfaces/LineOptions';
import { Circle } from './Circle';
import { Point } from './Point';
import { Rectangle } from './Rectangle';

/**
 * @class Line - A line in 2D space
 * @implements {IDrawable}
 * @public
 */
export class Line implements Drawable {
  /**
   * @constructor
   * @param {Point} start - The start point of the line
   * @param {Point} end - The end point of the line
   * @param {LineOptions} [options={}] - The options for the line
   * @public
   * @example
   * const line = new Line(new Point(10, 10), new Point(20, 20));
   * @example
   * const line = new Line(new Point(10, 10), new Point(20, 20), { color: 'red', weight: 2 });
   */
  public constructor(
    public start: Point,
    public end: Point,
    public options: LineOptions = {}
  ) {}

  /**
   * @method setOptions - Set the options of the line
   * @param {LineOptions} options - The options to set
   * @returns {Line} The line with the new options
   * @public
   * @example
   * const line = new Line(new Point(10, 10), new Point(20, 20));
   * line.setOptions({ color: 'red', weight: 2 });
   */
  public setOptions(options: LineOptions): Line {
    this.options = options;
    return this;
  }

  /**
   * @method get length - Get the length of the line
   * @returns {number} The length of the line
   * @public
   * @example
   * const line = new Line(new Point(0, 10), new Point(0, 20));
   * const length = line.length;
   */
  public get length(): number {
    return this.start.getDistanceWithPoint(this.end);
  }

  /**
   * @method get center - Get the center of the line
   * @returns {Point} The center of the line
   * @public
   * @example
   * const line = new Line(new Point(10, 10), new Point(20, 20));
   * const center = line.center;
   */
  public get center(): Point {
    return new Point(
      (this.start.x + this.end.x) / 2,
      (this.start.y + this.end.y) / 2
    );
  }

  /**
   * @method get angle - Get the angle of the line
   * @returns {number} The angle of the line
   * @public
   * @example
   * const line = new Line(new Point(0, 0), new Point(20, 20));
   * const angle = line.angle;
   */
  public get angle(): number {
    return Math.atan2(this.end.y - this.start.y, this.end.x - this.start.x);
  }

  /**
   * @method fromArray - Create a line from an array
   * @param {number[]} array - The array to create the line from
   * @returns {Line} The line created from the array
   * @static
   * @public
   * @example
   * const line = Line.fromArray([10, 10, 20, 20]);
   */
  public static fromArray(array: [number, number, number, number]): Line {
    return new Line(
      new Point(array[0], array[1]),
      new Point(array[2], array[3])
    );
  }

  /**
   * @method toArray - Convert a line to an array
   * @returns {number[]} The array created from the line
   * @public
   * @example
   * const line = new Line(new Point(10, 10), new Point(20, 20));
   * const array = line.toArray();
   */
  public toArray(): [number, number, number, number] {
    return [this.start.x, this.start.y, this.end.x, this.end.y];
  }

  /**
   * @method equals - Check if the line is equal to another line
   * @param {Line} line - The line to compare with
   * @returns {boolean} Whether the lines are equal
   * @public
   * @example
   * const line1 = new Line(new Point(10, 10), new Point(20, 20));
   * const line2 = new Line(new Point(10, 10), new Point(20, 20));
   * const line3 = new Line(new Point(10, 10), new Point(20, 30));
   * line1.equals(line2); // true
   * line1.equals(line3); // false
   * line2.equals(line3); // false
   */
  public equals(line: Line): boolean {
    return (
      (this.start.equals(line.start) && this.end.equals(line.end)) ||
      (this.start.equals(line.end) && this.end.equals(line.start))
    );
  }

  /**
   * @method isContainsPoint - Check if the line contains a point
   * @param {Point} point - The point to check
   * @param {number} [tolerance=0.1] - The tolerance to use
   * @returns {boolean} Whether the line contains the point
   * @public
   * @example
   * const line = new Line(new Point(10, 10), new Point(20, 20));
   * line.isContainsPoint(new Point(15, 15)); // true
   */
  public isContainsPoint(point: Point, tolerance: number = 0.1): boolean {
    const length = this.length;
    const startToPoint = new Line(this.start, point).length;
    const endToPoint = new Line(this.end, point).length;
    return Math.abs(length - (startToPoint + endToPoint)) < tolerance;
  }

  /**
   * @method isIntersectsWithLine - Check if the line intersects with another line
   * @param {Line} line - The line to check
   * @param {number} [tolerance=0.1] - The tolerance to use
   * @returns {boolean} Whether the lines intersect
   * @public
   * @example
   * const line1 = new Line(new Point(10, 10), new Point(20, 20));
   * const line2 = new Line(new Point(10, 20), new Point(20, 10));
   * line1.isIntersectsWithLine(line2); // true
   */
  public isIntersectsWithLine(line: Line, tolerance: number = 0.1): boolean {
    const a1 = this.end.y - this.start.y;
    const b1 = this.start.x - this.end.x;
    const c1 = a1 * this.start.x + b1 * this.start.y;
    const a2 = line.end.y - line.start.y;
    const b2 = line.start.x - line.end.x;
    const c2 = a2 * line.start.x + b2 * line.start.y;
    const delta = a1 * b2 - a2 * b1;
    if (delta === 0) {
      return false;
    }
    const x = (b2 * c1 - b1 * c2) / delta;
    const y = (a1 * c2 - a2 * c1) / delta;
    const point = new Point(x, y);
    return (
      this.isContainsPoint(point, tolerance) &&
      line.isContainsPoint(point, tolerance)
    );
  }

  /**
   * @method getIntersectionsWithLine - Get the intersections with another line
   * @param {Line} line - The line to check
   * @param {number} [tolerance=0.1] - The tolerance to use
   * @returns {Point[]} The intersections
   * @public
   * @example
   * const line1 = new Line(new Point(10, 10), new Point(20, 20));
   * const line2 = new Line(new Point(10, 20), new Point(20, 10));
   * const intersections = line1.getIntersectionsWithLine(line2);
   */
  public getIntersectionsWithLine(
    line: Line,
    tolerance: number = 0.1
  ): Point[] {
    const a1 = this.end.y - this.start.y;
    const b1 = this.start.x - this.end.x;
    const c1 = a1 * this.start.x + b1 * this.start.y;
    const a2 = line.end.y - line.start.y;
    const b2 = line.start.x - line.end.x;
    const c2 = a2 * line.start.x + b2 * line.start.y;
    const delta = a1 * b2 - a2 * b1;
    if (delta === 0) {
      return [];
    }
    const x = (b2 * c1 - b1 * c2) / delta;
    const y = (a1 * c2 - a2 * c1) / delta;
    const point = new Point(x, y);
    return this.isContainsPoint(point, tolerance) &&
      line.isContainsPoint(point, tolerance)
      ? [point]
      : [];
  }

  /**
   * @method isIntersectsWithRectangle - Check if the line intersects with a rectangle
   * @param {Rectangle} rectangle - The rectangle to check
   * @returns {boolean} Whether the line intersects with the rectangle
   * @public
   * @example
   * const line = new Line(new Point(10, 10), new Point(20, 20));
   * const rectangle = new Rectangle(new Point(10, 20), new Point(20, 10));
   * line.isIntersectsWithRectangle(rectangle); // true
   */
  public isIntersectsWithRectangle(rectangle: Rectangle): boolean {
    return (
      this.isIntersectsWithLine(rectangle.leftLine) ||
      this.isIntersectsWithLine(rectangle.topLine) ||
      this.isIntersectsWithLine(
        rectangle.rightLine || this.isIntersectsWithLine(rectangle.bottomLine)
      )
    );
  }

  /**
   * @method getIntersectionsWithRectangle - Get the intersection point of the line with a rectangle
   * @param {Rectangle} rectangle - The rectangle to check
   * @returns {Point[]} The intersection points
   * @public
   * @example
   * const line = new Line(new Point(10, 10), new Point(20, 20));
   * const rectangle = new Rectangle(new Point(10, 20), new Point(20, 10));
   * const points = line.getIntersectionsWithRectangle(rectangle);
   */
  public getIntersectionsWithRectangle(rectangle: Rectangle): Point[] {
    const points: Point[] = [];
    const leftLine = rectangle.leftLine;
    const topLine = rectangle.topLine;
    const rightLine = rectangle.rightLine;
    const bottomLine = rectangle.bottomLine;
    const intersection = this.getIntersectionsWithLine(leftLine);
    if (intersection.length > 0) {
      points.push(intersection[0]);
    }
    const intersection2 = this.getIntersectionsWithLine(topLine);
    if (intersection2.length > 0) {
      points.push(intersection2[0]);
    }
    const intersection3 = this.getIntersectionsWithLine(rightLine);
    if (intersection3.length > 0) {
      points.push(intersection3[0]);
    }
    const intersection4 = this.getIntersectionsWithLine(bottomLine);
    if (intersection4.length > 0) {
      points.push(intersection4[0]);
    }
    return points;
  }

  /**
   * @method isInRectangle - Check if the line is in a rectangle
   * @param {Rectangle} rectangle - The rectangle to check
   * @returns {boolean} Whether the line is in the rectangle
   * @public
   * @example
   * const line = new Line(new Point(10, 10), new Point(20, 20));
   * const rectangle = new Rectangle(new Point(10, 20), new Point(20, 10));
   * line.isInRectangle(rectangle); // true
   */
  public isInRectangle(rectangle: Rectangle): boolean {
    return (
      rectangle.isContainsPoint(this.start) &&
      rectangle.isContainsPoint(this.end)
    );
  }

  /**
   * @method isIntersectsWithCircle - Check if the line intersects with a circle
   * @param {Circle} circle - The circle to check
   * @param {number} [tolerance=0.1] - The tolerance to use
   * @returns {boolean} Whether the line intersects with the circle
   * @public
   * @example
   * const line = new Line(new Point(10, 10), new Point(20, 20));
   * const circle = new Circle(new Point(15, 15), 5);
   * line.isIntersectsWithCircle(circle); // true
   */
  public isIntersectsWithCircle(
    circle: Circle,
    tolerance: number = 0.1
  ): boolean {
    const length = this.length;
    const startToPoint = new Line(this.start, circle.position).length;
    const endToPoint = new Line(this.end, circle.position).length;
    const distance = Math.abs(length - (startToPoint + endToPoint));
    return distance < circle.radius + tolerance;
  }

  /**
   * @method getIntersectionsWithCircle - Get the intersection point of the line with a circle
   * @param {Circle} circle - The circle to check
   * @param {number} [tolerance=0.1] - The tolerance to use
   * @returns {Point | null} The intersection point or null if the line doesn't intersect with the circle
   * @public
   * @example
   * const line = new Line(new Point(10, 10), new Point(20, 20));
   * const circle = new Circle(new Point(15, 15), 5);
   * const point = line.getPointFromIntersectsWithCircle(circle);
   */
  public getIntersectionsWithCircle(
    circle: Circle,
    tolerance: number = 0.1
  ): Point | null {
    const length = this.length;
    const startToPoint = new Line(this.start, circle.position).length;
    const endToPoint = new Line(this.end, circle.position).length;
    const distance = Math.abs(length - (startToPoint + endToPoint));
    if (distance > circle.radius + tolerance) return null;
    const center = this.center;
    const angle = this.angle;
    const x = center.x + circle.radius * Math.cos(angle);
    const y = center.y + circle.radius * Math.sin(angle);
    const point = new Point(x, y);
    return this.isContainsPoint(point, tolerance) ? point : null;
  }

  /**
   * @method isInCircle - Check if the line is in a circle
   * @param {Circle} circle - The circle to check
   * @returns {boolean} Whether the line is in the circle
   * @public
   * @example
   * const line = new Line(new Point(10, 10), new Point(20, 20));
   * const circle = new Circle(new Point(15, 15), 5);
   * line.isInCircle(circle); // true
   */
  public isInCircle(circle: Circle): boolean {
    return (
      circle.isContainsPoint(this.start) && circle.isContainsPoint(this.end)
    );
  }

  /**
   * @method clone - Clone the line
   * @returns {Line} The cloned line
   * @public
   * @example
   * const line = new Line(new Point(10, 10), new Point(20, 20));
   * const line2 = line.clone();
   */
  public clone(): Line {
    return new Line(this.start.clone(), this.end.clone(), this.options);
  }

  /**
   * @method draw - Draw the line
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on
   * @returns {void}
   * @public
   * @example
   * const line = new Line(new Point(10, 10), new Point(20, 20));
   * line.draw(ctx);
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    if (this.options.color) ctx.strokeStyle = this.options.color;
    if (this.options.weight) ctx.lineWidth = this.options.weight;
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.strokeStyle = this.options.color || 'black';
    ctx.lineWidth = this.options.weight || 1;
    ctx.stroke();
    ctx.restore();
  }
}
