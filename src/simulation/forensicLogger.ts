export interface LogEntry {
  timestamp: string;
  event: string;
  data?: Record<string, unknown>;
  sessionId: string;
}

const SESSION_ID = `session_${Date.now().toString(36)}`;
const LOG_KEY = "forensic_logs";

function getLogs(): LogEntry[] {
  try {
    return JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
  } catch {
    return [];
  }
}

export const forensicLogger = {
  log(event: string, data?: Record<string, unknown>) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      event,
      data,
      sessionId: SESSION_ID,
    };

    const logs = getLogs();
    logs.push(entry);

    // Keep last 500 entries
    if (logs.length > 500) logs.splice(0, logs.length - 500);
    localStorage.setItem(LOG_KEY, JSON.stringify(logs));

    console.log(`[FORENSIC] ${event}`, data ?? "");
    return entry;
  },

  getAll(): LogEntry[] {
    return getLogs();
  },

  getSession(): LogEntry[] {
    return getLogs().filter((e) => e.sessionId === SESSION_ID);
  },

  clear() {
    localStorage.removeItem(LOG_KEY);
  },

  exportJSON(): string {
    return JSON.stringify(getLogs(), null, 2);
  },
};
