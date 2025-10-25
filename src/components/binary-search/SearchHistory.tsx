import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HistoryEntry {
  step: number;
  left: number;
  mid: number;
  right: number;
  value: number;
  CF: number;
  ZF: number;
  SF: number;
  action: string;
}

interface SearchHistoryProps {
  history: HistoryEntry[];
}

export const SearchHistory = ({ history }: SearchHistoryProps) => {
  return (
    <Card className="p-4 bg-muted/30 border-border">
      <h4 className="font-mono text-sm text-accent mb-3">SEARCH HISTORY LOG</h4>
      <ScrollArea className="h-64">
        <div className="space-y-2">
          {history.length === 0 ? (
            <div className="text-center text-muted-foreground text-xs py-8">No search performed yet</div>
          ) : (
            history.map((entry) => (
              <div key={entry.step} className="p-3 rounded border border-border/50 bg-secondary/30 text-xs font-mono space-y-1">
                <div className="flex justify-between text-primary font-bold">
                  <span>Step {entry.step}</span>
                  <span>L:{entry.left} M:{entry.mid} R:{entry.right}</span>
                </div>
                <div className="text-muted-foreground">Value: {entry.value}</div>
                <div className="flex gap-3 text-[10px]">
                  <span className={entry.CF ? "text-success" : "text-muted-foreground"}>CF:{entry.CF}</span>
                  <span className={entry.ZF ? "text-success" : "text-muted-foreground"}>ZF:{entry.ZF}</span>
                  <span className={entry.SF ? "text-success" : "text-muted-foreground"}>SF:{entry.SF}</span>
                </div>
                <div className="text-accent">{entry.action}</div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};
