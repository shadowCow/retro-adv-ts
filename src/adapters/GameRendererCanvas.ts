import { GameWorld } from '../domain/GameWorld';
import { GameRenderer } from '../domain/ports/GameRenderer';

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
    ): void {
      accTime += dt;
      // clear
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, viewWidth, viewHeight);

      // draw player
      //   const relativeWidth = (accTime % 1000) / 1000;
      //   ctx.fillStyle = '#ff0000'; // red color
      //   ctx.fillRect(50, 50, relativeWidth * 100, 100);

      const tileSize = 50;
      const screenX = world.player.position.x * tileSize;
      const screenY = world.player.position.y * tileSize;
      //   console.log('drawing player', { tileSize, screenX, screenY });

      ctx.fillStyle = '#ff0000';
      ctx.fillRect(screenX, screenY, tileSize, tileSize);
    },
  };

  return renderer;
}
