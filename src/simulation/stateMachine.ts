export type FlowStep =
  | "select_issue"
  | "describe_problem"
  | "connect_wallet"
  | "manual_recovery"
  | "processing"
  | "result";

export interface FlowState {
  currentStep: FlowStep;
  issueType: string | null;
  description: string;
  walletConnected: boolean;
  recoveryAttempted: boolean;
  startedAt: number;
}

export function createInitialState(): FlowState {
  return {
    currentStep: "select_issue",
    issueType: null,
    description: "",
    walletConnected: false,
    recoveryAttempted: false,
    startedAt: Date.now(),
  };
}

export function nextStep(state: FlowState): FlowState {
  const transitions: Record<FlowStep, FlowStep> = {
    select_issue: "describe_problem",
    describe_problem: "connect_wallet",
    connect_wallet: "manual_recovery",
    manual_recovery: "processing",
    processing: "result",
    result: "result",
  };
  return { ...state, currentStep: transitions[state.currentStep] };
}

export function goToStep(state: FlowState, step: FlowStep): FlowState {
  return { ...state, currentStep: step };
}

export const ISSUE_TYPES = [
  { id: "sync", label: "Synchronize", icon: "RefreshCw", description: "Wallet synchronization issues with the network" },
  { id: "migration", label: "Migration", icon: "ArrowRightLeft", description: "Token migration or chain swap failures" },
  { id: "rectification", label: "Rectification", icon: "Wrench", description: "Transaction rectification and correction" },
  { id: "glitch", label: "Wallet Glitch", icon: "AlertTriangle", description: "Unexpected wallet behavior or display errors" },
  { id: "balance", label: "Missing Balance", icon: "DollarSign", description: "Funds not reflecting after transaction" },
  { id: "locked", label: "Locked Account", icon: "Lock", description: "Wallet access restricted or frozen" },
  { id: "validation", label: "Validation", icon: "CheckCircle", description: "Smart contract validation failures" },
  { id: "recovery", label: "Recovery", icon: "Key", description: "Wallet recovery and access restoration" },
] as const;
