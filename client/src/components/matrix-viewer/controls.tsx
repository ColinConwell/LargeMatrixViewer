import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface ControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  scale: number;
  onScaleChange: (value: number) => void;
}

export function Controls({ onZoomIn, onZoomOut, onReset, scale, onScaleChange }: ControlsProps) {
  return (
    <Card className="p-4 flex items-center gap-4">
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
    </Card>
  );
}
