import Link from "next/link";

import generateViewport from "next";

export const viewport = generateViewport({
  deviceWidth: true,
  initialScale: 1,
  themeColor: "#1a355b",
  colorScheme: "dark light",
});

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: "2rem",
        textAlign: "center",
        backgroundColor: "#f8f9fa",
      }}
    >
      <h1 style={{ fontSize: "4rem", color: "#dc3545", marginBottom: "1rem" }}>
        404
      </h1>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        Page Not Found
      </h2>
      <p style={{ fontSize: "1.1rem", color: "#6c757d", marginBottom: "2rem" }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#1a355b",
          color: "white",
          textDecoration: "none",
          borderRadius: "0.375rem",
          fontWeight: "500",
          transition: "background-color 0.2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0f2338")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1a355b")}
      >
        Go Home
      </Link>
    </div>
  );
}
