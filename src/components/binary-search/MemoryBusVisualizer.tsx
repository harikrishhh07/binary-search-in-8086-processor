import { Card } from "@/components/ui/card";

interface MemoryAccessLog {
  address: string;
  operation: "READ" | "WRITE";
  value: number;
  timestamp: number;
}

interface MemoryBusVisualizerProps {
  accessLog: MemoryAccessLog[];
}

export const MemoryBusVisualizer = ({ accessLog }: MemoryBusVisualizerProps) => {
  return (
    <Card className="p-4 bg-primary/5 border-primary/30">
      <h4 className="font-mono text-xs text-primary mb-3 flex items-center gap-2">
        <span className="animate-pulse">●</span>
        MEMORY BUS TRAFFIC
      </h4>
      <div className="space-y-1 max-h-48 overflow-y-auto text-xs font-mono">
        {accessLog.length === 0 ? (
          <div className="text-center text-muted-foreground py-4">No memory operations yet</div>
        ) : (
          accessLog.slice(-10).reverse().map((log, idx) => (
            <div
              key={idx}
              className={`flex justify-between p-2 rounded ${
                log.operation === "READ" ? "bg-accent/10 border-l-2 border-accent" : "bg-success/10 border-l-2 border-success"
              }`}
            >
              <span className={log.operation === "READ" ? "text-accent" : "text-success"}>{log.operation}</span>
              <span className="text-primary">{log.address}</span>
              <span className="text-foreground">{log.value}</span>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
