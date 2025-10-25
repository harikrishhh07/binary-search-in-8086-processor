import { Card } from "@/components/ui/card";

interface FlagRegisterDisplayProps {
  flags: {
    CF: number;
    ZF: number;
    SF: number;
    OF: number;
    PF: number;
    AF: number;
  };
  onFlagUpdate?: (flags: any) => void;
}

export const FlagRegisterDisplay = ({ flags, onFlagUpdate }: FlagRegisterDisplayProps) => {
  const flagDescriptions = {
    CF: "Carry Flag",
    ZF: "Zero Flag",
    SF: "Sign Flag",
    OF: "Overflow Flag",
    PF: "Parity Flag",
    AF: "Auxiliary Flag"
  };

  return (
    <Card className="p-4 bg-accent/10 border-accent/50">
      <h4 className="font-mono text-xs text-accent mb-3 flex items-center gap-2">
        <span className="animate-pulse">●</span>
        ALU STATUS FLAGS
      </h4>
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(flags).map(([flag, value]) => (
          <div
            key={flag}
            className={`p-2 rounded border text-center transition-all ${
              value ? "border-success bg-success/20" : "border-border/50 bg-muted/30"
            }`}
          >
            <div className="text-xs text-muted-foreground">{flag}</div>
            <div className={`font-mono text-lg font-bold ${value ? "text-success" : "text-muted-foreground"}`}>
              {value}
            </div>
            <div className="text-[10px] text-muted-foreground truncate">{flagDescriptions[flag as keyof typeof flagDescriptions]}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};
