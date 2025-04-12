import { GameEntity } from './GameEntity';

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
    },
  };
}
