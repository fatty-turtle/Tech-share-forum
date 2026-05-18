"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const node_path_1 = __importDefault(require("node:path"));
const isDev = !electron_1.app.isPackaged;
const VITE_DEV_URL = process.env.VITE_DEV_URL ?? "http://localhost:5173";
const CLIENT_WEB_URL = process.env.CLIENT_WEB_URL ?? "http://localhost:3000";
const SERVER_CONNECT_TIMEOUT_MS = Number(process.env.SERVER_CONNECT_TIMEOUT_MS ?? 20_000);
function waitForUrl(url, timeoutMs) {
    const startedAt = Date.now();
    return new Promise((resolve) => {
        const tick = async () => {
            try {
                const controller = new AbortController();
                const t = setTimeout(() => controller.abort(), 1000);
                const res = await fetch(url, {
                    method: "GET",
                    signal: controller.signal,
                });
                clearTimeout(t);
                // Any response (even non-200) means the dev server is up and reachable
                resolve(res ? true : false);
                return;
            }
            catch {
                if (Date.now() - startedAt >= timeoutMs) {
                    resolve(false);
                    return;
                }
                setTimeout(tick, 500);
            }
        };
        tick();
    });
}
async function connectAndNavigate(mainWindow) {
    const ok = await waitForUrl(CLIENT_WEB_URL, SERVER_CONNECT_TIMEOUT_MS);
    if (ok) {
        mainWindow.loadURL(CLIENT_WEB_URL);
        return { connected: true };
    }
    return { connected: false, timeoutMs: SERVER_CONNECT_TIMEOUT_MS };
}
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
    // Always start with the local React loader (spinner / error / retry)
    if (isDev) {
        mainWindow.loadURL(VITE_DEV_URL);
    }
    else {
        // In production we load the Vite-built renderer from dist/renderer
        const indexHtml = node_path_1.default.join(__dirname, "..", "renderer", "index.html");
        mainWindow.loadFile(indexHtml);
    }
    // Provide API base URL to loader/renderer
    mainWindow.webContents.once("did-finish-load", () => {
        mainWindow.webContents.send("config", {
            apiBaseUrl: process.env.VITE_API_BASE_URL ?? "http://localhost:4000",
        });
        // Start connection attempt after loader has rendered
        connectAndNavigate(mainWindow).then((result) => {
            if (!result.connected) {
                mainWindow.webContents.send("client-connection-error", {
                    message: `Cannot connect to client web at ${CLIENT_WEB_URL}`,
                    timeoutMs: result.timeoutMs,
                });
            }
        });
    });
    mainWindow.webContents.on("did-fail-load", () => {
        // If navigation fails after we tried to load the client, show loader error.
        // (Retry will trigger a fresh navigation.)
        mainWindow.webContents.send("client-connection-error", {
            message: `Failed to load client web at ${CLIENT_WEB_URL}`,
            timeoutMs: SERVER_CONNECT_TIMEOUT_MS,
        });
    });
    // Retry handler: listen from loader UI via a DOM event
    // We keep it minimal because preload has no IPC.
    mainWindow.webContents.on("ipc-message", () => {
        // noop (no ipc used)
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
