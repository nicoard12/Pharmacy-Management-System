import { TextRun } from "docx";

export function parseLineToRuns(line: string) {
  const runs: TextRun[] = [];
  const regex = /\*(.*?)\*/g;

  let lastIndex = 0;
  let match;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      runs.push(new TextRun(line.substring(lastIndex, match.index)));
    }

    runs.push(
      new TextRun({
        text: match[1],
        bold: true,
      }),
    );

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < line.length) {
    runs.push(new TextRun(line.substring(lastIndex)));
  }

  return runs;
}

export function buildHtml(content: string): string {
  const parsedContent = content
    .replace(/\*(.*?)\*/g, "<b>$1</b>")
    .replace(/\n/g, "<br>");

  return `
    <html>
      <style>
        body { font-family: sans-serif; padding: 40px; line-height: 1.6; }
        b { color: #333; font-weight: bold; }
      </style>
      <body>
        ${parsedContent}
      </body>
    </html>
  `;
}
