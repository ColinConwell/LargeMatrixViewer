import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onMatrixLoad: (matrix: number[][]) => void;
}

export function FileUpload({ onMatrixLoad }: FileUploadProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const text = await file.text();
      let matrix: number[][];

      if (file.name.endsWith('.json')) {
        matrix = JSON.parse(text);
        if (!Array.isArray(matrix) || !Array.isArray(matrix[0])) {
          throw new Error('Invalid matrix format');
        }
      } else if (file.name.endsWith('.csv')) {
        matrix = text.trim().split('\n').map(line => 
          line.split(',').map(num => {
            const parsed = parseFloat(num.trim());
            if (isNaN(parsed)) throw new Error('Invalid number in CSV');
            return parsed;
          })
        );
      } else {
        throw new Error('Unsupported file format. Please upload .json or .csv files');
      }

      // Validate matrix dimensions
      const width = matrix[0].length;
      if (!matrix.every(row => row.length === width)) {
        throw new Error('Matrix must have consistent dimensions');
      }

      onMatrixLoad(matrix);
      toast({
        title: "Success",
        description: `Loaded matrix with dimensions ${matrix.length}x${matrix[0].length}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to load matrix",
      });
    } finally {
      setLoading(false);
      event.target.value = ''; // Reset input
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        accept=".json,.csv"
        onChange={handleFileUpload}
        className="hidden"
        id="matrix-upload"
        disabled={loading}
      />
      <label htmlFor="matrix-upload">
        <Button variant="outline" size="icon" disabled={loading} asChild>
          <span>
            <Upload className="h-4 w-4" />
          </span>
        </Button>
      </label>
    </div>
  );
}
