import { getWalletProfile, type WalletProfile } from "./walletProfiles";

export interface FakeWalletState {
  connected: boolean;
  profile: WalletProfile | null;
  pendingApprovals: string[];
}

let state: FakeWalletState = {
  connected: false,
  profile: null,
  pendingApprovals: [],
};

const listeners: Set<(s: FakeWalletState) => void> = new Set();

function notify() {
  listeners.forEach((fn) => fn({ ...state }));
}

export const fakeProvider = {
  connect(profileId: string = "high") {
    state = {
      connected: true,
      profile: getWalletProfile(profileId),
      pendingApprovals: [],
    };
    notify();
    return state;
  },

  disconnect() {
    state = { connected: false, profile: null, pendingApprovals: [] };
    notify();
    return state;
  },

  getState(): FakeWalletState {
    return { ...state };
  },

  requestApproval(token: string) {
    state.pendingApprovals = [...state.pendingApprovals, token];
    notify();
    return `SIMULATED_TX_${Date.now().toString(16)}`;
  },

  subscribe(fn: (s: FakeWalletState) => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};
