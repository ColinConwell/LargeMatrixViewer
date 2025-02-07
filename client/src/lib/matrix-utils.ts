export interface ViewportState {
  scale: number;
  offsetX: number;
  offsetY: number;
}

export interface CellPosition {
  row: number;
  col: number;
  value: number;
}

export function drawMatrix(
  ctx: CanvasRenderingContext2D,
  data: number[][],
  viewport: ViewportState,
  width: number,
  height: number,
  selectedCell?: CellPosition
) {
  ctx.clearRect(0, 0, width, height);
  
  const cellSize = 40 * viewport.scale;
  const startRow = Math.max(0, Math.floor(-viewport.offsetY / cellSize));
  const startCol = Math.max(0, Math.floor(-viewport.offsetX / cellSize));
  const endRow = Math.min(data.length, Math.ceil((height - viewport.offsetY) / cellSize));
  const endCol = Math.min(data[0].length, Math.ceil((width - viewport.offsetX) / cellSize));

  // Draw visible cells
  for (let i = startRow; i < endRow; i++) {
    for (let j = startCol; j < endCol; j++) {
      const x = j * cellSize + viewport.offsetX;
      const y = i * cellSize + viewport.offsetY;
      
      // Calculate color based on value
      const value = data[i][j];
      const normalizedValue = (value + 1) / 2; // Assuming values are between -1 and 1
      const hue = normalizedValue * 240;
      
      ctx.fillStyle = `hsl(${hue}, 70%, 70%)`;
      ctx.fillRect(x, y, cellSize, cellSize);
      
      // Draw border
      ctx.strokeStyle = "#ccc";
      ctx.strokeRect(x, y, cellSize, cellSize);

      // Highlight selected cell
      if (selectedCell && selectedCell.row === i && selectedCell.col === j) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, cellSize, cellSize);
        ctx.lineWidth = 1;
      }

      // Draw value
      if (cellSize > 25) {
        ctx.fillStyle = "black";
        ctx.font = `${Math.min(12, cellSize/3)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(value.toFixed(2), x + cellSize/2, y + cellSize/2);
      }
    }
  }
}

export function getCellAtPosition(
  x: number,
  y: number,
  viewport: ViewportState,
  data: number[][]
): CellPosition | undefined {
  const cellSize = 40 * viewport.scale;
  const row = Math.floor((y - viewport.offsetY) / cellSize);
  const col = Math.floor((x - viewport.offsetX) / cellSize);
  
  if (row >= 0 && row < data.length && col >= 0 && col < data[0].length) {
    return {
      row,
      col,
      value: data[row][col]
    };
  }
  return undefined;
}
