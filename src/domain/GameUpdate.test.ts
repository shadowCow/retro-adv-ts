import test, { suite } from 'node:test';
import { createGameWorld, GameWorld } from './GameWorld';
import { ControlAction, move } from './ControlActions';
import { gameUpdate } from './GameUpdate';
import assert from 'node:assert';
import { room2Id } from './RoomDefinitions';
import { Vec2 } from './Vec2';

suite('GameUpdate', () => {
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
});

function createTestWorld(playerPosition: Vec2): GameWorld {
  const world = createGameWorld();
  world.player.setPosition(playerPosition.x, playerPosition.y);

  return world;
}
