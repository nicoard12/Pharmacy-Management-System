export const pinWindow = (newPinnedState: boolean) => {
  window.ipcRenderer.send("pin", newPinnedState);
};

export const contextmenu = () => {
  window.ipcRenderer.send("contextmenu");
}

export const openLink = (url: string) => {
  window.ipcRenderer.send("openLink", url);
}
