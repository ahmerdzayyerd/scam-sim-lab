import { motion } from "framer-motion";
import {
  RefreshCw, ArrowRightLeft, Wrench, AlertTriangle,
  DollarSign, Lock, CheckCircle, Key,
} from "lucide-react";
import { ISSUE_TYPES } from "@/simulation/stateMachine";
import { forensicLogger } from "@/simulation/forensicLogger";

const ICON_MAP: Record<string, React.ElementType> = {
  RefreshCw, ArrowRightLeft, Wrench, AlertTriangle,
  DollarSign, Lock, CheckCircle, Key,
};

interface IssueGridProps {
  onSelect: (issueId: string) => void;
}

const IssueGrid = ({ onSelect }: IssueGridProps) => {
  const handleSelect = (id: string) => {
    forensicLogger.log("issue_selected", { issueType: id });
    onSelect(id);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {ISSUE_TYPES.map((issue, i) => {
        const Icon = ICON_MAP[issue.icon] ?? AlertTriangle;
        return (
          <motion.button
            key={issue.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            onClick={() => handleSelect(issue.id)}
            className="group relative flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-6 text-center transition-all hover:border-primary/50 hover:glow-primary focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary transition-colors group-hover:bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">{issue.label}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{issue.description}</p>
            <div className="absolute inset-0 rounded-lg border-2 border-transparent transition-colors group-hover:border-primary/20" />
          </motion.button>
        );
      })}
    </div>
  );
};

export default IssueGrid;
