import { playerSpriteSheetId } from '../domain/SpriteSheets';
import { TextureCache } from '../domain/TextureCache';

const spriteSheetIds: Array<string> = [playerSpriteSheetId];

export function loadTextures(): Promise<TextureCache> {
  console.log('loadTextures');
  return new Promise<TextureCache>((resolve, _) => {
    const textureCache: TextureCache = {};

    const imagePromises = spriteSheetIds.map((id) =>
      loadImage(urlFromSpriteSheetId(id))
        .then((i) => createImageBitmap(i))
        .then((bmap) => (textureCache[id] = bmap)),
    );

    Promise.all(imagePromises)
      .then((_) => resolve(textureCache))
      .then((_) => console.log('all loaded'));
  });
}

function urlFromSpriteSheetId(id: string): string {
  return `/${id}.png`;
}

function loadImage(path: string): Promise<HTMLImageElement> {
  console.log('loading', path);
  return new Promise<HTMLImageElement>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = path;
  });
}
