import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Play, SkipForward, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface Instruction {
  opcode: string;
  mnemonic: string;
  operands: string;
  description: string;
}

export const InstructionExecutor = () => {
  const instructions: Instruction[] = [
    { opcode: "B8", mnemonic: "MOV", operands: "AX, 1234H", description: "Move immediate to AX" },
    { opcode: "03", mnemonic: "ADD", operands: "AX, BX", description: "Add BX to AX" },
    { opcode: "2B", mnemonic: "SUB", operands: "AX, 0010H", description: "Subtract immediate from AX" },
    { opcode: "F7", mnemonic: "MUL", operands: "CX", description: "Multiply AX by CX" },
    { opcode: "40", mnemonic: "INC", operands: "AX", description: "Increment AX" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);

  const executeStep = () => {
    if (currentStep < instructions.length) {
      setIsExecuting(true);
      toast.success(`Executing: ${instructions[currentStep].mnemonic} ${instructions[currentStep].operands}`);
      
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsExecuting(false);
      }, 800);
    }
  };

  const executeAll = () => {
    if (currentStep < instructions.length) {
      setIsExecuting(true);
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= instructions.length - 1) {
            clearInterval(interval);
            setIsExecuting(false);
            return instructions.length;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setIsExecuting(false);
    toast.info("Execution reset");
  };

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-glow-amber">
          Instruction Executor
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Step through assembly instructions and see real-time execution
        </p>
      </div>

      <Card className="p-8 bg-card border-glow-cyan">
        <div className="space-y-6">
          <div className="flex gap-4 justify-center">
            <Button
              onClick={executeStep}
              disabled={isExecuting || currentStep >= instructions.length}
              className="bg-primary hover:bg-primary-glow text-primary-foreground"
            >
              <SkipForward className="w-4 h-4 mr-2" />
              Step
            </Button>
            <Button
              onClick={executeAll}
              disabled={isExecuting || currentStep >= instructions.length}
              className="bg-accent hover:bg-accent-glow text-accent-foreground"
            >
              <Play className="w-4 h-4 mr-2" />
              Run All
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

          <div className="space-y-2">
            {instructions.map((instruction, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all ${
                  index === currentStep
                    ? "border-primary bg-primary/20 border-glow-cyan animate-data-pulse"
                    : index < currentStep
                    ? "border-success/50 bg-success/10"
                    : "border-border bg-secondary/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-muted-foreground w-8">
                      {index + 1}
                    </span>
                    <span className="font-mono text-sm text-accent font-bold w-12">
                      {instruction.opcode}
                    </span>
                    <span className="font-mono font-bold text-primary">
                      {instruction.mnemonic}
                    </span>
                    <span className="font-mono text-foreground">
                      {instruction.operands}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {instruction.description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm">
                Program Counter: <span className="text-primary font-bold">
                  {currentStep} / {instructions.length}
                </span>
              </span>
              <span className="font-mono text-sm">
                Status: <span className={`font-bold ${isExecuting ? "text-accent" : "text-success"}`}>
                  {isExecuting ? "EXECUTING" : currentStep >= instructions.length ? "HALTED" : "READY"}
                </span>
              </span>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};
