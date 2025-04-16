import { GameEntity } from '../domain/GameEntity';
import { GameWorld } from '../domain/GameWorld';
import { GameRenderer } from '../domain/ports/GameRenderer';
import { TextureCache } from '../domain/TextureCache';
import { Tile, TileGrid } from '../domain/TileGrid';
import { floorTexture1 } from '../domain/TileGrids';

const red = 'red';
const blue = 'blue';
const green = 'green';
const yellow = 'yellow';
const brown = 'brown';
const white = 'white';
const black = 'black';

export function createGameRendererCanvas(
  ctx: CanvasRenderingContext2D,
): GameRenderer {
  let accTime = 0;

  const renderer: GameRenderer = {
    render: function (
      dt: number,
      viewWidth: number,
      viewHeight: number,
      world: GameWorld,
      textureCache: TextureCache,
    ): void {
      accTime += dt;
      // clear
      ctx.fillStyle = black;
      ctx.fillRect(0, 0, viewWidth, viewHeight);

      const tileSize = 50;

      drawTileGrid(
        ctx,
        tileSize,
        textureCache,
        world.rooms[world.currentRoomId].tileGrid,
      );
      drawPlayer(ctx, tileSize, textureCache, world.player);
    },
  };

  return renderer;
}

function drawTileGrid(
  ctx: CanvasRenderingContext2D,
  tileSize: number,
  textureCache: TextureCache,
  tileGrid: TileGrid,
): void {
  for (let c = 0; c < tileGrid.getNumCols(); c++) {
    for (let r = 0; r < tileGrid.getNumRows(); r++) {
      const tile = tileGrid.getTileAt(c, r);

      const color = getTileColor(tile);
      const x = c * tileSize;
      const y = r * tileSize;

      // console.log('drawTileGrid', { c, r, x, y, tile, color });

      ctx.fillStyle = color;
      ctx.fillRect(x, y, tileSize, tileSize);
    }
  }
}

function getTileColor(tile: Tile): string {
  if (tile.portal !== undefined) {
    return blue;
  }

  return tile.textureId === floorTexture1 ? black : white;
}

function drawPlayer(
  ctx: CanvasRenderingContext2D,
  tileSize: number,
  textureCache: TextureCache,
  player: GameEntity,
): void {
  const playerBounds = player.getBounds();
  const screenX = playerBounds.x * tileSize;
  const screenY = playerBounds.y * tileSize;
  const destWidth = tileSize;
  const destHeight = tileSize;
  //   console.log('drawing player', { tileSize, screenX, screenY });

  const spriteSheet = player.getSpriteSheet();
  const image = textureCache[spriteSheet.id];
  const spriteSourceBounds = spriteSheet.getCurrentSpriteBounds();
  //   console.log('spriteSourceBounds', spriteSourceBounds);

  ctx.drawImage(
    image,
    spriteSourceBounds.x,
    spriteSourceBounds.y,
    spriteSourceBounds.width,
    spriteSourceBounds.height, // src rect (x, y, w, h) in the sprite
    screenX,
    screenY,
    destWidth,
    destHeight, // dest rect (x, y, w, h) on canvas
  );
}
