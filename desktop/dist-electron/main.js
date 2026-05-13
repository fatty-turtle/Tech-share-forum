"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const node_path_1 = __importDefault(require("node:path"));
const isDev = !electron_1.app.isPackaged;
const VITE_DEV_URL = process.env.VITE_DEV_URL ?? "http://localhost:5173";
function createWindow() {
    const mainWindow = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: node_path_1.default.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });
    if (isDev) {
        mainWindow.loadURL(VITE_DEV_URL);
    }
    else {
        // In production we load the Vite-built renderer from dist/renderer
        const indexHtml = node_path_1.default.join(__dirname, "..", "renderer", "index.html");
        mainWindow.loadFile(indexHtml);
    }
    // Provide API base URL to renderer (no import.meta.env in Electron runtime)
    mainWindow.webContents.once("did-finish-load", () => {
        mainWindow.webContents.send("config", {
            apiBaseUrl: process.env.VITE_API_BASE_URL ?? "http://localhost:4000",
        });
    });
}
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on("activate", () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        electron_1.app.quit();
});
