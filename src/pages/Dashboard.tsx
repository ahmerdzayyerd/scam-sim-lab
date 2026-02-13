import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Download } from "lucide-react";
import IssueGrid from "@/components/IssueGrid";
import IssueFlow from "@/components/IssueFlow";
import WalletSimulator from "@/components/WalletSimulator";
import { forensicLogger } from "@/simulation/forensicLogger";
import { ISSUE_TYPES } from "@/simulation/stateMachine";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  const selectedLabel = ISSUE_TYPES.find((i) => i.id === selectedIssue)?.label;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-bold text-foreground">Crypto Lab</span>
            </div>
            <span className="rounded-full bg-warning/10 px-2 py-0.5 text-xs font-semibold text-warning uppercase">
              Lab Mode
            </span>
          </div>

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
            className="flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <Download className="h-3.5 w-3.5" />
            Export Log
          </button>
        </div>
      </header>

      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main area */}
          <div>
            {!selectedIssue ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="mb-2 text-2xl font-bold text-foreground">Troubleshooter Dashboard</h1>
                <p className="mb-6 text-muted-foreground">
                  Select an issue to begin the troubleshooting flow.
                </p>
                <IssueGrid onSelect={setSelectedIssue} />
              </motion.div>
            ) : (
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-foreground">
                    Issue: <span className="text-primary">{selectedLabel}</span>
                  </h1>
                </div>
                <IssueFlow
                  issueType={selectedIssue}
                  onBack={() => {
                    setSelectedIssue(null);
                    forensicLogger.log("flow_reset");
                  }}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <WalletSimulator />

            {/* Event log preview */}
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Forensic Log (Live)</h3>
              <div className="max-h-60 overflow-y-auto space-y-1">
                {forensicLogger
                  .getSession()
                  .slice(-10)
                  .reverse()
                  .map((entry, i) => (
                    <div key={i} className="text-xs font-mono">
                      <span className="text-primary">{entry.event}</span>
                      <span className="text-muted-foreground ml-2">
                        {new Date(entry.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                {forensicLogger.getSession().length === 0 && (
                  <p className="text-xs text-muted-foreground">No events yet</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
