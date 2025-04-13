import { GameEntity } from './GameEntity';
import { createPlayerSpriteSheet } from './SpriteSheets';

export type GameWorld = {
  player: GameEntity;
};

export function createGameWorld(): GameWorld {
  return {
    player: {
      speed: 3,
      position: {
        x: 4,
        y: 4,
      },
      spriteSheet: createPlayerSpriteSheet(),
    },
  };
}
