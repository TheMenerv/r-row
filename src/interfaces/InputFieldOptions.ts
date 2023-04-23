import { InputFieldType } from '../enums/InputFieldType';

/**
 * @interface InputFieldOptions - The options for an input field.
 * @property {InputFieldType} type - The type of input field.
 * @property {string} placeholder - The placeholder text.
 * @property {number} maxLength - The maximum length of the input field.
 * @property {CSSStyleDeclaration} style - The style of the input field.
 * @public
 */
export interface InputFieldOptions {
  type?: InputFieldType;
  placeholder?: string;
  maxLength?: number;
  style?: CSSStyleDeclaration;
}
