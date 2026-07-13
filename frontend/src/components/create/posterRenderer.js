import Konva from 'konva';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../data/posterTemplates.js';

// Mirrors CSS background-size:cover — crops the source image to fill the box.
export function getCoverCrop(image, boxWidth, boxHeight) {
  const imageRatio = image.width / image.height;
  const boxRatio = boxWidth / boxHeight;
  let cropWidth = image.width;
  let cropHeight = image.height;
  let cropX = 0;
  let cropY = 0;

  if (imageRatio > boxRatio) {
    cropWidth = image.height * boxRatio;
    cropX = (image.width - cropWidth) / 2;
  } else {
    cropHeight = image.width / boxRatio;
    cropY = (image.height - cropHeight) / 2;
  }

  return { cropX, cropY, cropWidth, cropHeight };
}

export function loadImage(src) {
  return new Promise((resolve) => {
    if (!src) {
      resolve(null);
      return;
    }
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

// Renders a template's background + elements to a PNG data URL using a
// detached Konva stage (no React, no visible DOM). Used for bulk-generating
// many posters back to back, independent of the interactive editor canvas.
export async function renderPosterDataUrl(background, elements) {
  const container = document.createElement('div');
  const stage = new Konva.Stage({ container, width: CANVAS_WIDTH, height: CANVAS_HEIGHT });
  const layer = new Konva.Layer();
  stage.add(layer);

  const backgroundIsImage = /^(https?:|data:)/.test(background || '');
  const backgroundImage = backgroundIsImage ? await loadImage(background) : null;
  if (backgroundImage) {
    layer.add(
      new Konva.Image({
        image: backgroundImage,
        x: 0,
        y: 0,
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        crop: getCoverCrop(backgroundImage, CANVAS_WIDTH, CANVAS_HEIGHT),
      })
    );
  } else {
    layer.add(
      new Konva.Rect({
        x: 0,
        y: 0,
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        fill: backgroundIsImage ? '#f6f1e7' : background || '#f6f1e7',
      })
    );
  }

  for (const element of elements) {
    if (element.type === 'shape' || element.type === 'rect') {
      layer.add(
        new Konva.Rect({
          x: element.x,
          y: element.y,
          width: element.width,
          height: element.height,
          fill: element.fill,
        })
      );
      continue;
    }

    if (element.type === 'image') {
      const image = await loadImage(element.src);
      if (image) {
        const fit = element.fit || 'cover';
        layer.add(
          new Konva.Image({
            image,
            x: element.x,
            y: element.y,
            width: element.width,
            height: element.height,
            crop: fit === 'cover' ? getCoverCrop(image, element.width, element.height) : undefined,
          })
        );
      } else {
        layer.add(
          new Konva.Rect({
            x: element.x,
            y: element.y,
            width: element.width,
            height: element.height,
            fill: '#e9e2d3',
            stroke: '#d8cbaa',
            strokeWidth: 1,
            dash: [10, 8],
          })
        );
      }
      continue;
    }

    layer.add(
      new Konva.Text({
        text: element.text,
        x: element.x,
        y: element.y,
        width: element.width,
        fontSize: element.fontSize,
        fontFamily: element.fontFamily,
        fontStyle: element.fontWeight === 'bold' ? 'bold' : 'normal',
        fill: element.color,
        lineHeight: element.lineHeight || 1.3,
      })
    );
  }

  layer.draw();
  const dataUrl = stage.toDataURL({ pixelRatio: 2, mimeType: 'image/png' });
  stage.destroy();
  return dataUrl;
}
