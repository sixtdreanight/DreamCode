import { readFileSync } from "fs";
import { join } from "path";

export function getLessonContent(id: string): string {
  return readFileSync(
    join(process.cwd(), "content/lessons", `${id}.md`),
    "utf-8"
  );
}
