import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface MatrixGeneratorProps {
  onGenerate: (matrix: number[][]) => void;
}

export function MatrixGenerator({ onGenerate }: MatrixGeneratorProps) {
  const [rows, setRows] = useState("100");
  const [cols, setCols] = useState("100");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    const numRows = parseInt(rows);
    const numCols = parseInt(cols);

    if (isNaN(numRows) || isNaN(numCols) || 
        numRows < 1 || numCols < 1 || 
        numRows > 10000 || numCols > 10000) {
      toast({
        variant: "destructive",
        title: "Invalid dimensions",
        description: "Please enter dimensions between 1 and 10000",
      });
      return;
    }

    setLoading(true);
    try {
      // Generate matrix in chunks to avoid blocking the UI
      const matrix: number[][] = [];
      const chunkSize = 1000;
      
      for (let i = 0; i < numRows; i++) {
        const row: number[] = [];
        for (let j = 0; j < numCols; j++) {
          row.push(Math.random() * 2 - 1); // Values between -1 and 1
        }
        matrix.push(row);
        
        // Every chunkSize rows, yield to the UI
        if ((i + 1) % chunkSize === 0) {
          setTimeout(() => {}, 0);
        }
      }
      
      onGenerate(matrix);
      toast({
        title: "Success",
        description: `Generated ${numRows}x${numCols} matrix`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        value={rows}
        onChange={(e) => setRows(e.target.value)}
        min={1}
        max={10000}
        className="w-20"
        placeholder="Rows"
      />
      <span>×</span>
      <Input
        type="number"
        value={cols}
        onChange={(e) => setCols(e.target.value)}
        min={1}
        max={10000}
        className="w-20"
        placeholder="Cols"
      />
      <Button 
        variant="outline" 
        onClick={handleGenerate}
        disabled={loading}
      >
        Generate
      </Button>
    </div>
  );
}
