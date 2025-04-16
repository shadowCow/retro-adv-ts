import { GameEntity } from './GameEntity';

export type Inventory = {
  addItem(item: GameEntity): void;
  getItems(): Readonly<Array<Readonly<GameEntity>>>;
};

export function createInventory(): Inventory {
  const items: Array<GameEntity> = [];

  const inventory: Inventory = {
    addItem: function (item: GameEntity): void {
      items.push(item);
    },
    getItems: function (): Readonly<Array<Readonly<GameEntity>>> {
      return items;
    },
  };

  return inventory;
}
