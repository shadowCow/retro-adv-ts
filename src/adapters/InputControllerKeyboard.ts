import { ControlAction, move } from '../domain/ControlActions';

export type ControllerKeys = Record<string, boolean>;

const keyNames = Object.freeze({
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  a: 'a',
  d: 'd',
  s: 's',
  w: 'w',
});

export function keysToControlActions(
  keys: ControllerKeys,
): Array<ControlAction> {
  const actions: Array<ControlAction> = [];

  let dx = 0;
  let dy = 0;

  if (isMovingLeft(keys) && !isMovingRight(keys)) {
    dx = -1;
  }
  if (isMovingRight(keys) && !isMovingLeft(keys)) {
    dx = 1;
  }
  if (isMovingUp(keys) && !isMovingDown(keys)) {
    dy = -1;
  }
  if (isMovingDown(keys) && !isMovingUp(keys)) {
    dy = 1;
  }

  if (dx !== 0 || dy !== 0) {
    actions.push(move({ dx, dy }));
  }

  return actions;
}

function isMovingLeft(keys: ControllerKeys): boolean {
  return keys[keyNames.ArrowLeft] || keys[keyNames.a];
}

function isMovingRight(keys: ControllerKeys): boolean {
  return keys[keyNames.ArrowRight] || keys[keyNames.d];
}

function isMovingUp(keys: ControllerKeys): boolean {
  return keys[keyNames.ArrowUp] || keys[keyNames.w];
}

function isMovingDown(keys: ControllerKeys): boolean {
  return keys[keyNames.ArrowDown] || keys[keyNames.s];
}
