import { JSX, useEffect, useRef } from 'react';
import { GameRenderer } from '../../domain/ports/GameRenderer';
import { createGameRendererCanvas } from '../../adapters/GameRendererCanvas';
import classes from './WorldView.module.css';
import { GameWorld } from '../../domain/GameWorld';
import { gameUpdate } from '../../domain/GameUpdate';
import {
  ControllerKeys,
  InputControllerKeyboard,
} from '../../adapters/InputControllerKeyboard';
import { TextureCache } from '../../domain/TextureCache';

/**
 * WorldView is the canvas container which is responsible for rendering the game world.
 *
 * It includes logic to handle the game loop and input.
 *
 * @param props
 * @returns
 */
export function WorldView(props: {
  world: GameWorld;
  textureCache: TextureCache;
  inputControllerKeyboard: InputControllerKeyboard;
  onPauseToggled: (v: boolean) => void;
}): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number>(null);
  const lastTimestampRef = useRef<number>(0);
  const keysRef = useRef<ControllerKeys>({});
  const gameRendererRef = useRef<GameRenderer>(null);
  const lastFramePausedRef = useRef<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log('keydown', e.key);
      keysRef.current[e.key] = true;
      e.preventDefault();
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
      console.log('keyup', e.key);
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

          const actions = props.inputControllerKeyboard.keysToControlActions({
            ...keysRef.current,
          });
          gameUpdate(dt, props.world, actions);
          if (props.world.isPaused !== lastFramePausedRef.current) {
            props.onPauseToggled(props.world.isPaused);
          }
          lastFramePausedRef.current = props.world.isPaused;

          if (gameRendererRef.current !== null && !props.world.isPaused) {
            gameRendererRef.current.render(
              dt,
              canvas.offsetWidth,
              canvas.offsetHeight,
              props.world,
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
