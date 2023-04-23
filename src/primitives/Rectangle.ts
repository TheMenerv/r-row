import { Drawable } from '../interfaces/Drawable';
import { RectangleOptions } from '../interfaces/RectangleOptions';
import { Circle } from './Circle';
import { Line } from './Line';
import { Point } from './Point';

/**
 * @class Rectangle - Rectangle primitive
 * @implements {Drawable}
 * @public
 */
export class Rectangle implements Drawable {
  /**
   * @constructor
   * @param {Point} position - The position of the rectangle
   * @param {Point} size - The size of the rectangle
   * @param {RectangleOptions} [options={}] - The options for the rectangle
   * @public
   * @example
   * const rectangle = new Rectangle(new Point(10, 10), new Point(10, 10));
   * @example
   * const rectangle = new Rectangle(new Point(10, 10), new Point(10, 10), { fillColor: 'red', weight: 2, strokeColor: 'blue' });
   */
  public constructor(
    public position: Point,
    public size: Point,
    public options: RectangleOptions = {}
  ) {}

  /**
   * @method setOptions - Set the options of the rectangle
   * @param {RectangleOptions} options - The options to set
   * @returns {Rectangle} The rectangle with the new options
   * @public
   * @example
   * const rectangle = new Rectangle(new Point(10, 10), new Point(10, 10));
   * rectangle.setOptions({ fillColor: 'red', weight: 2, strokeColor: 'blue' });
   */
  public setOptions(options: RectangleOptions): Rectangle {
    this.options = options;
    return this;
  }

  /**
   * @method get top - Get the top position of the rectangle
   * @returns {number} The top of the rectangle
   * @public
   * @example
   * const rectangle = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const top = rectangle.top;
   */
  public get top(): number {
    return this.position.y;
  }

  /**
   * @method get bottom - Get the bottom position of the rectangle
   * @returns {number} The bottom of the rectangle
   * @public
   * @example
   * const rectangle = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const bottom = rectangle.bottom;
   */
  public get bottom(): number {
    return this.position.y + this.size.y;
  }

  /**
   * @method get left - Get the left position of the rectangle
   * @returns {number} The left of the rectangle
   * @public
   * @example
   * const rectangle = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const left = rectangle.left;
   */
  public get left(): number {
    return this.position.x;
  }

  /**
   * @method get right - Get the right position of the rectangle
   * @returns {number} The right of the rectangle
   * @public
   * @example
   * const rectangle = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const right = rectangle.right;
   */
  public get right(): number {
    return this.position.x + this.size.x;
  }

  /**
   * @method get topLeft - Get the top left corner of the rectangle
   * @returns {Point} The top left corner of the rectangle
   * @public
   * @example
   * const rectangle = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const topLeft = rectangle.topLeft;
   */
  public get topLeft(): Point {
    return new Point(this.left, this.top);
  }

  /**
   * @method get topRight - Get the top right corner of the rectangle
   * @returns {Point} The top right corner of the rectangle
   * @public
   * @example
   * const rectangle = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const topRight = rectangle.topRight;
   */
  public get topRight(): Point {
    return new Point(this.right, this.top);
  }

  /**
   * @method get bottomLeft - Get the bottom left corner of the rectangle
   * @returns {Point} The bottom left corner of the rectangle
   * @public
   * @example
   * const rectangle = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const bottomLeft = rectangle.bottomLeft;
   */
  public get bottomLeft(): Point {
    return new Point(this.left, this.bottom);
  }

  /**
   * @method get bottomRight - Get the bottom right corner of the rectangle
   * @returns {Point} The bottom right corner of the rectangle
   * @public
   * @example
   * const rectangle = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const bottomRight = rectangle.bottomRight;
   */
  public get bottomRight(): Point {
    return new Point(this.right, this.bottom);
  }

  /**
   * @method get topLine - Get the top line of the rectangle
   * @returns {Line} The top line of the rectangle
   * @public
   * @example
   * const rectangle = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const topLine = rectangle.topLine;
   */
  public get topLine(): Line {
    return new Line(this.topLeft, this.topRight);
  }

