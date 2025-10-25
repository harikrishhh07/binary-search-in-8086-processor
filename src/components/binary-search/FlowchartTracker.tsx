import { Card } from "@/components/ui/card";

interface FlowchartTrackerProps {
  currentStep: "start" | "compare" | "left" | "right" | "found" | "notfound" | null;
}

export const FlowchartTracker = ({ currentStep }: FlowchartTrackerProps) => {
  const steps = [
    { id: "start", label: "START", color: "primary" },
    { id: "compare", label: "MID = (L+R)/2", color: "accent" },
    { id: "left", label: "Search Left", color: "blue-500" },
    { id: "right", label: "Search Right", color: "purple-500" },
    { id: "found", label: "FOUND ✓", color: "success" },
    { id: "notfound", label: "NOT FOUND ✗", color: "destructive" }
  ];

  return (
    <Card className="p-6 bg-muted/30 border-border">
      <h4 className="font-mono text-sm text-primary mb-4">ALGORITHM FLOWCHART</h4>
      <div className="space-y-3">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center gap-3">
            <div
              className={`w-32 p-2 rounded-lg border-2 text-center font-mono text-xs transition-all ${
                currentStep === step.id
                  ? `border-${step.color} bg-${step.color}/20 text-${step.color} scale-105 shadow-[0_0_20px_hsl(var(--${step.color})/0.5)]`
                  : "border-border/50 bg-secondary/30 text-muted-foreground"
              }`}
            >
              {step.label}
            </div>
            {idx < steps.length - 2 && (
              <div className={`h-6 w-0.5 ml-16 ${currentStep === step.id ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
