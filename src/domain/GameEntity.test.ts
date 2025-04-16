import test, { suite } from 'node:test';
import { createGameEntity } from './GameEntity';
import { createPlayerSpriteSheet } from './SpriteSheets';
import assert from 'node:assert';

suite('GameEntity', () => {
  suite('setPosition', () => {
    const width = 1;
    const height = 1;
    const testCases = [
      {
        newPosition: { x: 2.5, y: 0 },
        expectedBounds: { x: 2.5, y: 0, width, height },
      },
      {
        newPosition: { x: 5, y: 6 },
        expectedBounds: { x: 5, y: 6, width, height },
      },
    ];

    testCases.map(({ newPosition, expectedBounds }) => {
      test(`newPosition (${newPosition.x},${newPosition.y})`, () => {
        const entity = createGameEntity(
          0,
          width,
          height,
          createPlayerSpriteSheet(),
          false,
        );

        entity.setPosition(newPosition.x, newPosition.y);

        assert.deepStrictEqual(entity.getBounds(), expectedBounds);
      });
    });
  });

  suite('moveByVelocity', () => {
    const width = 1;
    const height = 1;
    const startPosition = { x: 4, y: 4 };
    const testCases = [
      {
        dt: 1,
        velocity: { x: 2, y: 3 },
        expectedBounds: { x: 6, y: 7, width, height },
      },
      {
        dt: 0.5,
        velocity: { x: 2, y: 3 },
        expectedBounds: { x: 5, y: 5.5, width, height },
      },
      {
        dt: 2,
        velocity: { x: 2, y: 3 },
        expectedBounds: { x: 8, y: 10, width, height },
      },
      {
        dt: 1,
        velocity: { x: 0, y: 0 },
        expectedBounds: { x: 4, y: 4, width, height },
      },
      {
        dt: 1,
        velocity: { x: -1, y: 0 },
        expectedBounds: { x: 3, y: 4, width, height },
      },
      {
        dt: 1,
        velocity: { x: 0, y: -1 },
        expectedBounds: { x: 4, y: 3, width, height },
      },
      {
        dt: 1,
        velocity: { x: -1, y: -1 },
        expectedBounds: { x: 3, y: 3, width, height },
      },
    ];

    testCases.map(({ dt, velocity, expectedBounds }) => {
      test(`dt ${dt}`, () => {
        const entity = createGameEntity(
          0,
          width,
          height,
          createPlayerSpriteSheet(),
          false,
        );
        entity.setPosition(startPosition.x, startPosition.y);
        entity.setVelocity(velocity.x, velocity.y);

        entity.moveByVelocity(dt);

        assert.deepStrictEqual(entity.getBounds(), expectedBounds);
      });
    });
  });
});
