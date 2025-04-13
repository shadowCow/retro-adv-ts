import { useEffect, useState } from 'react';
import classes from './App.module.css';
import { GameView } from './ui/GameView/GameView';
import { loadTextures } from './adapters/Textures';
import { TextureCache } from './domain/TextureCache';

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
        <GameView textureCache={textureCache} />
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
