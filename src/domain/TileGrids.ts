import { createTileGrid, terrainKind, Tile, TileGrid } from './TileGrid';

export const floorTexture1 = 'floorTexture1';
export const floorTexture2 = 'floorTexture2';
export const floorTexture3 = 'floorTexture3';
export const floorTexture4 = 'floorTexture4';
export const floorTexture5 = 'floorTexture5';

export function tileGridAllSameTexture(
  numCols: number,
  numRows: number,
  textureId: string,
): TileGrid {
  const numTiles = numCols * numRows;

  const tiles = new Array(numTiles);
  for (let i = 0; i < numTiles; i++) {
    tiles[i] = { textureId };
  }

  const tileGrid = createTileGrid(numCols, numRows, tiles);

  populateTileCoords(numRows, numCols, tileGrid);

  return tileGrid;
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

  const tileGrid = createTileGrid(numCols, numRows, tiles);

  populateTileCoords(numRows, numCols, tileGrid);

  return tileGrid;
}

export function tileGridCyclicTexture(
  numCols: number,
  numRows: number,
  textureIds: Array<string>,
): TileGrid {
  const numTiles = numCols * numRows;

  const tiles = new Array<Tile>(numTiles);

  let textureIdIndex = 0;

  for (let i = 0; i < numTiles; i++) {
    if (textureIdIndex >= textureIds.length) {
      textureIdIndex = 0;
    }

    tiles[i] = {
      col: i % numCols,
      row: Math.floor(i / numCols),
      textureId: textureIds[textureIdIndex],
      terrainKind: terrainKind.grass,
    };

    textureIdIndex += 1;
  }

  return createTileGrid(numCols, numRows, tiles);
}

function populateTileCoords(
  numRows: number,
  numCols: number,
  tileGrid: TileGrid,
): void {
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      const tile = tileGrid.getTileAt(c, r);
      tile.col = c;
      tile.row = r;
    }
  }
}
