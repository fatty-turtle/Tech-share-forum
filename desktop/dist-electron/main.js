import { app, BrowserWindow } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = !app.isPackaged;
const VITE_DEV_URL = process.env.VITE_DEV_URL ?? "http://localhost:5173";
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  if (isDev) {
    mainWindow.loadURL(VITE_DEV_URL);
  } else {
    // In production we load the Vite-built renderer from dist/renderer
    const indexHtml = path.join(__dirname, "..", "renderer", "index.html");
    mainWindow.loadFile(indexHtml);
  }
  // Provide API base URL to renderer (no import.meta.env in Electron runtime)
  mainWindow.webContents.once("did-finish-load", () => {
    mainWindow.webContents.send("config", {
      apiBaseUrl: process.env.VITE_API_BASE_URL ?? "http://localhost:4000",
    });
  });
}
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
