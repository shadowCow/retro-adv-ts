import { useEffect, useReducer, useRef, useState } from 'react';
import classes from './App.module.css';
import { WorldView } from './ui/WorldView/WorldView';
import { loadTextures } from './adapters/Textures';
import { TextureCache } from './domain/TextureCache';
import { createInputControllerKeyboard } from './adapters/InputControllerKeyboard';
import { OverlayView } from './ui/OverlayView/OverlayView';
import { createGameWorld, GameWorld } from './domain/GameWorld';

export function App() {
  const [textureCache, setTextureCache] = useState<TextureCache>();
  const worldRef = useRef<GameWorld>(createGameWorld());
  const [isOverlayOn, setIsOverlayOn] = useState<boolean>(false);

  useEffect(() => {
    loadTextures().then((tc) => {
      console.log('setting texture cache', { keys: Object.keys(tc) });
      setTextureCache(tc);
    });
  }, []);

  if (textureCache) {
    return (
      <div className={classes.layout}>
        <WorldView
          world={worldRef.current}
          textureCache={textureCache}
          inputControllerKeyboard={createInputControllerKeyboard()}
          onPauseToggled={(v) => setIsOverlayOn(v)}
        />
        <OverlayView isVisible={isOverlayOn} world={worldRef.current} />
      </div>
    );
  } else {
    return (
      <div className={classes.layout}>
        <LoadingView />
      </div>
    );
  }
}

function LoadingView() {
  return <div className={classes.loading}>Loading...</div>;
}
