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
        );

        entity.setPosition(newPosition.x, newPosition.y);

        assert.deepStrictEqual(entity.getBounds(), expectedBounds);
      });
    });
  });
});
