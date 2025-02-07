import { useEffect, useRef, useState } from "react";
import { ViewportState, CellPosition, drawMatrix, getCellAtPosition } from "@/lib/matrix-utils";

interface MatrixCanvasProps {
  data: number[][];
  onCellSelect?: (cell: CellPosition) => void;
}

export function MatrixCanvas({ data, onCellSelect }: MatrixCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [viewport, setViewport] = useState<ViewportState>({
    scale: 1,
    offsetX: 0,
    offsetY: 0
  });
  const [selectedCell, setSelectedCell] = useState<CellPosition>();
  const [isDragging, setIsDragging] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      drawMatrix(ctx, data, viewport, canvas.width, canvas.height, selectedCell);
    };

    render();
  }, [data, viewport, selectedCell]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const scaleChange = e.deltaY > 0 ? 0.9 : 1.1;
    
    setViewport(prev => ({
      scale: Math.min(Math.max(0.1, prev.scale * scaleChange), 5),
      offsetX: prev.offsetX,
      offsetY: prev.offsetY
    }));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - lastPosition.x;
    const dy = e.clientY - lastPosition.y;

    setViewport(prev => ({
      ...prev,
      offsetX: prev.offsetX + dx,
      offsetY: prev.offsetY + dy
    }));

    setLastPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    setIsDragging(false);

    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cell = getCellAtPosition(x, y, viewport, data);
    if (cell) {
      setSelectedCell(cell);
      onCellSelect?.(cell);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="border border-gray-300 rounded-lg cursor-move"
    />
  );
}
