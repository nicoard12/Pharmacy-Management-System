export const pinWindow = (newPinnedState: boolean) => {
  window.ipcRenderer.send("pin", newPinnedState);
};

export const contextmenu = () => {
  window.ipcRenderer.send("contextmenu");
}
