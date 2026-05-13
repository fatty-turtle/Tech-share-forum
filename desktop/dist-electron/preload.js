import { contextBridge } from "./shared/contextBridge";
contextBridge();
// Forward config event from main to renderer window
import { ipcRenderer } from "electron";
ipcRenderer.on("config", (_event, payload) => {
    window.dispatchEvent(new CustomEvent("config", { detail: payload }));
});
