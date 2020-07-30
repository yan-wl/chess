import { RelativePosition } from './RelativePosition';
import { MoveEffect } from './MoveEffect';

export type Steps = RelativePosition[];

export type Move = {
  steps: Steps;
  effect: MoveEffect;
};
