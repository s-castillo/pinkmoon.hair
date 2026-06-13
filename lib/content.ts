import { promises as fs } from "node:fs";
import path from "node:path";

const contentRoot = path.join(process.cwd(), "content");

export async function readContentFile<T>(relativePath: string): Promise<T> {
  const fullPath = path.join(contentRoot, relativePath);
  const raw = await fs.readFile(fullPath, "utf8");
  return JSON.parse(raw) as T;
}
