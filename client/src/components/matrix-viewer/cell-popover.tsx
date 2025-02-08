import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CellPosition } from "@/lib/matrix-utils";

interface CellPopoverProps {
  cell: CellPosition;
  x: number;
  y: number;
}

export function CellPopover({ cell, x, y }: CellPopoverProps) {
  return (
    <Popover open>
      <PopoverTrigger asChild>
        <div className="absolute" style={{ left: x, top: y }} />
      </PopoverTrigger>
      <PopoverContent
        className="w-48"
        side="right"
        sideOffset={5}
      >
        <div className="space-y-2">
          <p>Row: {cell.row}</p>
          <p>Column: {cell.col}</p>
          <p>Value: {cell.value.toFixed(4)}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
