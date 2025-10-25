import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface ClockCycleCounterProps {
  cycles: number;
  frequency?: number;
}

export const ClockCycleCounter = ({ cycles, frequency = 5 }: ClockCycleCounterProps) => {
  const timeInMs = (cycles / frequency).toFixed(2);

  return (
    <Card className="p-4 bg-card border-glow-cyan">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary animate-data-pulse" />
          <div>
            <div className="text-xs text-muted-foreground">Clock Cycles</div>
            <div className="font-mono text-2xl font-bold text-primary">{cycles}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Execution Time</div>
          <div className="font-mono text-lg text-accent">{timeInMs} ms</div>
          <div className="text-[10px] text-muted-foreground">@ {frequency} MHz</div>
        </div>
      </div>
    </Card>
  );
};
