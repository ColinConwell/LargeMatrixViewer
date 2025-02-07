import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FileUpload } from "./file-upload";
import { MatrixGenerator } from "./matrix-generator";
import { MatrixDownload } from "./matrix-download";
import { Separator } from "@/components/ui/separator";

interface ControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  scale: number;
  onScaleChange: (value: number) => void;
  showLowerTriangle: boolean;
  onToggleLowerTriangle: (checked: boolean) => void;
  onMatrixLoad: (matrix: number[][]) => void;
  matrix: number[][];
}

export function Controls({ 
  onZoomIn, 
  onZoomOut, 
  onReset, 
  scale, 
  onScaleChange,
  showLowerTriangle,
  onToggleLowerTriangle,
  onMatrixLoad,
  matrix
}: ControlsProps) {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>

          <Slider
            min={0.1}
            max={5}
            step={0.1}
            value={[scale]}
            onValueChange={(values) => onScaleChange(values[0])}
            className="w-[200px]"
          />

          <Button variant="outline" size="icon" onClick={onZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" onClick={onReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-8" />

          <div className="flex items-center gap-2">
            <Switch
              id="lower-triangle"
              checked={showLowerTriangle}
              onCheckedChange={onToggleLowerTriangle}
            />
            <Label htmlFor="lower-triangle">Lower Triangle</Label>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <MatrixGenerator onGenerate={onMatrixLoad} />
          <Separator orientation="vertical" className="h-8" />
          <FileUpload onMatrixLoad={onMatrixLoad} />
          <Separator orientation="vertical" className="h-8" />
          <MatrixDownload matrix={matrix} />
        </div>
      </div>
    </Card>
  );
}