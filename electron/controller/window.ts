import { BrowserWindow, ipcMain } from "electron";

ipcMain.on("pin", (event, pinned) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win!.setAlwaysOnTop(pinned);
});
