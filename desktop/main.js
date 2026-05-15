const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");

const DEFAULT_WEB_URL = "http://localhost:3000";

function getWebUrl() {
  return process.env.TSF_WEB_URL || DEFAULT_WEB_URL;
}

function createWindow() {
  const webUrl = getWebUrl();

  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 960,
    minHeight: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // If the web server isn't ready yet, show fallback UI while we load.
  win.loadFile(path.join(__dirname, "index.html"));

  // Load Next/website URL.
  win.webContents.once("did-finish-load", () => {
    win.webContents.send("tsf:weburl", webUrl);
  });

  // Trigger navigation immediately.
  win.webContents.loadURL(webUrl).catch(() => {
    // Keep fallback page.
  });

  return win;
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

ipcMain.handle("tsf:get-web-url", () => getWebUrl());
