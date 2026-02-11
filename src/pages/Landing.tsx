import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Shield, AlertTriangle, Search, BookOpen } from "lucide-react";
import { forensicLogger } from "@/simulation/forensicLogger";

const Landing = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    forensicLogger.log("landing_enter_clicked");
    navigate("/dashboard");
  };

  return (
    <div className="relative min-h-screen bg-background bg-grid-pattern overflow-hidden">
      {/* Scan line effect */}
      <div className="scan-line pointer-events-none fixed inset-0 z-10 h-full" />

      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 py-16">
        {/* Lab badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-2 rounded-full border border-warning/30 bg-warning/5 px-4 py-2"
        >
          <AlertTriangle className="h-4 w-4 text-warning" />
          <span className="text-xs font-semibold tracking-wider text-warning uppercase">
            Cybersecurity Research Lab — Educational Use Only
          </span>
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center max-w-3xl"
        >
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 glow-primary">
              <Shield className="h-10 w-10 text-primary" />
            </div>
          </div>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Web3 Scam-Pattern
            <span className="text-gradient-primary"> Simulator</span>
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
            A high-fidelity simulation platform for studying wallet support scam patterns.
            Built for cybersecurity researchers, digital forensics analysts, and educators.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={handleEnter}
            className="flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 glow-primary-strong"
          >
            <Search className="h-4 w-4" />
            Enter Simulation Lab
          </button>
          <a
            href="#about"
            className="flex items-center gap-2 rounded-lg border border-border px-8 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground hover:border-primary/30"
          >
            <BookOpen className="h-4 w-4" />
            Research Documentation
          </a>
        </motion.div>

        {/* Info cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {[
            { title: "No Real Wallets", desc: "All wallet interactions are fully simulated. No blockchain connections." },
            { title: "Forensic Logging", desc: "Every interaction is logged locally for research analysis and pattern study." },
            { title: "Safe by Design", desc: "Real seed phrases are detected and rejected. No data is transmitted." },
          ].map((card, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-card/50 p-5 backdrop-blur-sm"
            >
              <h3 className="mb-2 font-semibold text-foreground">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* About section */}
        <motion.div
          id="about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-24 max-w-2xl text-center"
        >
          <h2 className="mb-4 text-2xl font-bold text-foreground">About This Project</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed text-left">
            <p>
              This platform replicates the UI/UX patterns used by Web3 wallet support scams — without
              any capability to access real wallets, steal credentials, or interact with blockchains.
            </p>
            <p>
              <strong className="text-foreground">Purpose:</strong> Enable cybersecurity researchers,
              SOC analysts, and educators to study social engineering techniques in a safe environment.
            </p>
            <p>
              <strong className="text-foreground">Safety:</strong> Real seed phrases are automatically
              detected and rejected. All data stays local. No external services are contacted.
            </p>
            <p className="border-t border-border pt-3 font-mono text-xs text-muted-foreground">
              ⚠️ This tool must never be deployed publicly. It is intended for local research and
              classroom demonstrations only.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
