import { createTileGrid, TileGrid } from './TileGrid';

export const floorTexture1 = 'floorTexture1';
export const floorTexture2 = 'floorTexture2';

export function tileGridAllSameTexture(
  numCols: number,
  numRows: number,
  textureId: string,
): TileGrid {
  const numTiles = numCols * numRows;

  const tiles = new Array(numTiles).fill({ textureId });

  return createTileGrid(numCols, numRows, tiles);
}

export function tileGridAlternatingTexture(
  numCols: number,
  numRows: number,
  textureId1: string,
  textureId2: string,
): TileGrid {
  const numTiles = numCols * numRows;

  const tiles = new Array(numTiles);

  for (let i = 0; i < numTiles; i++) {
    if (i % 2 === 0) {
      tiles[i] = { textureId: textureId1 };
    } else {
      tiles[i] = { textureId: textureId2 };
    }
  }

  return createTileGrid(numCols, numRows, tiles);
}
