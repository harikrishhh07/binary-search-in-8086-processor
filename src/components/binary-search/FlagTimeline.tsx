import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";

interface FlagSnapshot {
  step: number;
  CF: number;
  ZF: number;
  SF: number;
}

interface FlagTimelineProps {
  history: FlagSnapshot[];
}

export const FlagTimeline = ({ history }: FlagTimelineProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || history.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = (height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const stepWidth = width / Math.max(history.length - 1, 1);

    // Draw CF (Carry Flag)
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    ctx.beginPath();
    history.forEach((snapshot, idx) => {
      const x = idx * stepWidth;
      const y = height - (snapshot.CF * height * 0.8) - height * 0.1;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw ZF (Zero Flag)
    ctx.strokeStyle = "#10b981";
    ctx.beginPath();
    history.forEach((snapshot, idx) => {
      const x = idx * stepWidth;
      const y = height - (snapshot.ZF * height * 0.8) - height * 0.1;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw SF (Sign Flag)
    ctx.strokeStyle = "#f59e0b";
    ctx.beginPath();
    history.forEach((snapshot, idx) => {
      const x = idx * stepWidth;
      const y = height - (snapshot.SF * height * 0.8) - height * 0.1;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

  }, [history]);

  return (
    <Card className="p-4 bg-muted/30 border-border">
      <h4 className="font-mono text-xs text-primary mb-3">FLAG REGISTER TIMELINE</h4>
      <canvas ref={canvasRef} width={600} height={120} className="w-full h-32 bg-background/50 rounded" />
      <div className="flex justify-center gap-4 mt-2 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-blue-500" />
          <span className="text-muted-foreground">CF</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span className="text-muted-foreground">ZF</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-amber-500" />
          <span className="text-muted-foreground">SF</span>
        </div>
      </div>
    </Card>
  );
};
