import test, { suite } from 'node:test';
import { tileGridCyclicTexture } from './TileGrids';
import assert from 'node:assert';
import { terrainKind } from './TileGrid';

suite('TileGrid', () => {
  const numCols = 16;
  const numRows = 12;
  const textureIds = createTestTextureIds(numCols * numRows);

  suite('getTileAt', () => {
    const testCases = [
      { x: 0, y: 0, expectedTexture: textureIds[0] },
      { x: 1, y: 0, expectedTexture: textureIds[1] },
      { x: 2, y: 0, expectedTexture: textureIds[2] },
      { x: 15, y: 0, expectedTexture: textureIds[15] },
      { x: 0, y: 1, expectedTexture: textureIds[16] },
      { x: 0, y: 11, expectedTexture: textureIds[numCols * 11] },
      { x: 15, y: 11, expectedTexture: textureIds[textureIds.length - 1] },
    ];

    testCases.map(({ x, y, expectedTexture }) => {
      test(`valid tile (${x},${y})`, () => {
        const tileGrid = tileGridCyclicTexture(numCols, numRows, textureIds);

        const tile = tileGrid.getTileAt(x, y);

        assert.deepStrictEqual(tile, {
          col: x,
          row: y,
          terrainKind: terrainKind.grass,
          textureId: expectedTexture,
        });
      });
    });
  });

  suite('getTilesIntersectedWith', () => {
    const testCases = [
      {
        bounds: { x: 0, y: 0, width: 1, height: 1 },
        expectedTextures: [textureIds[0]],
      },
    ];

    testCases.map(({ bounds, expectedTextures }) => {
      test(`intersect bounds: (${bounds.x},${bounds.y},${bounds.width},${bounds.height})`, () => {
        const tileGrid = tileGridCyclicTexture(numCols, numRows, textureIds);

        const tiles = tileGrid.getTilesIntersectedWith(bounds);

        assert.deepStrictEqual(
          tiles,
          expectedTextures.map((t) => ({
            col: bounds.x,
            row: bounds.y,
            terrainKind: terrainKind.grass,
            textureId: t,
          })),
        );
      });
    });
  });
});

// tile doesn't inherently have any uniquely identifying information.
// this simulates a unique id by creating a unique texture id for each tile.
function createTestTextureIds(numTiles: number): Array<string> {
  const ids: Array<string> = [];
  for (let i = 0; i < numTiles; i++) {
    ids.push(`texture${i}`);
  }

  return ids;
}