  /**
   * @method get rightLine - Get the right line of the rectangle
   * @returns {Line} The right line of the rectangle
   * @public
   * @example
   * const rectangle = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const rightLine = rectangle.rightLine;
   */
  public get rightLine(): Line {
    return new Line(this.topRight, this.bottomRight);
  }

  /**
   * @method get bottomLine - Get the bottom line of the rectangle
   * @returns {Line} The bottom line of the rectangle
   * @public
   * @example
   * const rectangle = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const bottomLine = rectangle.bottomLine;
   */
  public get bottomLine(): Line {
    return new Line(this.bottomRight, this.bottomLeft);
  }

  /**
   * @method get leftLine - Get the left line of the rectangle
   * @returns {Line} The left line of the rectangle
   * @public
   * @example
   * const rectangle = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const leftLine = rectangle.leftLine;
   */
  public get leftLine(): Line {
    return new Line(this.bottomLeft, this.topLeft);
  }

  /**
   * @method fromArray - Create a rectangle from an array
   * @param {number[]} array - The array to create the rectangle from
   * @returns {Rectangle} The rectangle created from the array
   * @static
   * @public
   * @example
   * const rectangle = Rectangle.fromArray([10, 10, 10, 10]);
   */
  public static fromArray(array: [number, number, number, number]): Rectangle {
    return new Rectangle(
      new Point(array[0], array[1]),
      new Point(array[2], array[3])
    );
  }

  /**
   * @method toArray - Convert the rectangle to an array
   * @returns {number[]} The array created from the rectangle
   * @public
   * @example
   * const rectangle = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const array = rectangle.toArray();
   */
  public toArray(): [number, number, number, number] {
    return [this.position.x, this.position.y, this.size.x, this.size.y];
  }

  /**
   * @method equals - Check if the rectangle is equal to another rectangle
   * @param {Rectangle} rectangle - The rectangle to compare
   * @returns {boolean} True if the rectangle is equal to another rectangle
   * @public
   * @example
   * const rectangle1 = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const rectangle2 = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const rectangle3 = new Rectangle(new Point(10, 20), new Point(10, 10));
   * rectangle1.equals(rectangle2); // true
   * rectangle1.equals(rectangle3); // false
   * rectangle2.equals(rectangle3); // false
   */
  public equals(rectangle: Rectangle): boolean {
    return (
      this.position.equals(rectangle.position) &&
      this.size.equals(rectangle.size)
    );
  }

  /**
   * @method isContainsPoint - Check if the rectangle contains a point
   * @param {Point} point - The point to check
   * @returns {boolean} True if the rectangle contains the point
   * @public
   * @example
   * const rectangle = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const point1 = new Point(10, 10);
   * const point2 = new Point(20, 20);
   * const point3 = new Point(30, 30);
   * rectangle.isContainsPoint(point1); // true
   * rectangle.isContainsPoint(point2); // true
   * rectangle.isContainsPoint(point3); // false
   */
  public isContainsPoint(point: Point): boolean {
    return (
      point.x >= this.position.x &&
      point.x <= this.position.x + this.size.x &&
      point.y >= this.position.y &&
      point.y <= this.position.y + this.size.y
    );
  }

  /**
   * @method isIntersectsWithRectangle - Check if the rectangle intersects with another rectangle
   * @param {Rectangle} rectangle - The rectangle to check
   * @returns {boolean} True if the rectangle intersects with another rectangle
   * @public
   * @example
   * const rectangle1 = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const rectangle2 = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const rectangle3 = new Rectangle(new Point(10, 20), new Point(10, 10));
   * rectangle1.isIntersectsWithRectangle(rectangle2); // true
   * rectangle1.isIntersectsWithRectangle(rectangle3); // false
   * rectangle2.isIntersectsWithRectangle(rectangle3); // false
   */
  public isIntersectsWithRectangle(rectangle: Rectangle): boolean {
    return (
      this.position.x < rectangle.position.x + rectangle.size.x &&
      this.position.x + this.size.x > rectangle.position.x &&
      this.position.y < rectangle.position.y + rectangle.size.y &&
      this.position.y + this.size.y > rectangle.position.y
    );
  }

