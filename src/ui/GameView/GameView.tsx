import { JSX, useEffect, useRef } from 'react';
import { GameRenderer } from '../../domain/ports/GameRenderer';
import { createGameRendererCanvas } from '../../adapters/GameRendererCanvas';
import classes from './GameView.module.css';
import { createGameWorld, GameWorld } from '../../domain/GameWorld';
import { gameUpdate } from '../../domain/GameUpdate';
import {
  ControllerKeys,
  keysToControlActions,
} from '../../adapters/InputControllerKeyboard';
import { TextureCache } from '../../domain/TextureCache';

export function GameView(props: { textureCache: TextureCache }): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number>(null);
  const lastTimestampRef = useRef<number>(0);
  const keysRef = useRef<ControllerKeys>({});
  const gameRendererRef = useRef<GameRenderer>(null);
  const worldRef = useRef<GameWorld>(createGameWorld());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // console.log('keydown', e.key);
      keysRef.current[e.key] = true;
      e.preventDefault();
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
      // console.log('keydown', e.key);
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp);

    const canvas = canvasRef.current;
    if (canvas !== null) {
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const ctx = canvas.getContext('2d');
      if (ctx !== null) {
        gameRendererRef.current = createGameRendererCanvas(ctx);

        const loop = (time: number) => {
          // raw dt is in milliseconds
          const dtMs =
            lastTimestampRef.current === 0
              ? 0
              : time - lastTimestampRef.current;

          const dt = dtMs / 1000; // convert to seconds

          lastTimestampRef.current = time;

          const actions = keysToControlActions(keysRef.current);
          gameUpdate(dt, worldRef.current, actions);

          if (gameRendererRef.current !== null) {
            gameRendererRef.current.render(
              dt,
              canvas.offsetWidth,
              canvas.offsetHeight,
              worldRef.current,
              props.textureCache,
            );
          }

          animationFrameIdRef.current = requestAnimationFrame(loop);
        };

        animationFrameIdRef.current = requestAnimationFrame(loop);
      } else {
        console.error('missing canvas context 2d');
      }
    } else {
      console.error('missing canvas element');
    }

    // Cleanup on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);

      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  return (
    <div className={classes.gameSurface}>
      <canvas ref={canvasRef} id="game-surface"></canvas>
    </div>
  );
}
