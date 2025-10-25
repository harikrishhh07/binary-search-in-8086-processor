import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Search } from "lucide-react";

export const MemoryViewer = () => {
  const [startAddress, setStartAddress] = useState("0000");
  const [highlightedAddress, setHighlightedAddress] = useState<number | null>(null);

  // Generate sample memory content
  const generateMemoryData = () => {
    const data: Array<{ address: string; values: string[] }> = [];
    const start = parseInt(startAddress, 16);
    
    for (let i = 0; i < 16; i++) {
      const address = (start + i * 16).toString(16).toUpperCase().padStart(4, '0');
      const values = Array.from({ length: 16 }, () => 
        Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0')
      );
      data.push({ address, values });
    }
    return data;
  };

  const [memoryData, setMemoryData] = useState(generateMemoryData());

  const handleSearch = () => {
    setMemoryData(generateMemoryData());
  };

  return (
    <Card className="p-6 bg-card border-glow-amber">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold mb-2 text-glow-amber">Memory Viewer</h3>
          <p className="text-sm text-muted-foreground">Hexadecimal Memory Contents</p>
        </div>

        <div className="flex gap-2">
          <Input
            value={startAddress}
            onChange={(e) => setStartAddress(e.target.value.toUpperCase())}
            placeholder="0000"
            className="font-mono bg-input border-border"
            maxLength={4}
          />
          <Button 
            onClick={handleSearch}
            className="bg-accent hover:bg-accent-glow text-accent-foreground"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>

        <div className="bg-muted/30 p-4 rounded-lg border border-border/50 overflow-x-auto">
          <div className="font-mono text-xs space-y-1">
            {/* Header */}
            <div className="flex gap-2 text-muted-foreground mb-2 pb-2 border-b border-border/50">
              <span className="w-16">ADDR</span>
              {Array.from({ length: 16 }, (_, i) => (
                <span key={i} className="w-6 text-center">
                  {i.toString(16).toUpperCase()}
                </span>
              ))}
            </div>

            {/* Memory rows */}
            {memoryData.map((row, rowIndex) => (
              <div 
                key={rowIndex} 
                className="flex gap-2 hover:bg-primary/10 p-1 rounded transition-colors"
              >
                <span className="w-16 text-primary font-bold">{row.address}</span>
                {row.values.map((value, colIndex) => {
                  const cellIndex = rowIndex * 16 + colIndex;
                  return (
                    <span
                      key={colIndex}
                      className={`w-6 text-center cursor-pointer transition-all ${
                        highlightedAddress === cellIndex
                          ? "bg-accent text-accent-foreground rounded"
                          : "hover:bg-primary/20 rounded"
                      }`}
                      onClick={() => setHighlightedAddress(cellIndex)}
                    >
                      {value}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          Click any byte to highlight • Total: 256 bytes displayed
        </div>
      </div>
    </Card>
  );
};
