import { useEffect, useRef, useState } from "react";
import { ViewportState, CellPosition, drawMatrix, getCellAtPosition } from "@/lib/matrix-utils";
import { CellPopover } from "./cell-popover";

interface MatrixCanvasProps {
  data: number[][];
  scale?: number;
  showLowerTriangle?: boolean;
  showUpperTriangle?: boolean;
  showHover?: boolean;
  onCellSelect?: (cell: CellPosition) => void;
}

export function MatrixCanvas({ 
  data, 
  scale = 1, 
  showLowerTriangle = false,
  showUpperTriangle = false,
  showHover = false,
  onCellSelect 
}: MatrixCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [viewport, setViewport] = useState<ViewportState>({
    scale: scale,
    offsetX: 0,
    offsetY: 0
  });
  const [selectedCell, setSelectedCell] = useState<CellPosition>();
  const [hoveredCell, setHoveredCell] = useState<CellPosition>();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  // Update viewport when scale prop changes
  useEffect(() => {
    setViewport(prev => ({
      ...prev,
      scale: scale
    }));
  }, [scale]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      drawMatrix(
        ctx, 
        data, 
        viewport, 
        canvas.width, 
        canvas.height, 
        selectedCell, 
        showLowerTriangle,
        showUpperTriangle
      );
    };

    render();
  }, [data, viewport, selectedCell, showLowerTriangle, showUpperTriangle]);

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
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x: e.clientX, y: e.clientY });

    if (isDragging) {
      const dx = e.clientX - lastPosition.x;
      const dy = e.clientY - lastPosition.y;

      setViewport(prev => ({
        ...prev,
        offsetX: prev.offsetX + dx,
        offsetY: prev.offsetY + dy
      }));

      setLastPosition({ x: e.clientX, y: e.clientY });
      setHoveredCell(undefined);
    } else if (showHover) {
      const cell = getCellAtPosition(x, y, viewport, data, showLowerTriangle, showUpperTriangle);
      setHoveredCell(cell);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    setIsDragging(false);

    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cell = getCellAtPosition(x, y, viewport, data, showLowerTriangle, showUpperTriangle);
    if (cell) {
      setSelectedCell(cell);
      onCellSelect?.(cell);
    }
  };

  const handleMouseLeave = () => {
    setHoveredCell(undefined);
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="border border-gray-300 rounded-lg cursor-move"
      />
      {showHover && hoveredCell && (
        <CellPopover
          cell={hoveredCell}
          x={mousePos.x}
          y={mousePos.y}
        />
      )}
    </div>
  );
}