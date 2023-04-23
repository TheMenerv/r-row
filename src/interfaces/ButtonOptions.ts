import { Sprite } from '../assets/Sprite';
import { ClickableState } from '../index';
import { NineSlice } from '../ui/NineSlice';

export interface ButtonOptions {
  nineSlices?: Map<ClickableState, NineSlice>;
  sprites?: Map<ClickableState, Sprite>;
}
