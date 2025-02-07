import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MatrixCanvas } from "@/components/matrix-viewer/canvas";
import { Controls } from "@/components/matrix-viewer/controls";
import { CellPosition } from "@/lib/matrix-utils";

// Sample matrix data
const sampleMatrix = Array.from({ length: 100 }, () =>
  Array.from({ length: 100 }, () => Math.random() * 2 - 1)
);

export default function Home() {
  const [scale, setScale] = useState(1);
  const [selectedCell, setSelectedCell] = useState<CellPosition>();
  const [showLowerTriangle, setShowLowerTriangle] = useState(false);
  const [matrix, setMatrix] = useState(sampleMatrix);

  const handleZoomIn = () => setScale(prev => Math.min(5, prev * 1.1));
  const handleZoomOut = () => setScale(prev => Math.max(0.1, prev * 0.9));
  const handleReset = () => setScale(1);

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Matrix Viewer</h1>
          <Controls
            scale={scale}
            onScaleChange={setScale}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onReset={handleReset}
            showLowerTriangle={showLowerTriangle}
            onToggleLowerTriangle={setShowLowerTriangle}
            onMatrixLoad={setMatrix}
            matrix={matrix}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-4">
                <MatrixCanvas
                  data={matrix}
                  scale={scale}
                  showLowerTriangle={showLowerTriangle}
                  onCellSelect={setSelectedCell}
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Cell Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedCell ? (
                  <div className="space-y-2">
                    <p>Row: {selectedCell.row}</p>
                    <p>Column: {selectedCell.col}</p>
                    <p>Value: {selectedCell.value.toFixed(4)}</p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Click on a cell to view details
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}