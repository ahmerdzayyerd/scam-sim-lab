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
            The Crypto Workshop — BlockChain Troubleshooting Lab
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
            The Crypto
            <span className="text-gradient-primary"> Workshop</span>
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
            The Crypto Workshop is a comprehensive web application built to address the common and complex challenges faced by cryptocurrency users, evoking a place where specialized tools and expertise are readily available for repair.
            Our platform offers a full suite of services and utilities to help you manage, secure, and troubleshoot your digital assets effectively.
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
            Enter Troubleshooting Lab
          </button>
          <a
            href="#about"
            className="flex items-center gap-2 rounded-lg border border-border px-8 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground hover:border-primary/30"
          >
            <BookOpen className="h-4 w-4" />
            Troubleshooting Lab Documentation
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
            { title: "Wallet Recovery", desc: "All wallet interactions are fully regulated. Safe connections." },
            { title: "Forensic Logging", desc: "Every interaction is assessed for a calculated analysis and troubleshooting flow." },
            { title: "Safe by Design", desc: "All seed phrases are detected and masked. No external data is transmitted." },
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
          <h2 className="mb-4 text-2xl font-bold text-foreground">About This Tool</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed text-left">
            <p>
              Whether you are a beginner needing simple portfolio management assistance or a seasoned developer facing complex smart contract 
              issues, The Crypto Workshop provides the precision instruments and expertise required to get your digital finances back in perfect working order.
            </p>
            <p>
              <strong className="text-foreground">Asset Recovery & Wallet Repair:</strong> Advanced
               tools to assist in the troubleshooting and recovery of lost or inaccessible funds and repair 
              damaged wallet files using sophisticated cryptographic techniques and blockchain analytics.
            </p>
            <p>
              <strong className="text-foreground">Security Audits & Vulnerability Patching:</strong> Perform
               in-depth security assessments of your digital wallets and smart contracts to identify 
              vulnerabilities and apply necessary fixes.
            </p>
            <p className="border-t border-border pt-3 font-mono text-xs text-muted-foreground">
              ⚠️ This tool must be used with technical-know-how. It is intended for recovery and troubleshooting purposes only.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
