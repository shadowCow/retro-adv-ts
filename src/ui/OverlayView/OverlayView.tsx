import { JSX, useReducer } from 'react';
import classes from './OverlayView.module.css';
import { GameWorld } from '../../domain/GameWorld';
import { adt, assertNever } from '@cow-sunday/fp-ts';
import { Inventory } from '../../domain/Inventory';
import { GameEntity } from '../../domain/GameEntity';

export function OverlayView(props: {
  isVisible: boolean;
  world: GameWorld;
}): JSX.Element {
  console.log('rendered', { props });

  if (!props.isVisible) {
    return <></>;
  } else {
    return (
      <div className={classes.layout}>
        <MenuView world={props.world} />
      </div>
    );
  }
}

function MenuView(props: { world: GameWorld }): JSX.Element {
  const [menuState, menuDispatch] = useReducer(menuReducer, initialMenuState());

  switch (menuState.current) {
    case menuKind.main:
      return <MainMenuView menuDispatch={menuDispatch} />;
    case menuKind.inventory:
      return <InventoryView menuDispatch={menuDispatch} world={props.world} />;
    default:
      assertNever(menuState.current);
  }
}

function MainMenuView(props: { menuDispatch: MenuDispatch }): JSX.Element {
  return (
    <div className={classes.mainMenu}>
      <p>This is the main menu</p>
      <button onClick={() => props.menuDispatch(toInventory())}>
        Inventory
      </button>
    </div>
  );
}

function InventoryView(props: {
  menuDispatch: MenuDispatch;
  world: GameWorld;
}): JSX.Element {
  return (
    <div className={classes.inventory}>
      <p>This is the inventory</p>
      <div>
        <InventoryItemsView inventory={props.world.player.getInventory()} />
      </div>
      <button onClick={() => props.menuDispatch(toMain())}>Main Menu</button>
    </div>
  );
}

function InventoryItemsView(props: {
  inventory: Inventory | undefined;
}): JSX.Element {
  if (props.inventory === undefined) {
    return <></>;
  }

  return (
    <>
      {props.inventory.getItems().map((item) => (
        <ItemView item={item} />
      ))}
    </>
  );
}

function ItemView(props: { item: Readonly<GameEntity> }): JSX.Element {
  return <div>an item</div>;
}

type MenuState = {
  current: MenuKind;
};
const menuKind = Object.freeze({
  main: 'main',
  inventory: 'inventory',
});
type MenuKind = (typeof menuKind)[keyof typeof menuKind];

function initialMenuState(): MenuState {
  return {
    current: menuKind.main,
  };
}

type MenuAction = ToMain | ToInventory;

export const toMain = adt<'ToMain', void>('ToMain');
export type ToMain = ReturnType<typeof toMain>;

export const toInventory = adt<'ToInventory', void>('ToInventory');
export type ToInventory = ReturnType<typeof toInventory>;

function menuReducer(_state: MenuState, action: MenuAction): MenuState {
  switch (action.kind) {
    case toMain.kind:
      return { current: menuKind.main };
    case toInventory.kind:
      return { current: menuKind.inventory };
    default:
      assertNever(action);
  }
}

type MenuDispatch = (a: MenuAction) => void;
