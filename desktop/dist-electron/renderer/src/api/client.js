"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHello = getHello;
let apiBaseUrl = "http://localhost:4000";
// receives apiBaseUrl from Electron main via config event
window.addEventListener("config", ((event) => {
    const detail = event.detail;
    if (detail?.apiBaseUrl)
        apiBaseUrl = detail.apiBaseUrl;
}));
async function getHello() {
    // If your API doesn't expose /health, this will fail.
    const res = await fetch(`${apiBaseUrl}/health`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok)
        throw new Error(`HTTP ${res.status}`);
    const data = (await res.json());
    return data.message ?? "OK";
}
