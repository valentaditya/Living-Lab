import "server-only";

import { randomUUID } from "node:crypto";
import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

export interface ActivityLogEntry {
  id: string;
  action: string;
  detail: string;
  createdAt: string;
}

const storageDirectory = path.join(process.cwd(), ".livinglab");
const logPath = path.join(storageDirectory, "activity.jsonl");
const maximumLogEntries = 100;

export async function writeActivityLog(action: string, detail: string) {
  const entry: ActivityLogEntry = {
    id: randomUUID(),
    action,
    detail,
    createdAt: new Date().toISOString(),
  };

  await mkdir(storageDirectory, { recursive: true });
  await appendFile(logPath, `${JSON.stringify(entry)}\n`, "utf8");
}

export async function getActivityLogs(): Promise<ActivityLogEntry[]> {
  let contents: string;
  try {
    contents = await readFile(logPath, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }

  return contents
    .split("\n")
    .filter(Boolean)
    .slice(-maximumLogEntries)
    .reverse()
    .map((line) => {
      const entry: unknown = JSON.parse(line);
      if (
        !entry ||
        typeof entry !== "object" ||
        !("id" in entry) ||
        !("action" in entry) ||
        !("detail" in entry) ||
        !("createdAt" in entry) ||
        typeof entry.id !== "string" ||
        typeof entry.action !== "string" ||
        typeof entry.detail !== "string" ||
        typeof entry.createdAt !== "string"
      ) {
        throw new Error("Stored Living Lab activity log has an invalid entry.");
      }
      return entry as ActivityLogEntry;
    });
}
