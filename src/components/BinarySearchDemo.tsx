import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search, Play, RotateCcw, Mic, Shuffle, Zap, Timer, Code2 } from "lucide-react";
import { toast } from "sonner";
import { OpcodeDisplay } from "./binary-search/OpcodeDisplay";
import { FlagRegisterDisplay } from "./binary-search/FlagRegisterDisplay";
import { ClockCycleCounter } from "./binary-search/ClockCycleCounter";
import { FlowchartTracker } from "./binary-search/FlowchartTracker";
import { StackVisualization } from "./binary-search/StackVisualization";
import { MemoryBusVisualizer } from "./binary-search/MemoryBusVisualizer";
import { FlagTimeline } from "./binary-search/FlagTimeline";
import { SearchComparison } from "./binary-search/SearchComparison";
import { SearchHistory } from "./binary-search/SearchHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

export const BinarySearchDemo = () => {
  const [sortedArray, setSortedArray] = useState([5, 12, 18, 23, 31, 45, 58, 67, 74, 89, 95]);
  const [searchValue, setSearchValue] = useState("45");
  const [left, setLeft] = useState<number | null>(null);
  const [right, setRight] = useState<number | null>(null);
  const [mid, setMid] = useState<number | null>(null);
  const [found, setFound] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [steps, setSteps] = useState<string[]>([]);
  const [cx, setCx] = useState(0);
  const [clockCycles, setClockCycles] = useState(0);
  const [speed, setSpeed] = useState(1000);
  const [searchMode, setSearchMode] = useState<"iterative" | "recursive">("iterative");
  const [viewMode, setViewMode] = useState<"visual" | "assembly">("visual");
  const [isDragging, setIsDragging] = useState(false);
  
  const [currentOpcode, setCurrentOpcode] = useState<any>(null);
  const [flags, setFlags] = useState({ CF: 0, ZF: 0, SF: 0, OF: 0, PF: 0, AF: 0 });
  const [flowchartStep, setFlowchartStep] = useState<any>(null);
  const [stack, setStack] = useState<any[]>([]);
  const [sp, setSp] = useState(0xFFFE);
  const [memoryLog, setMemoryLog] = useState<any[]>([]);
  const [flagHistory, setFlagHistory] = useState<any[]>([]);
  const [searchHistory, setSearchHistory] = useState<any[]>([]);

  const updateFlags = (arr: number[], targetIdx: number, targetValue: number) => {
    const midValue = arr[targetIdx];
    const newFlags = {
      CF: midValue < targetValue ? 1 : 0,
      ZF: midValue === targetValue ? 1 : 0,
      SF: midValue > targetValue ? 1 : 0,
      OF: 0,
      PF: 0,
      AF: 0
    };
    setFlags(newFlags);
    return newFlags;
  };

  const addMemoryAccess = (address: string, operation: "READ" | "WRITE", value: number) => {
    setMemoryLog(prev => [...prev, { address, operation, value, timestamp: Date.now() }]);
  };

  const generateRandomArray = () => {
    const size = 11;
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
    arr.sort((a, b) => a - b);
    setSortedArray(arr);
    reset();
    toast.success("Generated new sorted array");
  };

  const checkArraySorted = (arr: number[]) => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        return false;
      }
    }
    return true;
  };

  const performSearch = async () => {
    const target = parseInt(searchValue);
    if (isNaN(target)) {
      toast.error("Please enter a valid number");
      return;
    }

    if (!checkArraySorted(sortedArray)) {
      toast.error("⚠️ INTERRUPT: Array is not sorted! Binary search requires sorted data.");
      return;
    }

    setIsSearching(true);
    setFound(null);
    setSteps([]);
    setSearchHistory([]);
    setFlagHistory([]);
    setMemoryLog([]);
    setClockCycles(0);
    setFlowchartStep("start");
    
    let cycles = 0;
    let l = 0;
    let r = sortedArray.length - 1;
    const searchSteps: string[] = [];
    let stepNum = 0;

    setCx(sortedArray.length);
    await new Promise(resolve => setTimeout(resolve, speed));

    while (l <= r) {
      setLeft(l);
      setRight(r);
      setFlowchartStep("compare");
      
      // MOV AX, left
      setCurrentOpcode({
        instruction: "MOV AX, [SI]",
        opcode: "8B 04",
        addressingMode: "Register Indirect",
        tStates: 8
      });
      cycles += 8;
      setClockCycles(cycles);
      addMemoryAccess(`DS:${(l * 2).toString(16).toUpperCase().padStart(4, '0')}`, "READ", sortedArray[l]);
      await new Promise(resolve => setTimeout(resolve, speed));

      const m = Math.floor((l + r) / 2);
      setMid(m);
      
      // Calculate MID
      setCurrentOpcode({
        instruction: "ADD AX, BX",
        opcode: "03 C3",
        addressingMode: "Register",
        tStates: 3
      });
      cycles += 3;
      setClockCycles(cycles);
      await new Promise(resolve => setTimeout(resolve, speed));
      
      setCurrentOpcode({
        instruction: "SHR AX, 1",
        opcode: "D1 E8",
        addressingMode: "Register",
        tStates: 2
      });
      cycles += 2;
      setClockCycles(cycles);

      searchSteps.push(`Checking middle index ${m}: value = ${sortedArray[m]}`);
      setSteps([...searchSteps]);
      
      // Compare
      setCurrentOpcode({
        instruction: "CMP AX, [DI]",
        opcode: "3B 05",
        addressingMode: "Register Indirect",
        tStates: 9
      });
      cycles += 9;
      setClockCycles(cycles);
      addMemoryAccess(`DS:${(m * 2).toString(16).toUpperCase().padStart(4, '0')}`, "READ", sortedArray[m]);
      
      const currentFlags = updateFlags(sortedArray, m, target);
      const flagSnapshot = { step: stepNum, CF: currentFlags.CF, ZF: currentFlags.ZF, SF: currentFlags.SF };
      setFlagHistory(prev => [...prev, flagSnapshot]);
      
      const historyEntry = {
        step: stepNum++,
        left: l,
        mid: m,
        right: r,
        value: sortedArray[m],
        CF: currentFlags.CF,
        ZF: currentFlags.ZF,
        SF: currentFlags.SF,
        action: ""
      };

      await new Promise(resolve => setTimeout(resolve, speed));

      if (sortedArray[m] === target) {
        setFound(m);
        setFlowchartStep("found");
        historyEntry.action = `✓ Found ${target} at index ${m}`;
        setSearchHistory(prev => [...prev, historyEntry]);
        searchSteps.push(`✓ Found ${target} at index ${m}!`);
        setSteps([...searchSteps]);
        
        // Success animation
        setCurrentOpcode({
          instruction: "JE FOUND",
          opcode: "74 XX",
          addressingMode: "Relative",
          tStates: 16
        });
        cycles += 16;
        setClockCycles(cycles);
        
        toast.success(`🎯 Target found at index ${m} in ${stepNum} steps!`, {
          description: `Clock cycles: ${cycles}`
        });
        break;
      } else if (sortedArray[m] < target) {
        setFlowchartStep("right");
        historyEntry.action = `${sortedArray[m]} < ${target}, searching right half`;
        setSearchHistory(prev => [...prev, historyEntry]);
        searchSteps.push(`${sortedArray[m]} < ${target}, searching right half`);
        setSteps([...searchSteps]);
        
        setCurrentOpcode({
          instruction: "JB RIGHT",
          opcode: "72 XX",
          addressingMode: "Relative",
          tStates: 16
        });
        cycles += 16;
        setClockCycles(cycles);
        l = m + 1;
      } else {
        setFlowchartStep("left");
        historyEntry.action = `${sortedArray[m]} > ${target}, searching left half`;
        setSearchHistory(prev => [...prev, historyEntry]);
        searchSteps.push(`${sortedArray[m]} > ${target}, searching left half`);
        setSteps([...searchSteps]);
        
        setCurrentOpcode({
          instruction: "JA LEFT",
          opcode: "77 XX",
          addressingMode: "Relative",
          tStates: 16
        });
        cycles += 16;
        setClockCycles(cycles);
        r = m - 1;
      }

      setCx(prev => prev - 1);
      await new Promise(resolve => setTimeout(resolve, speed));
    }

    if (found === null && l > r) {
      setFlowchartStep("notfound");
      searchSteps.push(`✗ Value ${target} not found in array`);
      setSteps([...searchSteps]);
      toast.error(`Value ${target} not found`);
    }

    setIsSearching(false);
    setCurrentOpcode(null);
  };

  const reset = () => {
    setLeft(null);
    setRight(null);
    setMid(null);
    setFound(null);
    setSteps([]);
    setIsSearching(false);
    setCx(0);
    setClockCycles(0);
    setCurrentOpcode(null);
    setFlags({ CF: 0, ZF: 0, SF: 0, OF: 0, PF: 0, AF: 0 });
    setFlowchartStep(null);
    setStack([]);
    setSp(0xFFFE);
    setMemoryLog([]);
    setFlagHistory([]);
    setSearchHistory([]);
  };

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        const num = transcript.match(/\d+/);
        if (num) {
          setSearchValue(num[0]);
          toast.success(`Voice recognized: ${num[0]}`);
        }
      };
      recognition.start();
      toast.info("🎤 Listening...");
    } else {
      toast.error("Voice recognition not supported in this browser");
    }
  };

  return (
    <section id="binary-search" className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-glow-cyan">
          DSP-Enhanced Binary Search Simulator
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Hardware-level 8086 microprocessor simulation with opcode decoding, ALU flags, and real-time performance analysis
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <ClockCycleCounter cycles={clockCycles} />
        <Card className="p-4 bg-card border-border">
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">Execution Speed</label>
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-primary" />
              <Slider
                value={[2000 - speed]}
                onValueChange={(val) => setSpeed(2000 - val[0])}
                max={1900}
                min={100}
                step={100}
                disabled={isSearching}
                className="flex-1"
              />
              <Zap className="w-4 h-4 text-accent" />
            </div>
            <div className="text-xs text-center text-muted-foreground">
              {speed > 1500 ? "Slow Motion" : speed > 500 ? "Normal" : "Turbo"}
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-border">
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">CX Register (Loop Counter)</div>
            <div className="font-mono text-3xl font-bold text-primary">{cx.toString(16).toUpperCase().padStart(4, '0')}H</div>
            <div className="text-xs text-muted-foreground mt-1">Iterations remaining</div>
          </div>
        </Card>
      </div>

      <Card className="p-8 bg-card border-glow-amber">
        <div className="space-y-6">
          <div className="flex gap-4 items-center justify-center flex-wrap">
            <Input
              type="number"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Enter value to search"
              className="w-48 font-mono bg-input border-border"
              disabled={isSearching}
            />
            <Button
              onClick={performSearch}
              disabled={isSearching}
              className="bg-accent hover:bg-accent-glow text-accent-foreground"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button
              onClick={startVoiceSearch}
              variant="outline"
              disabled={isSearching}
            >
              <Mic className="w-4 h-4 mr-2" />
              Voice
            </Button>
            <Button
              onClick={generateRandomArray}
              variant="outline"
              disabled={isSearching}
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Random Array
            </Button>
            <Button
              onClick={reset}
              variant="outline"
              className="border-border hover:bg-muted"
              disabled={isSearching}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          <div className="flex gap-2 justify-center flex-wrap">
            {sortedArray.map((value, index) => (
              <div
                key={index}
                className={`w-16 h-16 flex items-center justify-center rounded-lg border-2 font-mono font-bold transition-all cursor-pointer ${
                  found === index
                    ? "border-success bg-success/30 text-success scale-110 shadow-[0_0_30px_hsl(140_80%_50%/0.6)] animate-data-pulse"
                    : mid === index
                    ? "border-primary bg-primary/30 text-primary animate-data-pulse border-glow-cyan"
                    : left !== null && right !== null && index >= left && index <= right
                    ? "border-accent bg-accent/20 text-accent"
                    : "border-border bg-secondary/30 text-muted-foreground"
                }`}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <OpcodeDisplay currentOpcode={currentOpcode} />
        <FlagRegisterDisplay flags={flags} />
        <Card className="p-4 bg-muted/30 border-border">
          <h4 className="font-mono text-xs text-primary mb-3">VIEW MODE</h4>
          <Tabs value={viewMode} onValueChange={(v: any) => setViewMode(v)}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="visual">Visual</TabsTrigger>
              <TabsTrigger value="assembly">Assembly</TabsTrigger>
            </TabsList>
            <TabsContent value="visual" className="text-xs text-muted-foreground mt-3">
              Interactive hardware visualization mode
            </TabsContent>
            <TabsContent value="assembly" className="text-xs font-mono mt-3">
              <div className="space-y-1 text-[10px]">
                <div>MOV SI, ARRAY_START</div>
                <div>MOV CX, ARRAY_SIZE</div>
                <div>CALL BINARY_SEARCH</div>
                <div className="text-accent">; Returns index in AX</div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <FlowchartTracker currentStep={flowchartStep} />
        <SearchHistory history={searchHistory} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <MemoryBusVisualizer accessLog={memoryLog} />
        <FlagTimeline history={flagHistory} />
      </div>

      {clockCycles > 0 && (
        <SearchComparison 
          arraySize={sortedArray.length} 
          binarySteps={searchHistory.length}
          binaryCycles={clockCycles}
        />
      )}
    </section>
  );
};
