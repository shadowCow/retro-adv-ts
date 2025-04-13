import test, { suite } from 'node:test';
import { tileGridAlternatingTexture } from './TileGrids';
import assert from 'node:assert';

suite('TileGrid', () => {
  const numCols = 16;
  const numRows = 12;
  const textureId1 = 't1';
  const textureId2 = 't2';

  suite('getTileAt', () => {
    const testCases = [
      { x: 0, y: 0, expectedTexture: textureId1 },
      { x: 1, y: 0, expectedTexture: textureId2 },
      { x: 2, y: 0, expectedTexture: textureId1 },
      { x: 15, y: 0, expectedTexture: textureId2 },
      { x: 0, y: 1, expectedTexture: textureId1 },
      { x: 0, y: 11, expectedTexture: textureId1 },
      { x: 15, y: 11, expectedTexture: textureId2 },
    ];

    testCases.map(({ x, y, expectedTexture }) => {
      test(`valid tile (${x},${y})`, () => {
        const tileGrid = tileGridAlternatingTexture(
          numCols,
          numRows,
          textureId1,
          textureId2,
        );

        const tile = tileGrid.getTileAt(x, y);

        assert.deepStrictEqual(tile, { textureId: expectedTexture });
      });
    });
  });
});
