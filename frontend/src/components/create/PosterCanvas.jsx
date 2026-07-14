'use client';

import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect, Text, Image as KonvaImage, Transformer } from 'react-konva';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../data/posterTemplates.js';

function useHtmlImage(src) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!src) {
      setImage(null);
      return undefined;
    }
    let cancelled = false;
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (!cancelled) setImage(img);
    };
    img.onerror = () => {
      if (!cancelled) setImage(null);
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  return image;
}

// Mirrors CSS background-size:cover — crops the source image to fill the box.
function getCoverCrop(image, boxWidth, boxHeight) {
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

function PosterImage({ element, isSelected, interactive, onSelect, onChange }) {
  const image = useHtmlImage(element.src);
  const shapeRef = useRef(null);
  const trRef = useRef(null);

  useEffect(() => {
    if (interactive && isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected, interactive]);

  const crop = image && (element.fit || 'cover') === 'cover' ? getCoverCrop(image, element.width, element.height) : null;

  return (
    <>
      <Rect
        x={element.x}
        y={element.y}
        width={element.width}
        height={element.height}
        fill="#e9e2d3"
        stroke={isSelected ? '#b08b57' : '#d8cbaa'}
        strokeWidth={isSelected ? 2 : 1}
        dash={[10, 8]}
        onClick={interactive ? onSelect : undefined}
        onTap={interactive ? onSelect : undefined}
        listening={interactive && !image}
      />
      {image && (
        <KonvaImage
          ref={shapeRef}
          image={image}
          x={element.x}
          y={element.y}
          width={element.width}
          height={element.height}
          crop={crop || undefined}
          draggable={interactive}
          listening={interactive}
          onClick={onSelect}
          onTap={onSelect}
          onDragEnd={(e) => onChange({ x: e.target.x(), y: e.target.y() })}
          onTransformEnd={() => {
            const node = shapeRef.current;
            if (!node) return;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              x: node.x(),
              y: node.y(),
              width: Math.max(40, node.width() * scaleX),
              height: Math.max(40, node.height() * scaleY),
            });
          }}
        />
      )}
      {interactive && isSelected && image && (
        <Transformer
          ref={trRef}
          rotateEnabled={false}
          boundBoxFunc={(oldBox, newBox) => (newBox.width < 60 || newBox.height < 60 ? oldBox : newBox)}
        />
      )}
    </>
  );
}

function PosterText({ element, isSelected, interactive, onSelect, onChange }) {
  return (
    <Text
      text={element.text}
      x={element.x}
      y={element.y}
      width={element.width}
      fontSize={element.fontSize}
      fontFamily={element.fontFamily}
      fontStyle={element.fontStyle || 'normal'}
      fill={element.fill}
      lineHeight={element.lineHeight || 1.3}
      draggable={interactive}
      listening={interactive}
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={(e) => onChange({ x: e.target.x(), y: e.target.y() })}
      stroke={isSelected ? '#b08b57' : undefined}
      strokeWidth={isSelected ? 0.7 : 0}
    />
  );
}

export default function PosterCanvas({
  stageRef,
  elements,
  background,
  selectedId = null,
  onSelect,
  onChange,
  containerWidth,
  interactive = true,
}) {
  const scale = containerWidth ? containerWidth / CANVAS_WIDTH : 1;

  return (
    <Stage
      ref={stageRef}
      width={CANVAS_WIDTH * scale}
      height={CANVAS_HEIGHT * scale}
      scaleX={scale}
      scaleY={scale}
      onMouseDown={(e) => {
        if (interactive && e.target === e.target.getStage()) onSelect?.(null);
      }}
      onTouchStart={(e) => {
        if (interactive && e.target === e.target.getStage()) onSelect?.(null);
      }}
      listening={interactive}
    >
      <Layer>
        <Rect x={0} y={0} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} fill={background} listening={false} />
        {elements.map((element) => {
          if (element.type === 'rect') {
            return (
              <Rect
                key={element.id}
                x={element.x}
                y={element.y}
                width={element.width}
                height={element.height}
                fill={element.fill}
                listening={false}
              />
            );
          }
          if (element.type === 'image') {
            return (
              <PosterImage
                key={element.id}
                element={element}
                interactive={interactive}
                isSelected={selectedId === element.id}
                onSelect={() => onSelect?.(element.id)}
                onChange={(patch) => onChange?.(element.id, patch)}
              />
            );
          }
          return (
            <PosterText
              key={element.id}
              element={element}
              interactive={interactive}
              isSelected={selectedId === element.id}
              onSelect={() => onSelect?.(element.id)}
              onChange={(patch) => onChange?.(element.id, patch)}
            />
          );
        })}
      </Layer>
    </Stage>
  );
}
