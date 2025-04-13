import { suite, test } from 'node:test';
import assert from 'node:assert';
import { createSpriteSheet } from './SpriteSheet';

suite('SpriteSheet', () => {
  const spriteSheetId = 'ss1';
  const animationId = 'a1';
  const spriteId1 = 's1';
  const spriteId2 = 's2';
  const spriteMap = {
    [spriteId1]: { x: 0, y: 0, width: 32, height: 32 },
    [spriteId2]: { x: 0, y: 32, width: 32, height: 32 },
  };
  const secondsPerFrame = 0.5;
  const animations = {
    [animationId]: {
      id: animationId,
      secondsPerFrame,
      spriteIds: [spriteId1, spriteId2],
    },
  };

  test('get sprite bounds', () => {
    const spriteSheet = createSpriteSheet(
      spriteSheetId,
      spriteId1,
      spriteMap,
      {},
    );

    const bounds = spriteSheet.getCurrentSpriteBounds();

    assert.deepStrictEqual(bounds, spriteMap[spriteId1]);
  });

  suite('animation', () => {
    test('sprite animation cycle', () => {
      const spriteSheet = createSpriteSheet(
        spriteSheetId,
        spriteId1,
        spriteMap,
        animations,
      );

      // initialize animation should be on first sprite
      spriteSheet.setAnimation(animationId);

      assert.deepStrictEqual(
        spriteSheet.getCurrentSpriteBounds(),
        spriteMap[spriteId1],
      );

      // update less than frame duration should not change sprite
      spriteSheet.update(0.45);

      assert.deepStrictEqual(
        spriteSheet.getCurrentSpriteBounds(),
        spriteMap[spriteId1],
      );

      // update past frame duration should change sprite
      spriteSheet.update(0.1);

      assert.deepStrictEqual(
        spriteSheet.getCurrentSpriteBounds(),
        spriteMap[spriteId2],
      );

      // update to the end should restart the cycle
      spriteSheet.update(0.5);

      assert.deepStrictEqual(
        spriteSheet.getCurrentSpriteBounds(),
        spriteMap[spriteId1],
      );
    });
  });
});
