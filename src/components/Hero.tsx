import { Button } from "@/components/ui/button";
import { Cpu, Zap, Binary } from "lucide-react";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden border-b border-border/50">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/50 bg-primary/10 text-primary text-sm font-mono">
            <Zap className="w-4 h-4" />
            <span>16-bit Architecture Simulator</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="text-glow-cyan">8086</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              Microprocessor Lab
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the internal workings of Intel's legendary 8086 processor through 
            interactive visualizations, real-time animations, and hardware-level insights
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Button 
              onClick={() => scrollToSection("architecture")}
              className="bg-primary hover:bg-primary-glow text-primary-foreground border-glow-cyan"
              size="lg"
            >
              <Cpu className="w-5 h-5 mr-2" />
              Explore Architecture
            </Button>
            
            <Button 
              onClick={() => scrollToSection("binary-search")}
              variant="outline"
              className="border-accent/50 text-accent hover:bg-accent/10 hover:border-accent"
              size="lg"
            >
              <Binary className="w-5 h-5 mr-2" />
              See Algorithms
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary text-glow-cyan">16-bit</div>
              <div className="text-sm text-muted-foreground">Data Bus Width</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-accent text-glow-amber">1MB</div>
              <div className="text-sm text-muted-foreground">Address Space</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-success">Real-time</div>
              <div className="text-sm text-muted-foreground">Visualization</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
    </section>
  );
};
