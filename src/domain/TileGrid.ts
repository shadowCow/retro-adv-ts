import { Portal } from './Portal';
import { Rect } from './Rect';

export type TileGrid = {
  getNumCols(): number;
  getNumRows(): number;
  getTileAt(col: number, row: number): Tile;
  getTilesIntersectedWith(bounds: Rect): Array<Tile>;
};

export type Tile = {
  col: number;
  row: number;
  textureId: string;
  terrainKind: TerrainKind;
  portal?: Portal;
};

export const terrainKind = Object.freeze({
  grass: 'grass',
  wood: 'wood',
  dirt: 'dirt',
  metal: 'metal',
  water: 'water',
});
export type TerrainKind = (typeof terrainKind)[keyof typeof terrainKind];

export function createTileGrid(
  numCols: number,
  numRows: number,
  tiles: Array<Tile>,
): TileGrid {
  const tileGrid: TileGrid = {
    getNumCols: function (): number {
      return numCols;
    },
    getNumRows: function (): number {
      return numRows;
    },
    getTileAt: function (col: number, row: number): Tile {
      const index = row * numCols + col;
      return tiles[index];
    },
    getTilesIntersectedWith: function (bounds: Rect): Array<Tile> {
      const intersectedTiles: Tile[] = [];

      const startX = Math.floor(bounds.x);
      const startY = Math.floor(bounds.y);
      const endX = Math.ceil(bounds.x + bounds.width);
      const endY = Math.ceil(bounds.y + bounds.height);

      for (let y = startY; y < endY; y++) {
        for (let x = startX; x < endX; x++) {
          // Bounds check
          if (x >= 0 && x < numCols && y >= 0 && y < numRows) {
            const index = y * numCols + x;
            intersectedTiles.push(tiles[index]);
          }
        }
      }

      return intersectedTiles;
    },
  };

  return tileGrid;
}
