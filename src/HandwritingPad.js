import React, { useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';

const DrawingArea = () => {
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const lastLine = useRef([]);
  const [strokeColor, setStrokeColor] = useState('black');

  const handleMouseDown = (event) => {
    isDrawing.current = true;
    const pos = event.target.getStage().getPointerPosition();
    lastLine.current = [pos.x, pos.y];
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleMouseMove = (event) => {
    if (!isDrawing.current) {
      return;
    }

    const stage = event.target.getStage();
    const point = stage.getPointerPosition();
    const newLine = lastLine.current.concat([point.x, point.y]);

    setLines([...lines, newLine]);
    lastLine.current = [point.x, point.y];
  };

  const handleClear = () => {
    setLines([]);
  };

  const handleColorChange = (color) => {
    setStrokeColor(color);
  };

  return (
    <div>
      <div>
        <button onClick={handleClear}>Clear</button>
        <button onClick={() => handleColorChange('black')}>Black</button>
        <button onClick={() => handleColorChange('red')}>Red</button>
        <button onClick={() => handleColorChange('blue')}>Blue</button>
        {/* Add more color buttons as needed */}
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line key={i} points={line} stroke={strokeColor} strokeWidth={2} tension={0.5} lineCap="round" />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default DrawingArea;
