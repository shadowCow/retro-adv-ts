import { Vec2 } from './Vec2';

export type Portal = {
  to: WorldLocation;
  triggerLocation: PortalTriggerLocation;
};

export const portalTriggerLocation = Object.freeze({
  up: 'up',
  right: 'right',
  down: 'down',
  left: 'left',
  center: 'center',
});
export type PortalTriggerLocation =
  (typeof portalTriggerLocation)[keyof typeof portalTriggerLocation];

export type WorldLocation = {
  roomId: string;
  tileCoords: Vec2;
};
