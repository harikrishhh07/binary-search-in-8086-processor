import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface SearchComparisonProps {
  arraySize: number;
  binarySteps: number;
  binaryCycles: number;
}

export const SearchComparison = ({ arraySize, binarySteps, binaryCycles }: SearchComparisonProps) => {
  const linearSteps = arraySize;
  const linearCycles = arraySize * 10;

  const data = [
    {
      name: "Steps",
      Linear: linearSteps,
      Binary: binarySteps,
    },
    {
      name: "Clock Cycles",
      Linear: linearCycles,
      Binary: binaryCycles,
    },
  ];

  return (
    <Card className="p-6 bg-card border-glow-cyan">
      <h4 className="font-mono text-lg text-primary mb-4">LINEAR vs BINARY SEARCH</h4>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
          <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Bar dataKey="Linear" fill="hsl(var(--destructive))" />
          <Bar dataKey="Binary" fill="hsl(var(--success))" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center">
        <p className="text-sm text-success font-mono">
          Binary is {((linearSteps / Math.max(binarySteps, 1))).toFixed(1)}x faster in steps
        </p>
        <p className="text-xs text-muted-foreground mt-1">O(log n) vs O(n) complexity</p>
      </div>
    </Card>
  );
};
