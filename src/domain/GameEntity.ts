import { Rect } from './Rect';
import { SpriteSheet } from './SpriteSheet';
import { Vec2 } from './Vec2';

export type GameEntity = {
  getPosition(): Vec2;
  setPosition(x: number, y: number): void;
  movePosition(dx: number, dy: number): void;
  getBounds(): Rect;
  getSpeed(): number;
  getSpriteSheet(): SpriteSheet;
};

export function createGameEntity(
  baseSpeed: number,
  width: number,
  height: number,
  spriteSheet: SpriteSheet,
): GameEntity {
  let position: Vec2 = { x: 0, y: 0 };
  let bounds: Rect = { x: 0, y: 0, width, height };
  let speed = baseSpeed;

  const entity: GameEntity = {
    getPosition: function (): Vec2 {
      return position;
    },
    setPosition: function (x: number, y: number): void {
      position.x = x;
      position.y = y;

      bounds.x = x;
      bounds.y = y;
    },
    movePosition: function (dx: number, dy: number): void {
      this.setPosition(position.x + dx, position.y + dy);
    },
    getBounds: function (): Rect {
      return bounds;
    },
    getSpeed: function (): number {
      return speed;
    },
    getSpriteSheet: function (): SpriteSheet {
      return spriteSheet;
    },
  };

  return entity;
}
