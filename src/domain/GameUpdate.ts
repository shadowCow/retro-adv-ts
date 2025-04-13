import { ControlAction, Move, move } from './ControlActions';
import { GameEntity } from './GameEntity';
import { GameWorld } from './GameWorld';
import {
  playerWalkingDown,
  playerWalkingLeft,
  playerWalkingRight,
  playerWalkingUp,
} from './SpriteSheets';

export function gameUpdate(
  dt: number,
  world: GameWorld,
  actions: Array<ControlAction>,
) {
  applyActions(dt, world, actions);

  updateSpriteSheets(dt, world);
}

function applyActions(
  dt: number,
  world: GameWorld,
  actions: Array<ControlAction>,
): void {
  let playerIsMoving = false;
  actions.forEach((action) => {
    switch (action.kind) {
      case move.kind:
        movePlayer(dt, world.player, action);
        playerIsMoving = true;
        break;
    }
  });

  if (!playerIsMoving) {
    world.player.spriteSheet.stopAnimation();
  }
}

function movePlayer(dt: number, player: GameEntity, action: Move): void {
  const dx = dt * player.speed * action.value.dx;
  const dy = dt * player.speed * action.value.dy;

  player.position.x += dx;
  player.position.y += dy;

  //   console.log('movePlayer', { dx, dy });
  if (action.value.dx > 0) {
    player.spriteSheet.setAnimation(playerWalkingRight);
  } else if (action.value.dx < 0) {
    player.spriteSheet.setAnimation(playerWalkingLeft);
  } else if (action.value.dy > 0) {
    player.spriteSheet.setAnimation(playerWalkingDown);
  } else if (action.value.dy < 0) {
    player.spriteSheet.setAnimation(playerWalkingUp);
  }
}

function updateSpriteSheets(dt: number, world: GameWorld): void {
  world.player.spriteSheet.update(dt);
}