  /**
   * @method getIntersectionsWithRectangle - Get the intersection of the rectangle with another rectangle
   * @param {Rectangle} rectangle - The rectangle to check
   * @returns {Point[]} The intersection of the rectangle with another rectangle
   * @public
   * @example
   * const rectangle1 = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const rectangle2 = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const rectangle3 = new Rectangle(new Point(10, 20), new Point(10, 10));
   * rectangle1.getIntersectionWithRectangle(rectangle2); // [Point(10, 10), Point(20, 10), Point(20, 20), Point(10, 20)]
   * rectangle1.getIntersectionWithRectangle(rectangle3); // []
   * rectangle2.getIntersectionWithRectangle(rectangle3); // []
   */
  public getIntersectionsWithRectangle(rectangle: Rectangle): Point[] {
    const intersection = new Rectangle(
      new Point(
        Math.max(this.position.x, rectangle.position.x),
        Math.max(this.position.y, rectangle.position.y)
      ),
      new Point(
        Math.min(
          this.position.x + this.size.x,
          rectangle.position.x + rectangle.size.x
        ),
        Math.min(
          this.position.y + this.size.y,
          rectangle.position.y + rectangle.size.y
        )
      )
    );
    return [
      intersection.topLeft,
      intersection.topRight,
      intersection.bottomRight,
      intersection.bottomLeft,
    ];
  }

  /**
   * @method isIntersectsWithLine - Check if the rectangle intersects with a line
   * @param {Line} line - The line to check
   * @returns {boolean} True if the rectangle intersects with a line
   * @public
   * @example
   * const rectangle = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const line1 = new Line(new Point(10, 10), new Point(20, 20));
   * const line2 = new Line(new Point(10, 20), new Point(20, 10));
   * const line3 = new Line(new Point(30, 30), new Point(40, 40));
   * rectangle.isIntersectsWithLine(line1); // true
   * rectangle.isIntersectsWithLine(line2); // true
   * rectangle.isIntersectsWithLine(line3); // false
   */
  public isIntersectsWithLine(line: Line): boolean {
    const topLeft = new Point(this.position.x, this.position.y);
    const topRight = new Point(this.position.x + this.size.x, this.position.y);
    const bottomLeft = new Point(
      this.position.x,
      this.position.y + this.size.y
    );
    const bottomRight = new Point(
      this.position.x + this.size.x,
      this.position.y + this.size.y
    );

    const top = new Line(topLeft, topRight);
    const right = new Line(topRight, bottomRight);
    const bottom = new Line(bottomRight, bottomLeft);
    const left = new Line(bottomLeft, topLeft);

    return (
      line.isIntersectsWithLine(top) ||
      line.isIntersectsWithLine(right) ||
      line.isIntersectsWithLine(bottom) ||
      line.isIntersectsWithLine(left)
    );
  }

  /**
   * @method getIntersectionsWithLine - Get the intersection of the rectangle with a line
   * @param {Line} line - The line to check
   * @returns {Point[]} The intersection of the rectangle with a line
   * @public
   * @example
   * const rectangle = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const line1 = new Line(new Point(10, 10), new Point(20, 20));
   * const line2 = new Line(new Point(10, 20), new Point(20, 10));
   * const line3 = new Line(new Point(30, 30), new Point(40, 40));
   * rectangle.getIntersectionsWithLine(line1); // [Point(10, 10), Point(20, 20)]
   * rectangle.getIntersectionsWithLine(line2); // [Point(10, 20), Point(20, 10)]
   * rectangle.getIntersectionsWithLine(line3); // []
   */
  public getIntersectionsWithLine(line: Line): Point[] {
    const top = this.topLine;
    const right = this.rightLine;
    const bottom = this.bottomLine;
    const left = this.leftLine;
    const intersections: Point[] = [];
    if (line.isIntersectsWithLine(top)) {
      intersections.push(...line.getIntersectionsWithLine(top));
    }
    if (line.isIntersectsWithLine(right)) {
      intersections.push(...line.getIntersectionsWithLine(right));
    }
    if (line.isIntersectsWithLine(bottom)) {
      intersections.push(...line.getIntersectionsWithLine(bottom));
    }
    if (line.isIntersectsWithLine(left)) {
      intersections.push(...line.getIntersectionsWithLine(left));
    }
    return intersections;
  }

