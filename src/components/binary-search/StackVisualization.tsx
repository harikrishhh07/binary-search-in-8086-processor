import { Card } from "@/components/ui/card";

interface StackFrame {
  left: number;
  right: number;
  depth: number;
}

interface StackVisualizationProps {
  stack: StackFrame[];
  sp: number;
}

export const StackVisualization = ({ stack, sp }: StackVisualizationProps) => {
  return (
    <Card className="p-4 bg-card border-glow-amber">
      <h4 className="font-mono text-xs text-accent mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="animate-pulse">●</span>
          STACK MEMORY
        </span>
        <span className="text-primary">SP: {sp.toString(16).toUpperCase().padStart(4, '0')}H</span>
      </h4>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {stack.length === 0 ? (
          <div className="text-center text-muted-foreground text-xs py-4">Stack Empty</div>
        ) : (
          stack.map((frame, idx) => (
            <div
              key={idx}
              className="p-3 rounded border border-accent/50 bg-accent/10 font-mono text-xs animate-fade-in"
            >
              <div className="flex justify-between">
                <span className="text-muted-foreground">Depth {frame.depth}</span>
                <span className="text-accent font-bold">L:{frame.left} R:{frame.right}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
