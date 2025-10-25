import { Card } from "@/components/ui/card";

interface OpcodeDisplayProps {
  currentOpcode: {
    instruction: string;
    opcode: string;
    addressingMode: string;
    tStates: number;
  } | null;
}

export const OpcodeDisplay = ({ currentOpcode }: OpcodeDisplayProps) => {
  if (!currentOpcode) return null;

  return (
    <Card className="p-4 bg-primary/10 border-primary/50">
      <h4 className="font-mono text-xs text-primary mb-3 flex items-center gap-2">
        <span className="animate-pulse">●</span>
        OPCODE DECODER
      </h4>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="space-y-1">
          <div className="text-muted-foreground">Instruction</div>
          <div className="font-mono font-bold text-primary">{currentOpcode.instruction}</div>
        </div>
        <div className="space-y-1">
          <div className="text-muted-foreground">Opcode</div>
          <div className="font-mono font-bold text-accent">{currentOpcode.opcode}</div>
        </div>
        <div className="space-y-1">
          <div className="text-muted-foreground">Addressing Mode</div>
          <div className="font-mono text-sm">{currentOpcode.addressingMode}</div>
        </div>
        <div className="space-y-1">
          <div className="text-muted-foreground">T-States</div>
          <div className="font-mono font-bold text-success">{currentOpcode.tStates}</div>
        </div>
      </div>
    </Card>
  );
};
