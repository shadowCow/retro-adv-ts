import { adt } from '@cow-sunday/fp-ts';

export type ControlAction = Move | TogglePause | OpenInventory;

export const move = adt<'Move', { dx: number; dy: number }>('Move');
export type Move = ReturnType<typeof move>;

export const togglePause = adt<'TogglePause', void>('TogglePause');
export type TogglePause = ReturnType<typeof togglePause>;

export const openInventory = adt<'OpenInventory', void>('OpenInventory');
export type OpenInventory = ReturnType<typeof openInventory>;
