import { assertNever } from '@cow-sunday/fp-ts';
import {
  ControlAction,
  Move,
  move,
  openInventory,
  togglePause,
} from './ControlActions';
import { GameEntity } from './GameEntity';
import { GameWorld } from './GameWorld';
import { Portal, portalTriggerLocation } from './Portal';
import {
  playerWalkingDown,
  playerWalkingLeft,
  playerWalkingRight,
  playerWalkingUp,
} from './SpriteSheets';
import { Tile } from './TileGrid';
import {
  rectBottom,
  rectCenter,
  rectIntersect,
  rectLeft,
  rectRight,
  rectTop,
} from './Rect';
import { euclideanDistance } from './Vec2';

export function gameUpdate(
  dt: number,
  world: GameWorld,
  actions: Array<ControlAction>,
) {
  actions
    .filter((a) => a.kind === togglePause.kind)
    .map((_) => (world.isPaused = !world.isPaused));

  if (world.isPaused) {
    return;
  }

  let playerIsMoving = false;
  actions.forEach((action) => {
    switch (action.kind) {
      case move.kind:
        movePlayer(dt, world.player, action);
        playerIsMoving = true;
        break;
      case togglePause.kind:
        // handled above, case is here for exhaustiveness check
        break;
      case openInventory.kind:
        // ???
        break;
      default:
        assertNever(action);
    }
  });

  moveEntities(dt, world);
  resolvePlayerCollisions(world);
  removeDestroyedEntities(world);

  const changedRoom = maybeChangeRooms(world);

  if (!playerIsMoving || changedRoom) {
    world.player.getSpriteSheet().stopAnimation();
  }

  updateSpriteSheets(dt, world);
}

function movePlayer(dt: number, player: GameEntity, action: Move): void {
  const dx = dt * player.getSpeed() * action.value.dx;
  const dy = dt * player.getSpeed() * action.value.dy;

  player.movePosition(dx, dy);

  //   console.log('movePlayer', { dx, dy });
  const spriteSheet = player.getSpriteSheet();
  if (action.value.dx > 0) {
    spriteSheet.setAnimation(playerWalkingRight);
  } else if (action.value.dx < 0) {
    spriteSheet.setAnimation(playerWalkingLeft);
  } else if (action.value.dy > 0) {
    spriteSheet.setAnimation(playerWalkingDown);
  } else if (action.value.dy < 0) {
    spriteSheet.setAnimation(playerWalkingUp);
  }
}

function moveEntities(dt: number, world: GameWorld): void {
  world.entities.forEach((entity) => {
    entity.moveByVelocity(dt);
  });
}

function resolvePlayerCollisions(world: GameWorld): void {
  // TODO - handle collisions with impassable terrain.

  world.entities.forEach((entity) => {
    if (entity.isCollectible()) {
      if (rectIntersect(world.player.getBounds(), entity.getBounds())) {
        const inventory = world.player.getInventory();

        if (inventory !== undefined) {
          inventory.addItem(entity);
          entity.setIsDestroyed(true);
        }
      }
    }
  });
}

function maybeChangeRooms(world: GameWorld): boolean {
  const portal = findTriggeredPortal(world);
  if (portal === undefined) {
    return false;
  }

  world.currentRoomId = portal.to.roomId;
  world.player.setPosition(portal.to.tileCoords.x, portal.to.tileCoords.y);

  return true;
}

function findTriggeredPortal(world: GameWorld): Portal | undefined {
  const tileWithTriggeredPortal = world.rooms[world.currentRoomId].tileGrid
    .getTilesIntersectedWith(world.player.getBounds())
    .find((t) => isPortalCollided(t, world.player));

  return tileWithTriggeredPortal?.portal;
}

const portalCenterTriggerRadius = 0.25;
function isPortalCollided(tile: Tile, entity: GameEntity): boolean {
  if (tile.portal === undefined) {
    return false;
  }

  const entityBounds = entity.getBounds();
  const entityCenter = rectCenter(entityBounds);
  const tileCenter = { x: tile.col + 0.5, y: tile.row + 0.5 };
  // console.log('isPortalCollided', {
  //   entityBounds,
  //   entityCenter,
  //   tileCenter,
  // });

  switch (tile.portal.triggerLocation) {
    case portalTriggerLocation.up:
      return rectTop(entityBounds) < tile.row;
    case portalTriggerLocation.right:
      return rectRight(entityBounds) > tile.col + 1;
    case portalTriggerLocation.down:
      return rectBottom(entityBounds) > tile.row + 1;
    case portalTriggerLocation.left:
      return rectLeft(entityBounds) < tile.col;
    case portalTriggerLocation.center:
      return (
        euclideanDistance(entityCenter, tileCenter) < portalCenterTriggerRadius
      );
    default:
      assertNever(tile.portal.triggerLocation);
  }
}

function updateSpriteSheets(dt: number, world: GameWorld): void {
  world.player.getSpriteSheet().update(dt);
}

function removeDestroyedEntities(world: GameWorld) {
  world.entities = world.entities.filter((x) => !x.isDestroyed());
}
