/**
 * @enum KeyState - The state of a key.
 * @property {string} Up - The key is up.
 * @property {string} Down - The key is down.
 * @property {string} JustUp - The key was just released.
 * @property {string} JustDown - The key was just pressed.
 * @public
 */
export enum KeyState {
  Up = 'up',
  Down = 'down',
  JustUp = 'just_up',
  JustDown = 'just_down',
}
