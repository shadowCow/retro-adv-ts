import { suite, test } from 'node:test';
import assert from 'node:assert';
import { createSpriteSheet } from './SpriteSheet';

suite('SpriteSheet', () => {
  const spriteSheetId = 'ss1';
  const animationId1 = 'a1';
  const animationId2 = 'a2';
  const spriteId1 = 's1';
  const spriteId2 = 's2';
  const spriteId3 = 's3';
  const spriteId4 = 's4';
  const spriteMap = {
    [spriteId1]: { x: 0, y: 0, width: 32, height: 32 },
    [spriteId2]: { x: 0, y: 32, width: 32, height: 32 },
    [spriteId3]: { x: 0, y: 64, width: 32, height: 32 },
    [spriteId4]: { x: 0, y: 96, width: 32, height: 32 },
  };
  const secondsPerFrame = 0.5;
  const animations = {
    [animationId1]: {
      id: animationId1,
      secondsPerFrame,
      spriteIds: [spriteId1, spriteId2],
    },
    [animationId2]: {
      id: animationId2,
      secondsPerFrame,
      spriteIds: [spriteId3, spriteId4],
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
      spriteSheet.setAnimation(animationId1);

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

    test('set new animation resets it', () => {
      const spriteSheet = createSpriteSheet(
        spriteSheetId,
        spriteId1,
        spriteMap,
        animations,
      );

      // initialize animation should be on first sprite
      spriteSheet.setAnimation(animationId1);

      assert.deepStrictEqual(
        spriteSheet.getCurrentSpriteBounds(),
        spriteMap[spriteId1],
      );

      // get to sprite 2
      spriteSheet.update(0.75);

      assert.deepStrictEqual(
        spriteSheet.getCurrentSpriteBounds(),
        spriteMap[spriteId2],
      );

      // setting to new animation should reset everything
      spriteSheet.setAnimation(animationId2);

      assert.deepStrictEqual(
        spriteSheet.getCurrentSpriteBounds(),
        spriteMap[spriteId3],
      );

      // animation timer should have been set back to 0
      spriteSheet.update(0.45);

      assert.deepStrictEqual(
        spriteSheet.getCurrentSpriteBounds(),
        spriteMap[spriteId3],
      );
    });

    test('set same animation has no effect', () => {
      const spriteSheet = createSpriteSheet(
        spriteSheetId,
        spriteId1,
        spriteMap,
        animations,
      );

      // initialize animation should be on first sprite
      spriteSheet.setAnimation(animationId1);

      assert.deepStrictEqual(
        spriteSheet.getCurrentSpriteBounds(),
        spriteMap[spriteId1],
      );

      // get to sprite 2
      spriteSheet.update(0.55);

      assert.deepStrictEqual(
        spriteSheet.getCurrentSpriteBounds(),
        spriteMap[spriteId2],
      );

      // setting to same animation should not change current sprite
      spriteSheet.setAnimation(animationId1);

      assert.deepStrictEqual(
        spriteSheet.getCurrentSpriteBounds(),
        spriteMap[spriteId2],
      );
    });

    test('stop animation', () => {
      const spriteSheet = createSpriteSheet(
        spriteSheetId,
        spriteId1,
        spriteMap,
        animations,
      );

      // initialize animation should be on first sprite
      spriteSheet.setAnimation(animationId1);

      assert.deepStrictEqual(
        spriteSheet.getCurrentSpriteBounds(),
        spriteMap[spriteId1],
      );

      // get to sprite 2
      spriteSheet.update(0.55);

      assert.deepStrictEqual(
        spriteSheet.getCurrentSpriteBounds(),
        spriteMap[spriteId2],
      );

      // stopping animation should reset sprite to the first
      spriteSheet.stopAnimation();

      assert.deepStrictEqual(
        spriteSheet.getCurrentSpriteBounds(),
        spriteMap[spriteId1],
      );

      // animation is stopped, update should not change sprite
      spriteSheet.update(0.75);

      assert.deepStrictEqual(
        spriteSheet.getCurrentSpriteBounds(),
        spriteMap[spriteId1],
      );
    });
  });
});
