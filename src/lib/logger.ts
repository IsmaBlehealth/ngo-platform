type LogLevel = "info" | "warn" | "error" | "security";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  requestId?: string;
  context?: Record<string, unknown>;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  info: 0,
  warn: 1,
  error: 2,
  security: 2,
};

const minLevel = process.env.NODE_ENV === "production" ? LOG_LEVELS.warn : LOG_LEVELS.info;

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= minLevel;
}

function formatEntry(entry: LogEntry): string {
  const parts = [
    `[${entry.timestamp}]`,
    `[${entry.level.toUpperCase()}]`,
  ];

  if (entry.requestId) {
    parts.push(`[req:${entry.requestId}]`);
  }

  parts.push(entry.message);

  if (entry.context) {
    parts.push(JSON.stringify(entry.context));
  }

  return parts.join(" ");
}

function log(level: LogLevel, message: string, context?: Record<string, unknown>, requestId?: string) {
  if (!shouldLog(level)) return;

  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    requestId,
    context,
  };

  const formatted = formatEntry(entry);

  switch (level) {
    case "error":
      console.error(formatted);
      break;
    case "warn":
      console.warn(formatted);
      break;
    case "security":
      console.warn(formatted);
      break;
    default:
      console.log(formatted);
  }
}

export const logger = {
  info: (message: string, ctx?: Record<string, unknown>, requestId?: string) =>
    log("info", message, ctx, requestId),
  warn: (message: string, ctx?: Record<string, unknown>, requestId?: string) =>
    log("warn", message, ctx, requestId),
  error: (message: string, ctx?: Record<string, unknown>, requestId?: string) =>
    log("error", message, ctx, requestId),
  security: (message: string, ctx?: Record<string, unknown>, requestId?: string) =>
    log("security", message, ctx, requestId),
};
