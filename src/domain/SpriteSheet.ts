import { Rect } from './Rect';

export type SpriteSheet = {
  id: string;
  getCurrentSpriteBounds(): Rect;
  setAnimation(animationId: string): void;
  update(dt: number): void;
};

export type SpriteMap = Record<string, Rect>;
export type AnimationMap = Record<string, SpriteAnimation>;

export type SpriteAnimation = {
  id: string;
  secondsPerFrame: number;
  spriteIds: Array<string>;
};

export function createSpriteSheet(
  id: string,
  initialSpriteId: string,
  spriteMap: SpriteMap,
  animations: AnimationMap,
): SpriteSheet {
  let _currentSpriteId: string = initialSpriteId;
  let _animationId: string | undefined;
  let _secondsThroughCycle: number = 0;

  return {
    id,
    getCurrentSpriteBounds() {
      return spriteMap[_currentSpriteId];
    },
    setAnimation(animationId) {
      _animationId = animationId;
    },
    update(dt) {
      if (_animationId === undefined) {
        return;
      }

      const animation = animations[_animationId];

      _secondsThroughCycle =
        (_secondsThroughCycle + dt) % animationDuration(animation);

      _currentSpriteId =
        animation.spriteIds[currentFrame(animation, _secondsThroughCycle)];
    },
  };
}

function animationDuration(animation: SpriteAnimation): number {
  return animation.secondsPerFrame * animation.spriteIds.length;
}

function currentFrame(
  animation: SpriteAnimation,
  secondsThroughCycle: number,
): number {
  return Math.floor(secondsThroughCycle / animation.secondsPerFrame);
}
