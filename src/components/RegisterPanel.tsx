import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface Register {
  name: string;
  value: string;
  description: string;
}

export const RegisterPanel = () => {
  const [registers, setRegisters] = useState<Register[]>([
    { name: "AX", value: "0000", description: "Accumulator" },
    { name: "BX", value: "0000", description: "Base Register" },
    { name: "CX", value: "0000", description: "Count Register" },
    { name: "DX", value: "0000", description: "Data Register" },
    { name: "SI", value: "0000", description: "Source Index" },
    { name: "DI", value: "0000", description: "Destination Index" },
    { name: "SP", value: "FFFF", description: "Stack Pointer" },
    { name: "BP", value: "0000", description: "Base Pointer" },
  ]);

  const [flags, setFlags] = useState({
    CF: 0, PF: 0, AF: 0, ZF: 0, SF: 0, OF: 0
  });

  const [animating, setAnimating] = useState<string | null>(null);

  const simulateUpdate = (regName: string) => {
    setAnimating(regName);
    setRegisters(prev => prev.map(reg => 
      reg.name === regName 
        ? { ...reg, value: Math.floor(Math.random() * 65536).toString(16).toUpperCase().padStart(4, '0') }
        : reg
    ));
    setTimeout(() => setAnimating(null), 600);
  };

  return (
    <Card className="p-6 bg-card border-glow-cyan">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold mb-2 text-glow-cyan">Register Bank</h3>
          <p className="text-sm text-muted-foreground">16-bit General Purpose & Special Registers</p>
        </div>

        <div className="space-y-3">
          {registers.map((reg) => (
            <div
              key={reg.name}
              className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                animating === reg.name
                  ? "border-primary bg-primary/20 animate-register-update"
                  : "border-border bg-secondary/50 hover:border-primary/50"
              }`}
              onClick={() => simulateUpdate(reg.name)}
            >
              <div className="flex items-center gap-4">
                <span className="font-mono font-bold text-primary w-8">{reg.name}</span>
                <span className="text-xs text-muted-foreground">{reg.description}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg tracking-wider">
                  {reg.value}
                  <sub className="text-xs text-muted-foreground ml-1">H</sub>
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border/50">
          <h4 className="font-mono text-sm mb-3 text-accent">Status Flags</h4>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(flags).map(([flag, value]) => (
              <div
                key={flag}
                className="p-2 rounded border border-border/50 bg-muted/30 text-center cursor-pointer hover:border-accent/50"
                onClick={() => setFlags(prev => ({ ...prev, [flag]: prev[flag] === 0 ? 1 : 0 }))}
              >
                <div className="text-xs text-muted-foreground">{flag}</div>
                <div className={`font-mono font-bold ${value ? "text-success" : "text-muted-foreground"}`}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
