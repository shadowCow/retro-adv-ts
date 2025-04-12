import { ControlAction, Move, move } from './ControlActions';
import { GameEntity } from './GameEntity';
import { GameWorld } from './GameWorld';

export function gameUpdate(
  dt: number,
  world: GameWorld,
  actions: Array<ControlAction>,
) {
  applyActions(dt, world, actions);
}

function applyActions(
  dt: number,
  world: GameWorld,
  actions: Array<ControlAction>,
): void {
  actions.forEach((action) => {
    switch (action.kind) {
      case move.kind:
        movePlayer(dt, world.player, action);
        break;
    }
  });
}

function movePlayer(dt: number, player: GameEntity, action: Move): void {
  const dx = dt * player.speed * action.value.dx;
  const dy = dt * player.speed * action.value.dy;

  player.position.x += dx;
  player.position.y += dy;

  //   console.log('movePlayer', { dx, dy });
}
