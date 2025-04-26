import test, { suite } from 'node:test';
import { createEmptyGameWorld, GameWorld } from './GameWorld';
import { ControlAction, move, togglePause } from './ControlActions';
import { gameUpdate } from './GameUpdate';
import assert from 'node:assert';
import { room2Id } from './RoomDefinitions';
import { Vec2 } from './Vec2';
import { createGameEntity } from './GameEntity';
import { createPlayerSpriteSheet } from './SpriteSheets';

suite('GameUpdate', () => {
  suite('togglePause', () => {
    test('pause the game', () => {
      const playerPosition = { x: 1, y: 1 };
      const dt = 1;
      const world = createTestWorld(playerPosition);
      const actions: Array<ControlAction> = [
        move({ dx: 0, dy: -1 }),
        togglePause(),
      ];

      gameUpdate(dt, world, actions);

      assert.deepStrictEqual(world.isPaused, true);
      assert.deepStrictEqual(world.player.getPosition(), playerPosition);
    });

    test('unpause the game', () => {
      const playerPosition = { x: 5, y: 5 };
      const dt = 1;
      const world = createTestWorld(playerPosition);
      world.isPaused = true;
      const actions: Array<ControlAction> = [
        move({ dx: 0, dy: -1 }),
        togglePause(),
      ];

      gameUpdate(dt, world, actions);

      assert.deepStrictEqual(world.isPaused, false);
      assert.deepStrictEqual(world.player.getPosition(), { x: 5, y: 2 });
    });
  });

  suite('room transition', () => {
    test('go to up room', () => {
      const playerPosition = { x: 7, y: 2.9 };
      const dt = 1;
      const world = createTestWorld(playerPosition);
      const actions: Array<ControlAction> = [move({ dx: 0, dy: -1 })];

      gameUpdate(dt, world, actions);

      assert.deepStrictEqual(world.player.getPosition(), { x: 7, y: 11 });
      assert.deepStrictEqual(world.currentRoomId, room2Id);
    });
  });

  suite('move entities', () => {
    test('move entities', () => {});
  });

  suite('collect items', () => {
    test('collect an item', () => {
      const playerPosition = { x: 0, y: 0 };
      const dt = 1;
      const world = createTestWorld(playerPosition);
      const collectible = world.entities[0];
      const actions: Array<ControlAction> = [move({ dx: 1, dy: 0 })];

      gameUpdate(dt, world, actions);

      const inventory = world.player.getInventory();
      const items = inventory === undefined ? [] : inventory.getItems();
      assert.deepStrictEqual(world.entities, []);
      assert.deepStrictEqual(items, [collectible]);
    });
  });
});

function createTestWorld(playerPosition: Vec2): GameWorld {
  const world = createEmptyGameWorld();
  world.player.setPosition(playerPosition.x, playerPosition.y);

  const collectibleItem = createGameEntity(
    0,
    0.25,
    0.25,
    createPlayerSpriteSheet(),
    true,
  );
  collectibleItem.setPosition(3, 0);
  world.entities.push(collectibleItem);

  return world;
}
