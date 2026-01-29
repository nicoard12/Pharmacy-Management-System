export const pinWindow = (newPinnedState: boolean) => {
  window.ipcRenderer.send("pin", newPinnedState);
};

export const contextmenu = () => {
  window.ipcRenderer.send("contextmenu");
};

export const openLink = (url: string) => {
  window.ipcRenderer.send("openLink", url);
};

export const copyToClipboard = (text: string) => {
  window.ipcRenderer.send("copy", text);
};

export const paste = async () => {
  return await window.ipcRenderer.invoke("paste");
};

export const download_docx = async (data: string, fileName: string) => {
  const safeFileName = fileName.endsWith(".docx")
    ? fileName
    : `${fileName}.docx`;
  await window.ipcRenderer.invoke("download-docx", data, safeFileName);
};

export const download_pdf = async (data: string, fileName: string) => {
  const safeFileName = fileName.endsWith(".pdf")
    ? fileName
    : `${fileName}.pdf`;
  await window.ipcRenderer.invoke("download-pdf", data, safeFileName);
};
