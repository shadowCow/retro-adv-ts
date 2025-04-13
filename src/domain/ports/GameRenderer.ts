import { GameWorld } from '../GameWorld';
import { TextureCache } from '../TextureCache';

export type GameRenderer = {
  render: (
    dt: number,
    viewWidth: number,
    viewHeight: number,
    world: GameWorld,
    textureCache: TextureCache,
  ) => void;
};
