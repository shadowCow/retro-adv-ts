import { Room } from './GameWorld';
import { portalTriggerLocation } from './Portal';
import {
  floorTexture1,
  floorTexture2,
  floorTexture3,
  floorTexture4,
  floorTexture5,
  tileGridAllSameTexture,
  tileGridAlternatingTexture,
} from './TileGrids';

export const room1Id = 'room1';
export const room2Id = 'room2';
export const room3Id = 'room3';
export const room4Id = 'room4';
export const room5Id = 'room5';
export const room6Id = 'room6';

export function createRoom1(): Room {
  const room = {
    roomId: room1Id,
    tileGrid: tileGridAlternatingTexture(16, 12, floorTexture1, floorTexture2),
  };
  // up
  room.tileGrid.getTileAt(7, 0).portal = {
    to: {
      roomId: room2Id,
      tileCoords: {
        x: 7,
        y: 11,
      },
    },
    triggerLocation: portalTriggerLocation.up,
  };
  // right
  room.tileGrid.getTileAt(15, 5).portal = {
    to: {
      roomId: room3Id,
      tileCoords: {
        x: 0,
        y: 5,
      },
    },
    triggerLocation: portalTriggerLocation.right,
  };
  // down
  room.tileGrid.getTileAt(7, 11).portal = {
    to: {
      roomId: room4Id,
      tileCoords: {
        x: 7,
        y: 0,
      },
    },
    triggerLocation: portalTriggerLocation.down,
  };
  // left
  room.tileGrid.getTileAt(0, 6).portal = {
    to: {
      roomId: room5Id,
      tileCoords: {
        x: 15,
        y: 6,
      },
    },
    triggerLocation: portalTriggerLocation.left,
  };
  // TODO - warp needs special handling or it infinitely warps back and forth
  // warp
  //   room.tileGrid.getTileAt(12, 9).portal = {
  //     to: {
  //       roomId: room6Id,
  //       tileCoords: {
  //         x: 3,
  //         y: 3,
  //       },
  //     },
  //     triggerLocation: portalTriggerLocation.center,
  //   };

  return room;
}

export function createRoom2(): Room {
  const room = {
    roomId: room2Id,
    tileGrid: tileGridAllSameTexture(16, 12, floorTexture3),
  };
  // down
  room.tileGrid.getTileAt(7, 11).portal = {
    to: {
      roomId: room1Id,
      tileCoords: {
        x: 7,
        y: 0,
      },
    },
    triggerLocation: portalTriggerLocation.down,
  };

  return room;
}

export function createRoom3(): Room {
  const room = {
    roomId: room3Id,
    tileGrid: tileGridAllSameTexture(16, 12, floorTexture4),
  };
  // left
  room.tileGrid.getTileAt(0, 5).portal = {
    to: {
      roomId: room1Id,
      tileCoords: {
        x: 15,
        y: 5,
      },
    },
    triggerLocation: portalTriggerLocation.left,
  };

  return room;
}

export function createRoom4(): Room {
  const room = {
    roomId: room4Id,
    tileGrid: tileGridAllSameTexture(16, 12, floorTexture5),
  };
  // up
  room.tileGrid.getTileAt(7, 0).portal = {
    to: {
      roomId: room1Id,
      tileCoords: {
        x: 7,
        y: 11,
      },
    },
    triggerLocation: portalTriggerLocation.up,
  };

  return room;
}

export function createRoom5(): Room {
  const room = {
    roomId: room5Id,
    tileGrid: tileGridAllSameTexture(16, 12, floorTexture1),
  };
  // right
  room.tileGrid.getTileAt(15, 6).portal = {
    to: {
      roomId: room1Id,
      tileCoords: {
        x: 0,
        y: 6,
      },
    },
    triggerLocation: portalTriggerLocation.right,
  };

  return room;
}

export function createRoom6(): Room {
  const room = {
    roomId: room6Id,
    tileGrid: tileGridAllSameTexture(16, 12, floorTexture1),
  };
  // warp
  room.tileGrid.getTileAt(3, 3).portal = {
    to: {
      roomId: room1Id,
      tileCoords: {
        x: 12,
        y: 9,
      },
    },
    triggerLocation: portalTriggerLocation.center,
  };

  return room;
}
