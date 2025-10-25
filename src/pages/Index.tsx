import { Hero } from "@/components/Hero";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { RegisterPanel } from "@/components/RegisterPanel";
import { MemoryViewer } from "@/components/MemoryViewer";
import { InstructionExecutor } from "@/components/InstructionExecutor";
import { BinarySearchDemo } from "@/components/BinarySearchDemo";
import { WaveformDisplay } from "@/components/WaveformDisplay";

const Index = () => {
  return (
    <div className="min-h-screen bg-background circuit-pattern">
      <Hero />
      
      <main className="container mx-auto px-4 py-12 space-y-16">
        <ArchitectureDiagram />
        
        <div className="grid lg:grid-cols-2 gap-8">
          <RegisterPanel />
          <MemoryViewer />
        </div>
        
        <InstructionExecutor />
        
        <BinarySearchDemo />
        
        <WaveformDisplay />
      </main>
      
      <footer className="border-t border-border/50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">8086 Microprocessor Interactive Simulator</p>
          <p className="text-xs mt-2">Educational Platform for Hardware-Level Visualization</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
