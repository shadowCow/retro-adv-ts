import {
  ControlAction,
  move,
  openInventory,
  togglePause,
} from '../domain/ControlActions';

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
  i: 'i',
  p: 'p',
});
type KeyName = (typeof keyNames)[keyof typeof keyNames];

export type InputControllerKeyboard = {
  keysToControlActions(keys: ControllerKeys): Array<ControlAction>;
};

export function createInputControllerKeyboard(): InputControllerKeyboard {
  let previousKeys: ControllerKeys = {};

  const inputController: InputControllerKeyboard = {
    keysToControlActions: function (
      keys: ControllerKeys,
    ): Array<ControlAction> {
      if (keys[keyNames.p] || keys[keyNames.i]) {
        console.log('keys', { keys });
      }
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

      if (wasPressed(previousKeys, keys, keyNames.p)) {
        console.log('pressed p');
        actions.push(togglePause());
      } else if (wasPressed(previousKeys, keys, keyNames.i)) {
        console.log('pressed i');
        actions.push(openInventory());
      }

      previousKeys = keys;
      return actions;
    },
  };

  return inputController;
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

function wasPressed(
  previous: ControllerKeys,
  current: ControllerKeys,
  keyName: KeyName,
): boolean {
  return !previous[keyName] && current[keyName];
}
