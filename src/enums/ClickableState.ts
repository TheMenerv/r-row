/**
 * @enum ClickableState - The state of a clickable element.
 * @property {string} Clicked - The element has been clicked.
 * @property {string} Hovered - The element is being hovered over.
 * @property {string} Pressed - The element is being pressed.
 * @property {string} Released - The element has been released.
 * @property {string} Disabled - The element is disabled.
 * @public
 */
export enum ClickableState {
  Clicked = 'clicked',
  Hovered = 'hovered',
  Pressed = 'pressed',
  Released = 'released',
  Disabled = 'disabled',
}
