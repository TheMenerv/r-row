/**
 * @enum TouchState - The state of the touch event.
 * @property Start - The touch event has started.
 * @property Move - The touch event is moving.
 * @property End - The touch event has ended.
 * @property Cancel - The touch event has been cancelled.
 * @public
 */
export enum TouchState {
  Started = 'started',
  Moved = 'moved',
  Ended = 'ended',
  Cancelled = 'cancelled',
}
