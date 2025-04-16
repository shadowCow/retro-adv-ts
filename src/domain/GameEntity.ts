import { Inventory } from './Inventory';
import { Rect } from './Rect';
import { SpriteSheet } from './SpriteSheet';
import { Vec2 } from './Vec2';

export type GameEntity = {
  getPosition(): Vec2;
  setPosition(x: number, y: number): void;
  movePosition(dx: number, dy: number): void;
  moveByVelocity(dt: number): void;
  getBounds(): Rect;
  getVelocity(): Vec2;
  setVelocity(vx: number, vy: number): void;
  getSpeed(): number;
  getSpriteSheet(): SpriteSheet;
  isCollectible(): boolean;
  getInventory(): Inventory | undefined;
  setIsDestroyed(value: boolean): void;
  isDestroyed(): boolean;
};

export function createGameEntity(
  baseSpeed: number,
  width: number,
  height: number,
  spriteSheet: SpriteSheet,
  isCollectible: boolean,
  inventory?: Inventory,
): GameEntity {
  let speed = baseSpeed;

  const position: Vec2 = { x: 0, y: 0 };
  const bounds: Rect = { x: 0, y: 0, width, height };
  const velocity: Vec2 = { x: 0, y: 0 };

  let isDestroyed = false;

  const entity: GameEntity = {
    getPosition: function (): Readonly<Vec2> {
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
    moveByVelocity: function (dt: number): void {
      this.movePosition(dt * velocity.x, dt * velocity.y);
    },
    getBounds: function (): Readonly<Rect> {
      return bounds;
    },
    getVelocity: function (): Readonly<Vec2> {
      return velocity;
    },
    setVelocity: function (vx: number, vy: number): void {
      velocity.x = vx;
      velocity.y = vy;
    },
    getSpeed: function (): number {
      return speed;
    },
    getSpriteSheet: function (): SpriteSheet {
      return spriteSheet;
    },
    isCollectible: function (): boolean {
      return isCollectible;
    },
    getInventory: function (): Inventory | undefined {
      return inventory;
    },
    setIsDestroyed: function (value: boolean): void {
      isDestroyed = value;
    },
    isDestroyed: function (): boolean {
      return isDestroyed;
    },
  };

  return entity;
}
