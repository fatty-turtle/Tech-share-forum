import { useState } from "react";
import "./styles.css";

export default function App() {
  const [msg, setMsg] = useState<string>("Loading...");

  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <h1 style={{ marginTop: 0 }}>TSF Desktop</h1>
      <p>{msg}</p>
    </div>
  );
}
