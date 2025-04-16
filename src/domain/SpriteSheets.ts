import {
  AnimationMap,
  createSpriteSheet,
  SpriteMap,
  SpriteSheet,
} from './SpriteSheet';

export const playerSpriteSheetId = 'link_sprites';
// sprites
export const playerWalkUp1 = 'playerWalkUp1';
export const playerWalkUp2 = 'playerWalkUp2';
export const playerWalkDown1 = 'playerWalkDown1';
export const playerWalkDown2 = 'playerWalkDown2';
export const playerWalkLeft1 = 'playerWalkLeft1';
export const playerWalkLeft2 = 'playerWalkLeft2';
export const playerWalkRight1 = 'playerWalkRight1';
export const playerWalkRight2 = 'playerWalkRight2';
// animations
export const playerWalkingUp = 'playerWalkingUp';
export const playerWalkingDown = 'playerWalkingDown';
export const playerWalkingLeft = 'playerWalkingLeft';
export const playerWalkingRight = 'playerWalkingRight';

export function createPlayerSpriteSheet(): SpriteSheet {
  const spriteSize = 16;
  const spriteMap: SpriteMap = {
    [playerWalkDown1]: { x: 0, y: 0, width: spriteSize, height: spriteSize },
    [playerWalkDown2]: { x: 0, y: 30, width: spriteSize, height: spriteSize },
    [playerWalkLeft1]: { x: 30, y: 0, width: spriteSize, height: spriteSize },
    [playerWalkLeft2]: { x: 30, y: 30, width: spriteSize, height: spriteSize },
    [playerWalkUp1]: { x: 60, y: 0, width: spriteSize, height: spriteSize },
    [playerWalkUp2]: { x: 60, y: 30, width: spriteSize, height: spriteSize },
    [playerWalkRight1]: { x: 90, y: 0, width: spriteSize, height: spriteSize },
    [playerWalkRight2]: { x: 90, y: 30, width: spriteSize, height: spriteSize },
  };

  const animations: AnimationMap = {
    [playerWalkingUp]: {
      id: playerWalkingUp,
      secondsPerFrame: 0.25,
      spriteIds: [playerWalkUp1, playerWalkUp2],
    },
    [playerWalkingDown]: {
      id: playerWalkingDown,
      secondsPerFrame: 0.25,
      spriteIds: [playerWalkDown1, playerWalkDown2],
    },
    [playerWalkingLeft]: {
      id: playerWalkingLeft,
      secondsPerFrame: 0.25,
      spriteIds: [playerWalkLeft1, playerWalkLeft2],
    },
    [playerWalkingRight]: {
      id: playerWalkingRight,
      secondsPerFrame: 0.25,
      spriteIds: [playerWalkRight1, playerWalkRight2],
    },
  };

  return createSpriteSheet(
    playerSpriteSheetId,
    playerWalkUp1,
    spriteMap,
    animations,
  );
}

export function createKeySpriteSheet(): SpriteSheet {
  const spriteSize = 16;
  const spriteMap: SpriteMap = {
    [playerWalkDown1]: { x: 0, y: 0, width: spriteSize, height: spriteSize },
    [playerWalkDown2]: { x: 0, y: 30, width: spriteSize, height: spriteSize },
    [playerWalkLeft1]: { x: 30, y: 0, width: spriteSize, height: spriteSize },
    [playerWalkLeft2]: { x: 30, y: 30, width: spriteSize, height: spriteSize },
    [playerWalkUp1]: { x: 60, y: 0, width: spriteSize, height: spriteSize },
    [playerWalkUp2]: { x: 60, y: 30, width: spriteSize, height: spriteSize },
    [playerWalkRight1]: { x: 90, y: 0, width: spriteSize, height: spriteSize },
    [playerWalkRight2]: { x: 90, y: 30, width: spriteSize, height: spriteSize },
  };

  const animations: AnimationMap = {};

  return createSpriteSheet(
    playerSpriteSheetId,
    playerWalkUp1,
    spriteMap,
    animations,
  );
}
