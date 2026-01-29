import { app, BrowserWindow, clipboard, ipcMain, Menu, shell } from "electron";
import { Document, Packer, Paragraph } from "docx";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { buildHtml, parseLineToRuns } from "../utils/download";

ipcMain.on("pin", (event, pinned) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win!.setAlwaysOnTop(pinned);
});

const contextMenu = Menu.buildFromTemplate([
  { role: "selectAll", label: "Seleccionar todo" },
  { role: "copy", label: "Copiar" },
  { role: "paste", label: "Pegar" },
  { role: "undo", label: "Deshacer" },
  { role: "redo", label: "Rehacer" },
]);

ipcMain.on("contextmenu", () => {
  contextMenu.popup();
});

ipcMain.on("openLink", (_, url) => {
  shell.openExternal(url);
});

ipcMain.on("copy", (_, text) => {
  clipboard.writeText(text);
});

ipcMain.handle("paste", () => {
  return clipboard.readText();
});

ipcMain.handle(
  "download-docx",
  async (_, content: string, fileName = "archivoAppFarmacia.docx") => {
    const doc = new Document({
      sections: [
        {
          children: content.split("\n").map(
            (line) =>
              new Paragraph({
                children: parseLineToRuns(line),
              }),
          ),
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    const downloadsPath = app.getPath("downloads");
    const filePath = join(downloadsPath, fileName);

    await writeFile(filePath, buffer);

    await shell.openPath(filePath);

    return filePath;
  },
);

ipcMain.handle(
  "download-pdf",
  async (_, content: string, fileName = "archivoAppFarmacia.pdf") => {
    const tempWindow = new BrowserWindow({
      show: false,
      webPreferences: {
        offscreen: true,
      },
    });

    const htmlContent = buildHtml(content);

    await tempWindow.loadURL(
      `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`,
    );

    const pdfBuffer = await tempWindow.webContents.printToPDF({
      margins: { marginType: "default" },
      printBackground: true,
      pageSize: "A4",
    });

    const downloadsPath = app.getPath("downloads");
    const filePath = join(downloadsPath, fileName);

    await writeFile(filePath, pdfBuffer);
    tempWindow.close();
    await shell.openPath(filePath);

    return filePath;
  },
);
