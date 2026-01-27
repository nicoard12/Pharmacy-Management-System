import { BrowserWindow, clipboard, ipcMain, Menu, shell } from "electron";

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
