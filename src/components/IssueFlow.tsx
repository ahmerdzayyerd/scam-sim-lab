import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, MessageSquare, Wifi, KeyRound, Loader2, CheckCircle } from "lucide-react";
import { type FlowStep } from "@/simulation/stateMachine";
import { fakeProvider } from "@/simulation/fakeProvider";
import { forensicLogger } from "@/simulation/forensicLogger";
import { WALLET_PROFILES } from "@/simulation/walletProfiles";
import SimulatedRecoveryForm from "./SimulatedRecoveryForm";

interface Props {
  issueType: string;
  onBack: () => void;
}

const STEP_LABELS: Record<FlowStep, string> = {
  select_issue: "Issue",
  describe_problem: "Describe",
  connect_wallet: "Connect",
  manual_recovery: "Recovery",
  processing: "Processing",
  result: "Result",
};

const FLOW_STEPS: FlowStep[] = ["describe_problem", "connect_wallet", "manual_recovery", "processing", "result"];

const IssueFlow = ({ issueType, onBack }: Props) => {
  const [step, setStep] = useState<FlowStep>("describe_problem");
  const [description, setDescription] = useState("");
  const [walletProfile, setWalletProfile] = useState("high");

  const stepIndex = FLOW_STEPS.indexOf(step);

  const advance = () => {
    const next = FLOW_STEPS[stepIndex + 1];
    if (next) {
      forensicLogger.log("flow_step_advance", { from: step, to: next, issueType });
      setStep(next);
    }
  };

  const handleDescribe = (e: React.FormEvent) => {
    e.preventDefault();
    forensicLogger.log("problem_described", { issueType, descriptionLength: description.length });
    advance();
  };

  const handleConnect = () => {
    fakeProvider.connect(walletProfile);
    forensicLogger.log("wallet_connected", { profileId: walletProfile, issueType });
    advance();
  };

  const handleRecoveryComplete = () => {
    setStep("processing");
    forensicLogger.log("recovery_complete_advancing", { issueType });
    setTimeout(() => setStep("result"), 2500);
  };

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8 flex items-center gap-2">
        {FLOW_STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                i <= stepIndex
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {i + 1}
            </div>
            <span className={`hidden text-xs sm:inline ${i <= stepIndex ? "text-foreground" : "text-muted-foreground"}`}>
              {STEP_LABELS[s]}
            </span>
            {i < FLOW_STEPS.length - 1 && (
              <div className={`h-px w-6 ${i < stepIndex ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === "describe_problem" && (
          <motion.div key="describe" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Describe Your Issue</h2>
            </div>
            <form onSubmit={handleDescribe} className="space-y-4">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue you're experiencing with your wallet..."
                rows={4}
                className="w-full rounded-md border border-input bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <div className="flex gap-3">
                <button type="button" onClick={onBack} className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button type="submit" disabled={!description.trim()} className="flex items-center gap-2 rounded-md bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {step === "connect_wallet" && (
          <motion.div key="connect" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="flex items-center gap-3 mb-6">
              <Wifi className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Connect Wallet</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Select a simulated wallet profile to connect. No real wallets are used.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {Object.values(WALLET_PROFILES).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setWalletProfile(p.id)}
                  className={`rounded-md border p-3 text-left text-sm transition-colors ${
                    walletProfile === p.id
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  <div className="font-semibold">{p.label}</div>
                  <div className="font-mono text-xs mt-1">{p.balanceETH} ETH</div>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep("describe_problem")} className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button onClick={handleConnect} className="flex items-center gap-2 rounded-md bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                Connect Wallet <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {step === "manual_recovery" && (
          <motion.div key="recovery" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="flex items-center gap-3 mb-6">
              <KeyRound className="h-6 w-6 text-warning" />
              <h2 className="text-xl font-semibold text-foreground">Manual Recovery</h2>
            </div>
            <SimulatedRecoveryForm onComplete={handleRecoveryComplete} />
          </motion.div>
        )}

        {step === "processing" && (
          <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg font-semibold text-foreground">Processing Simulation...</p>
            <p className="text-sm text-muted-foreground mt-2">Analyzing interaction pattern</p>
          </motion.div>
        )}

        {step === "result" && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
            <CheckCircle className="mx-auto h-16 w-16 text-success mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Simulation Complete</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              The scam flow simulation has completed. All interaction data has been logged locally
              for forensic analysis. No real data was transmitted.
            </p>
            <div className="flex justify-center gap-3">
              <button onClick={onBack} className="rounded-md border border-border px-6 py-2 text-sm text-muted-foreground hover:text-foreground">
                New Simulation
              </button>
              <button
                onClick={() => {
                  const data = forensicLogger.exportJSON();
                  const blob = new Blob([data], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `forensic-log-${Date.now()}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="rounded-md bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Export Forensic Log
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IssueFlow;
