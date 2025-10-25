import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export const WaveformDisplay = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = "hsl(220, 25%, 10%)";
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = "hsl(180, 50%, 25%, 0.2)";
    ctx.lineWidth = 1;
    
    for (let i = 0; i < width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    
    for (let i = 0; i < height; i += 30) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    // Draw clock signal
    ctx.strokeStyle = "hsl(180, 100%, 50%)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let x = 0; x < width; x++) {
      const t = (x + time) / 20;
      const y = height / 4 + (Math.sin(t) > 0 ? -30 : 30);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw data bus signal
    ctx.strokeStyle = "hsl(35, 100%, 55%)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let x = 0; x < width; x++) {
      const t = (x + time) / 30;
      const y = height / 2 + Math.sin(t * 1.5) * 40;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw control signal
    ctx.strokeStyle = "hsl(140, 80%, 50%)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let x = 0; x < width; x++) {
      const t = (x + time) / 40;
      const y = (height * 3) / 4 + (Math.sin(t * 2) > 0 ? -25 : 25);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw labels
    ctx.fillStyle = "hsl(180, 100%, 90%)";
    ctx.font = "12px 'JetBrains Mono', monospace";
    ctx.fillText("CLK", 10, height / 4);
    ctx.fillText("DATA", 10, height / 2);
    ctx.fillText("CTRL", 10, (height * 3) / 4);

  }, [time]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTime((prev) => (prev + 2) % 1000);
    }, 16);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const reset = () => {
    setTime(0);
    setIsPlaying(false);
  };

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-glow-amber">
          Digital Signal Waveforms
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real-time visualization of clock, data, and control signals in the 8086
        </p>
      </div>

      <Card className="p-8 bg-card border-glow-cyan">
        <div className="space-y-6">
          <div className="flex gap-4 justify-center">
            <Button
              onClick={togglePlay}
              className={isPlaying ? "bg-accent hover:bg-accent-glow" : "bg-primary hover:bg-primary-glow"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Play
                </>
              )}
            </Button>
            <Button
              onClick={reset}
              variant="outline"
              className="border-border hover:bg-muted"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          <div className="rounded-lg overflow-hidden border-2 border-primary/50 shadow-[0_0_30px_hsl(180_100%_50%/0.3)]">
            <canvas
              ref={canvasRef}
              width={800}
              height={400}
              className="w-full"
              style={{ display: "block" }}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 rounded-lg bg-primary/20 border border-primary/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-sm text-primary font-bold">CLK</span>
              </div>
              <p className="text-xs text-muted-foreground">System Clock Signal</p>
            </div>
            <div className="p-3 rounded-lg bg-accent/20 border border-accent/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-sm text-accent font-bold">DATA</span>
              </div>
              <p className="text-xs text-muted-foreground">Data Bus Signals</p>
            </div>
            <div className="p-3 rounded-lg bg-success/20 border border-success/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                <span className="font-mono text-sm text-success font-bold">CTRL</span>
              </div>
              <p className="text-xs text-muted-foreground">Control Signals</p>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};
