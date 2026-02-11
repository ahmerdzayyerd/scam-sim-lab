import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ShieldAlert, CheckCircle, Loader2 } from "lucide-react";
import { validateSimulatedPhrase, getPlaceholderPhrase } from "@/simulation/seedPhraseValidator";
import { forensicLogger } from "@/simulation/forensicLogger";

interface Props {
  onComplete: () => void;
}

const SimulatedRecoveryForm = ({ onComplete }: Props) => {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "warning" | "accepted" | "processing">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = validateSimulatedPhrase(input);

    forensicLogger.log("recovery_form_submitted", {
      isDangerous: result.isDangerous,
      isPlaceholder: result.isPlaceholder,
      wordCount: input.trim().split(/\s+/).length,
      // Never log the actual input for safety
    });

    if (result.isDangerous) {
      setStatus("warning");
      setMessage(result.message);
      return;
    }

    if (result.isValid) {
      setStatus("processing");
      setMessage("Processing simulated recovery...");
      setTimeout(() => {
        setStatus("accepted");
        setMessage("✅ Simulation complete. No data was transmitted. See forensic log for analysis.");
        forensicLogger.log("recovery_simulation_complete", { outcome: "safe" });
      }, 2000);

      setTimeout(onComplete, 3500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-lg"
    >
      {/* Educational Warning Banner */}
      <div className="mb-6 flex items-start gap-3 rounded-lg border border-warning/30 bg-warning/5 p-4">
        <ShieldAlert className="mt-0.5 h-5 w-5 flex-shrink-0 text-warning" />
        <div className="text-sm">
          <p className="font-semibold text-warning">RESEARCH SIMULATION</p>
          <p className="mt-1 text-muted-foreground">
            This form replicates a phishing UI pattern. Real scam sites use identical layouts to steal
            seed phrases. <strong className="text-foreground">Never enter real credentials anywhere.</strong>
          </p>
        </div>
      </div>

      {/* The simulated phishing-style form */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-1 text-lg font-semibold text-foreground">Manual Wallet Recovery</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Enter your recovery phrase to restore wallet access.
        </p>

        <form onSubmit={handleSubmit}>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setStatus("idle");
              setMessage("");
            }}
            placeholder={getPlaceholderPhrase()}
            rows={3}
            className="w-full rounded-md border border-input bg-secondary/50 px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring"
          />

          <AnimatePresence mode="wait">
            {status === "warning" && (
              <motion.div
                key="warning"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-3"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                <p className="text-sm text-destructive">{message}</p>
              </motion.div>
            )}

            {status === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                {message}
              </motion.div>
            )}

            {status === "accepted" && (
              <motion.div
                key="accepted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 flex items-start gap-2 rounded-md border border-success/30 bg-success/10 p-3"
              >
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                <p className="text-sm text-success">{message}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={!input.trim() || status === "processing" || status === "accepted"}
            className="mt-4 w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "processing" ? "Processing..." : "Submit Recovery Phrase"}
          </button>
        </form>
      </div>

      {/* Forensic annotation */}
      <p className="mt-4 text-center text-xs text-muted-foreground font-mono">
        All interactions logged locally • No data transmitted • Session: {forensicLogger.getAll().length} events
      </p>
    </motion.div>
  );
};

export default SimulatedRecoveryForm;
