import { useEffect, useState } from "react";

function Spinner() {
  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 999,
        border: "4px solid rgba(0,0,0,0.12)",
        borderTopColor: "rgba(0,0,0,0.65)",
        animation: "tsf-spin 0.9s linear infinite",
      }}
    />
  );
}

export default function App() {
  const [status, setStatus] = useState<
    | { kind: "connecting" }
    | { kind: "error"; message: string; timeoutMs?: number }
  >({ kind: "connecting" });

  useEffect(() => {
    // Receive config and connection error messages from Electron main process.
    const onConfig = (_e: Event) => {
      // no-op for now; API base url handled inside web app
    };

    const onClientError = (e: Event) => {
      const detail = (e as CustomEvent).detail as
        | { message: string; timeoutMs?: number }
        | undefined;
      if (!detail?.message) return;
      setStatus({
        kind: "error",
        message: detail.message,
        timeoutMs: detail.timeoutMs,
      });
    };

    window.addEventListener("config", onConfig as EventListener);
    window.addEventListener(
      "client-connection-error",
      onClientError as EventListener,
    );

    return () => {
      window.removeEventListener("config", onConfig as EventListener);
      window.removeEventListener(
        "client-connection-error",
        onClientError as EventListener,
      );
    };
  }, []);

  const onRetry = () => {
    // Ask Electron main process to retry by reloading this loader UI.
    // When it loads again, main process will attempt connection again.
    window.location.reload();
  };

  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <style>{`@keyframes tsf-spin { to { transform: rotate(360deg); } }`}</style>
      <h1 style={{ marginTop: 0 }}>TSF Desktop</h1>

      {status.kind === "connecting" && (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Spinner />
          <div>
            <div style={{ fontWeight: 600 }}>Connecting to client web…</div>
            <div style={{ color: "rgba(0,0,0,0.6)", fontSize: 13 }}>
              Please wait.
            </div>
          </div>
        </div>
      )}

      {status.kind === "error" && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#d92d20",
              }}
            />
            <div style={{ fontWeight: 700 }}>Cannot connect to client web</div>
          </div>

          <p
            style={{
              color: "rgba(0,0,0,0.7)",
              marginTop: 10,
              lineHeight: 1.35,
            }}
          >
            {status.message}
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button
              onClick={onRetry}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.15)",
                background: "white",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
