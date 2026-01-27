// app/portal/page.tsx

export default function Portal() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "monospace",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "600px" }}>
        <h1 style={{ letterSpacing: "0.1em" }}>NEO·PROXY</h1>

        <p style={{ opacity: 0.7, marginTop: "0.5rem" }}>
          ACCESS POINT
        </p>

        <div style={{ margin: "3rem 0" }}>
          <p>This is not a portfolio.</p>
          <p>This is a controlled system.</p>
        </div>

        <p style={{ opacity: 0.5 }}>
          Portal initializing.
        </p>
      </div>
    </main>
  );
}
