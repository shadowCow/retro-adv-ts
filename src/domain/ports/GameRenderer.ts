import { GameWorld } from "../GameWorld";

export type GameRenderer = {
  render: (
    dt: number,
    viewWidth: number,
    viewHeight: number,
    world: GameWorld
  ) => void;
};
