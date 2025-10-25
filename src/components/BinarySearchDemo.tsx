import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search, Play, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export const BinarySearchDemo = () => {
  const sortedArray = [5, 12, 18, 23, 31, 45, 58, 67, 74, 89, 95];
  const [searchValue, setSearchValue] = useState("45");
  const [left, setLeft] = useState<number | null>(null);
  const [right, setRight] = useState<number | null>(null);
  const [mid, setMid] = useState<number | null>(null);
  const [found, setFound] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [steps, setSteps] = useState<string[]>([]);

  const performSearch = async () => {
    const target = parseInt(searchValue);
    if (isNaN(target)) {
      toast.error("Please enter a valid number");
      return;
    }

    setIsSearching(true);
    setFound(null);
    setSteps([]);
    
    let l = 0;
    let r = sortedArray.length - 1;
    const searchSteps: string[] = [];

    while (l <= r) {
      setLeft(l);
      setRight(r);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const m = Math.floor((l + r) / 2);
      setMid(m);
      searchSteps.push(`Checking middle index ${m}: value = ${sortedArray[m]}`);
      setSteps([...searchSteps]);
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (sortedArray[m] === target) {
        setFound(m);
        searchSteps.push(`✓ Found ${target} at index ${m}!`);
        setSteps([...searchSteps]);
        toast.success(`Found ${target} at index ${m}!`);
        break;
      } else if (sortedArray[m] < target) {
        searchSteps.push(`${sortedArray[m]} < ${target}, searching right half`);
        setSteps([...searchSteps]);
        l = m + 1;
      } else {
        searchSteps.push(`${sortedArray[m]} > ${target}, searching left half`);
        setSteps([...searchSteps]);
        r = m - 1;
      }
    }

    if (found === null && l > r) {
      searchSteps.push(`✗ Value ${target} not found in array`);
      setSteps([...searchSteps]);
      toast.error(`Value ${target} not found`);
    }

    setIsSearching(false);
  };

  const reset = () => {
    setLeft(null);
    setRight(null);
    setMid(null);
    setFound(null);
    setSteps([]);
    setIsSearching(false);
  };

  return (
    <section id="binary-search" className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-glow-cyan">
          Binary Search Algorithm
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Visualize how the 8086 performs efficient searching with O(log n) complexity
        </p>
      </div>

      <Card className="p-8 bg-card border-glow-amber">
        <div className="space-y-6">
          <div className="flex gap-4 items-center justify-center">
            <Input
              type="number"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Enter value to search"
              className="w-48 font-mono bg-input border-border"
              disabled={isSearching}
            />
            <Button
              onClick={performSearch}
              disabled={isSearching}
              className="bg-accent hover:bg-accent-glow text-accent-foreground"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button
              onClick={reset}
              variant="outline"
              className="border-border hover:bg-muted"
              disabled={isSearching}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          <div className="flex gap-2 justify-center flex-wrap">
            {sortedArray.map((value, index) => (
              <div
                key={index}
                className={`w-16 h-16 flex items-center justify-center rounded-lg border-2 font-mono font-bold transition-all ${
                  found === index
                    ? "border-success bg-success/30 text-success scale-110 shadow-[0_0_30px_hsl(140_80%_50%/0.6)]"
                    : mid === index
                    ? "border-primary bg-primary/30 text-primary animate-data-pulse border-glow-cyan"
                    : left !== null && right !== null && index >= left && index <= right
                    ? "border-accent bg-accent/20 text-accent"
                    : "border-border bg-secondary/30 text-muted-foreground"
                }`}
              >
                {value}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-3 rounded-lg bg-muted/50 border border-border/50 text-center">
              <div className="text-xs text-muted-foreground mb-1">Left Index</div>
              <div className="font-mono text-xl font-bold text-accent">
                {left !== null ? left : "-"}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-primary/20 border-2 border-primary text-center">
              <div className="text-xs text-muted-foreground mb-1">Middle Index</div>
              <div className="font-mono text-xl font-bold text-primary">
                {mid !== null ? mid : "-"}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 border border-border/50 text-center">
              <div className="text-xs text-muted-foreground mb-1">Right Index</div>
              <div className="font-mono text-xl font-bold text-accent">
                {right !== null ? right : "-"}
              </div>
            </div>
          </div>

          {steps.length > 0 && (
            <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
              <h4 className="font-mono text-sm mb-2 text-primary">Execution Steps:</h4>
              <div className="space-y-1 text-sm font-mono">
                {steps.map((step, index) => (
                  <div key={index} className="text-muted-foreground">
                    {index + 1}. {step}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </section>
  );
};
