"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contextBridge_1 = require("./shared/contextBridge");
(0, contextBridge_1.contextBridge)();
// Forward config event from main to renderer window
const electron_1 = require("electron");
electron_1.ipcRenderer.on("config", (_event, payload) => {
    window.dispatchEvent(new CustomEvent("config", { detail: payload }));
});