  /**
   * @method isIntersectsWithCircle - Check if the rectangle intersects with a circle
   * @param {Circle} circle - The circle to check
   * @returns {boolean} True if the rectangle intersects with a circle
   * @public
   * @example
   * const rectangle = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const circle1 = new Circle(new Point(10, 10), 10);
   * const circle2 = new Circle(new Point(20, 20), 10);
   * const circle3 = new Circle(new Point(30, 30), 10);
   * rectangle.isIntersectsWithCircle(circle1); // true
   * rectangle.isIntersectsWithCircle(circle2); // true
   * rectangle.isIntersectsWithCircle(circle3); // false
   */
  public isIntersectsWithCircle(circle: Circle): boolean {
    const topLeft = new Point(this.position.x, this.position.y);
    const topRight = new Point(this.position.x + this.size.x, this.position.y);
    const bottomLeft = new Point(
      this.position.x,
      this.position.y + this.size.y
    );
    const bottomRight = new Point(
      this.position.x + this.size.x,
      this.position.y + this.size.y
    );

    const top = new Line(topLeft, topRight);
    const right = new Line(topRight, bottomRight);
    const bottom = new Line(bottomRight, bottomLeft);
    const left = new Line(bottomLeft, topLeft);

    return (
      circle.isIntersectsWithLine(top) ||
      circle.isIntersectsWithLine(right) ||
      circle.isIntersectsWithLine(bottom) ||
      circle.isIntersectsWithLine(left)
    );
  }

  /**
   * @method getIntersectionsWithCircle - Get the intersection of the rectangle with a circle
   * @param {Circle} circle - The circle to check
   * @returns {Point[]} The intersection of the rectangle with a circle
   * @public
   * @example
   * const rectangle = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const circle1 = new Circle(new Point(10, 10), 10);
   * const circle2 = new Circle(new Point(20, 20), 10);
   * const circle3 = new Circle(new Point(30, 30), 10);
   * rectangle.getIntersectionsWithCircle(circle1); // [Point(10, 10), Point(20, 20)]
   * rectangle.getIntersectionsWithCircle(circle2); // [Point(10, 20), Point(20, 10)]
   * rectangle.getIntersectionsWithCircle(circle3); // []
   */
  public getIntersectionsWithCircle(circle: Circle): Point[] {
    const top = this.topLine;
    const right = this.rightLine;
    const bottom = this.bottomLine;
    const left = this.leftLine;
    const intersections: Point[] = [];
    if (circle.isIntersectsWithLine(top)) {
      intersections.push(...circle.getIntersectionsWithLine(top));
    }
    if (circle.isIntersectsWithLine(right)) {
      intersections.push(...circle.getIntersectionsWithLine(right));
    }
    if (circle.isIntersectsWithLine(bottom)) {
      intersections.push(...circle.getIntersectionsWithLine(bottom));
    }
    if (circle.isIntersectsWithLine(left)) {
      intersections.push(...circle.getIntersectionsWithLine(left));
    }
    return intersections;
  }

  /**
   * @method clone - Clone the rectangle
   * @returns {Rectangle} The cloned rectangle
   * @public
   * @example
   * const rectangle = new Rectangle(new Point(10, 10), new Point(10, 10));
   * const rectangleClone = rectangle.Clone();
   * rectangle.position.x; // 10
   * rectangle.position.y; // 10
   * rectangle.size.x; // 10
   * rectangle.size.y; // 10
   * rectangle.clone.position.x; // 10
   * rectangle.clone.position.y; // 10
   * rectangle.clone.size.x; // 10
   * rectangle.clone.size.y; // 10
   */
  public clone(): Rectangle {
    return new Rectangle(this.position.clone(), this.size.clone());
  }

  /**
   * @method draw - Draw the rectangle
   * @param {CanvasRenderingContext2D} ctx - The canvas context
   * @returns {void}
   * @public
   * @example
   * const rectangle = new Rectangle(new Point(10, 10), new Point(10, 10));
   * rectangle.draw(ctx);
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.size.x, this.size.y);
    ctx.fillStyle = this.options.fillColor || 'transparent';
    ctx.fill();
    ctx.lineWidth = this.options.weight || 1;
    ctx.strokeStyle = this.options.strokeColor || 'black';
    ctx.stroke();
    ctx.restore();
  }
}
