import { createGameEntity, GameEntity } from './GameEntity';
import { createInventory } from './Inventory';
import {
  createRoom1,
  createRoom2,
  createRoom3,
  createRoom4,
  createRoom5,
  createRoom6,
  room1Id,
  room2Id,
  room3Id,
  room4Id,
  room5Id,
  room6Id,
} from './RoomDefinitions';
import { createPlayerSpriteSheet } from './SpriteSheets';
import { TileGrid } from './TileGrid';

export type GameWorld = {
  player: GameEntity;
  rooms: Rooms;
  currentRoomId: string;
  entities: Array<GameEntity>;
};

export type Rooms = Record<string, Room>;

export type Room = {
  roomId: string;
  tileGrid: TileGrid;
};

export function createGameWorld(): GameWorld {
  const player = createGameEntity(
    3,
    1,
    1,
    createPlayerSpriteSheet(),
    false,
    createInventory(),
  );
  player.setPosition(4, 4);

  const key = createGameEntity(0, 0.25, 0.25, createPlayerSpriteSheet(), true);
  key.setPosition(1, 1);

  return {
    player,
    rooms: {
      [room1Id]: createRoom1(),
      [room2Id]: createRoom2(),
      [room3Id]: createRoom3(),
      [room4Id]: createRoom4(),
      [room5Id]: createRoom5(),
      [room6Id]: createRoom6(),
    },
    currentRoomId: room1Id,
    entities: [key],
  };
}
