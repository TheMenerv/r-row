import { GameCanvas } from '../GameCanvas';
import { InputFieldType } from '../enums/InputFieldType';
import { InputFieldOptions } from '../interfaces/InputFieldOptions';
import { Rectangle } from '../primitives/Rectangle';
import { Point } from '../primitives/Point';
import { GameLoop } from '../GameLoop';

/**
 * @class InputField - A class for creating an input field.
 * @public
 */
export class InputField {
  private _area: Rectangle;
  private _baseStyle: CSSStyleDeclaration;
  private _value: string;
  private _input: HTMLInputElement;
  private _form: HTMLFormElement;
  private _isSubmittedByEnterKey: boolean;
  private _isOldSubmitted: boolean;

  /**
   * @constructor
   * @param {Rectangle} area - The area of the input field.
   * @param {InputFieldOptions} [options] - The options for the input field.
   * @public
   * @example
   * const inputField = new InputField(new Rectangle(0, 0, 100, 100), {
   *   type: InputFieldType.Text,
   *   placeholder: 'Enter your name',
   *   maxLength: 10,
   *   style: {
   *     color: 'red',
   *     backgroundColor: 'blue',
   *   },
   * });
   */
  constructor(area: Rectangle, options?: InputFieldOptions) {
    this._area = area;
    this._value = '';
    this._isSubmittedByEnterKey = false;
    this._isOldSubmitted = false;
    this._input = document.createElement('input');
    this._form = document.createElement('form');
    this._form.classList.add('gameForm');
    const node = GameCanvas.instance.canvas.parentNode as HTMLElement;
    node.appendChild(this._form);
    this._form.appendChild(this._input);
    this.setOptions(options ?? {});
    this._baseStyle = this._input.style;
    this._applyCanvasScale();
    GameLoop.instance.subscribeToUpdate(this._update.bind(this));
    document.addEventListener('click', this._onClick);
    document.addEventListener('keydown', this._onEnter);
  }

  /**
   * @get area - The area of the input field.
   * @public
   * @returns {Rectangle}
   * @example
   * const inputField = new InputField(...);
   * console.log(inputField.area);
   */
  public get area(): Rectangle {
    return this._area;
  }

  /**
   * @set area - The area of the input field.
   * @param {Rectangle} area - The area of the input field.
   * @public
   * @example
   * const inputField = new InputField(...);
   * inputField.area = new Rectangle(0, 0, 100, 100);
   */
  public set area(area: Rectangle) {
    this._area = area;
  }

  /**
   * @get value - The value of the input field.
   * @public
   */
  public get value(): string {
    return this._value;
  }

  /**
   * @get isSubmittedByEnterKey - Whether the input field is submitted by Enter key.
   * @public
   */
  public get isSubmittedByEnterKey(): boolean {
    return this._isSubmittedByEnterKey;
  }

  /**
   * @method setOptions - Set the options for the input field.
   * @param {InputFieldOptions} options - The options for the input field.
   * @returns {void}
   * @public
   * @example
   * const inputField = new InputField(...);
   * inputField.setOptions({
   *   type: InputFieldType.Text,
   *   placeholder: 'Enter your name',
   *   maxLength: 10,
   *   style: {
   *     color: 'red',
   *     backgroundColor: 'blue',
   *   },
   * });
   */
  public setOptions(options: InputFieldOptions): void {
    this._input.type = options.type ?? InputFieldType.Text;
    this._input.placeholder = options.placeholder ?? '';
    this._input.maxLength = options.maxLength ?? 99999;
    if (options.style) {
      for (const key in options.style) {
        this._input.style[key] = options.style[key];
      }
    }
    this._input.style.position = 'fixed';
    this._input.autocomplete = 'off';
    this._input.style.left = `${this._area.position.x}px`;
    this._input.style.top = `${this._area.position.y}px`;
    this._input.style.width = `${this._area.size.x}px`;
    this._input.style.height = `${this._area.size.y}px`;
    this._input.style.zIndex = '100';
  }

  /**
   * @method getInputElement - Get the input element.
   * @returns {HTMLInputElement}
   * @public
   * @example
   * const inputField = new InputField(...);
   * const input = inputField.getInputElement();
   * input.value = "Hi!";
   */
  public getInputElement(): HTMLInputElement {
    return this._input;
  }

  /**
   * @method clear - Clear the input field.
   * @returns {void}
   * @public
   * @example
   * const inputField = new InputField(...);
   * inputField.clear();
   */
  public clear(): void {
    this._input.value = '';
  }

  /**
   * @method destroy - Destroy the input field.
   * @returns {void}
   * @public
   * @example
   * const inputField = new InputField(...);
   * inputField.destroy();
   */
  public destroy(): void {
    document.removeEventListener('click', this._onClick);
    document.removeEventListener('keydown', this._onEnter);
    this._input.remove();
    this._form.remove();
    GameLoop.instance.unsubscribeFromUpdate(this._update.bind(this));
  }

  /**
   * @method _update - Update the input field.
   * @param {number} deltaTime - The time since the last update.
   * @returns {void}
   * @private
   * @example
   * const inputField = new InputField(...);
   * inputField.update(deltaTime);
   */
  private _update(deltaTime: number): void {
    this._applyCanvasScale();
    if (this._isOldSubmitted) this._isSubmittedByEnterKey = false;
    this._isOldSubmitted = this._isSubmittedByEnterKey;
    this._value = this._input.value;
  }

  /**
   * @method _applyCanvasScale - Apply the canvas scale to the input field.
   * @returns {void}
   * @private
   */
  private _applyCanvasScale(): void {
    const scale = GameCanvas.instance.scale;
    this._input.style.width = `${this._area.size.x * scale}px`;
    this._input.style.height = `${this._area.size.y * scale}px`;
    if (this._baseStyle.fontSize.slice(-2) === 'px') {
      const fontSize = parseInt(this._baseStyle.fontSize.slice(0, -2));
      this._input.style.fontSize = `${fontSize * scale}px`;
    } else if (this._baseStyle.fontSize.slice(-2) === 'em') {
      const fontSize = parseInt(this._baseStyle.fontSize.slice(0, -2));
      this._input.style.fontSize = `${fontSize * scale}em`;
    } else if (this._baseStyle.fontSize.slice(-3) === 'rem') {
      const fontSize = parseInt(this._baseStyle.fontSize.slice(0, -3));
      this._input.style.fontSize = `${fontSize * scale}rem`;
    }

    const canvasPosition = GameCanvas.instance.position;
    const size = new Point(this._input.offsetWidth, this._input.offsetHeight);
    const positionX = Math.round(
      canvasPosition.x + this._area.position.x * scale - size.x / 2
    );
    const positionY = Math.round(
      canvasPosition.y + this._area.position.y * scale - size.y / 2
    );
    this._input.style.left = `${positionX}px`;
    this._input.style.top = `${positionY}px`;
  }

  /**
   * @method _onClick - Handle the click event.
   * @param {MouseEvent} event - The click event.
   * @returns {void}
   * @private
   */
  private _onClick = (event: MouseEvent): void => {
    event.preventDefault();
    if (event.target !== this._input) this._input.blur();
  };

  /**
   * @method _onEnter - Handle the enter key event.
   * @param {KeyboardEvent} event - The enter key event.
   * @returns {void}
   * @private
   */
  private _onEnter = (event: KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === 'NumpadEnter') {
      event.preventDefault();
      if (document.activeElement === this._input && this._input.value !== '') {
        this._isSubmittedByEnterKey = true;
      }
    }
  };
}
