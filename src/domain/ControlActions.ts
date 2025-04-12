import { adt } from '@cow-sunday/fp-ts';

export type ControlAction = Move;

export const move = adt<'Move', { dx: number; dy: number }>('Move');
export type Move = ReturnType<typeof move>;
