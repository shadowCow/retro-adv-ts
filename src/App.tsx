import { useEffect, useState } from 'react';
import classes from './App.module.css';
import { WorldView } from './ui/WorldView/WorldView';
import { loadTextures } from './adapters/Textures';
import { TextureCache } from './domain/TextureCache';
import { createInputControllerKeyboard } from './adapters/InputControllerKeyboard';

function App() {
  const [textureCache, setTextureCache] = useState<TextureCache>();

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
          textureCache={textureCache}
          inputControllerKeyboard={createInputControllerKeyboard()}
        />
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

export default App;
