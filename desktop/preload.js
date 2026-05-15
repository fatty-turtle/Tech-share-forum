const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("tsf", {
  getWebUrl: () => ipcRenderer.invoke("tsf:get-web-url"),
});
