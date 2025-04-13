import { GameEntity } from './GameEntity';
import { createPlayerSpriteSheet } from './SpriteSheets';
import { TileGrid } from './TileGrid';
import {
  floorTexture1,
  floorTexture2,
  tileGridAlternatingTexture,
} from './TileGrids';

export type GameWorld = {
  player: GameEntity;
  currentRoom: Room;
};

export type RoomGraph = {};

export type Room = {
  tileGrid: TileGrid;
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
    currentRoom: {
      tileGrid: tileGridAlternatingTexture(
        16,
        12,
        floorTexture1,
        floorTexture2,
      ),
    },
  };
}
