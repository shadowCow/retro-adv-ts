import { Vec2 } from './Vec2';

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function rectTop(rect: Rect): number {
  return rect.y;
}

export function rectRight(rect: Rect): number {
  return rect.x + rect.width;
}

export function rectBottom(rect: Rect): number {
  return rect.y + rect.height;
}

export function rectLeft(rect: Rect): number {
  return rect.x;
}

export function rectCenter(rect: Rect): Vec2 {
  return {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
  };
}

export function rectIntersect(a: Rect, b: Rect): boolean {
  return !(
    (
      a.x + a.width <= b.x || // a is to the left of b
      b.x + b.width <= a.x || // b is to the left of a
      a.y + a.height <= b.y || // a is above b
      b.y + b.height <= a.y
    ) // b is above a
  );
}
