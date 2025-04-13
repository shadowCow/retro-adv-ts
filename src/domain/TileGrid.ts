import { Vec2 } from './Vec2';

export type TileGrid = {
  getNumCols(): number;
  getNumRows(): number;
  getTileAt(col: number, row: number): Tile;
};

export type Tile = {
  textureId: string;
  portal?: Portal;
};

export type Portal = {
  to: WorldLocation;
};

export type WorldLocation = {
  roomId: string;
  tileCoords: Vec2;
};

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
  };

  return tileGrid;
}
