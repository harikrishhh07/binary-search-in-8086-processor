import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export const ArchitectureDiagram = () => {
  const [activeUnit, setActiveUnit] = useState<string | null>(null);

  const units = [
    { 
      id: "biu", 
      name: "Bus Interface Unit", 
      description: "Manages memory access and instruction fetching",
      color: "primary"
    },
    { 
      id: "eu", 
      name: "Execution Unit", 
      description: "Executes instructions and performs calculations",
      color: "accent"
    },
    { 
      id: "alu", 
      name: "ALU", 
      description: "Arithmetic and Logic operations",
      color: "success"
    },
    { 
      id: "registers", 
      name: "Register Bank", 
      description: "Fast storage for data and addresses",
      color: "primary"
    },
  ];

  return (
    <section id="architecture" className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-glow-cyan">
          Architecture Overview
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Interactive diagram showing the internal components and data flow of the 8086 microprocessor
        </p>
      </div>

      <Card className="p-8 bg-card border-glow-cyan">
        <div className="grid md:grid-cols-2 gap-8">
          {units.map((unit) => (
            <div
              key={unit.id}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                activeUnit === unit.id
                  ? "border-primary bg-primary/20 border-glow-cyan"
                  : "border-border bg-secondary/50 hover:border-primary/50"
              }`}
              onClick={() => setActiveUnit(unit.id)}
              onMouseEnter={() => setActiveUnit(unit.id)}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold font-mono">{unit.name}</h3>
                  <Badge 
                    className={`${
                      unit.color === "primary" ? "bg-primary text-primary-foreground" :
                      unit.color === "accent" ? "bg-accent text-accent-foreground" :
                      "bg-success text-success-foreground"
                    }`}
                  >
                    Active
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {unit.description}
                </p>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full animate-data-pulse ${
                      unit.color === "primary" ? "bg-primary" :
                      unit.color === "accent" ? "bg-accent" :
                      "bg-success"
                    }`}
                    style={{ width: activeUnit === unit.id ? "100%" : "0%" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-muted/50 rounded-lg border border-border/50">
          <h4 className="font-mono text-lg mb-4 text-primary">Data Flow Visualization</h4>
          <div className="flex items-center gap-4 justify-between flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-mono">Memory Bus</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-primary via-accent to-success relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-wave-flow" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-mono">Control Signals</span>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};
