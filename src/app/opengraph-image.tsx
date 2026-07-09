import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "GoStaffer — win more customers on the phone, without the call center";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// embed the real brand assets so next/og can render them (no generated mark).
// Read lazily + safely so a wrong cwd never throws at module load (which would
// break every page's metadata). At build time the cwd is the project root, so
// the static OG image embeds the real logo.
function safeB64(p: string): string | null {
  try {
    return `data:image/png;base64,${readFileSync(join(process.cwd(), p)).toString("base64")}`;
  } catch {
    return null;
  }
}

const pill = {
  display: "flex",
  alignItems: "center",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.05)",
  padding: "12px 22px",
  fontSize: 24,
  fontWeight: 600,
  color: "rgba(255,255,255,0.82)",
};

export default function OG() {
  const LOGO = safeB64("public/img/logo-white.png");
  const MARK = safeB64("public/img/mark-white.png");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #08281b 0%, #0a3324 45%, #051a12 100%)",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {/* cyan glow */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 620,
            height: 620,
            display: "flex",
            background: "radial-gradient(circle, rgba(47,211,158,0.28), rgba(47,211,158,0) 70%)",
          }}
        />
        {/* real-mark watermark */}
        {MARK && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={MARK} width={440} height={440} alt="" style={{ position: "absolute", right: -60, bottom: -100, opacity: 0.06 }} />
        )}

        {/* top row — real logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {LOGO ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={LOGO} width={236} height={54} alt="GoStaffer" />
          ) : (
            <div style={{ display: "flex", fontSize: 42, fontWeight: 800, letterSpacing: -1 }}>
              <span style={{ color: "#fff" }}>go</span>
              <span style={{ color: "#2fd39e" }}>staffer</span>
            </div>
          )}
          <div style={{ ...pill, color: "#7defc4" }}>
            <div style={{ display: "flex", width: 12, height: 12, borderRadius: 999, background: "#35d6a0", marginRight: 12 }} />
            Live calling floor
          </div>
        </div>

        {/* headline — wraps, never clips */}
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 64, fontWeight: 800, lineHeight: 1.06, letterSpacing: -2, color: "#fff", maxWidth: 1040 }}>
            <span>Win more customers on the phone&nbsp;</span>
            <span style={{ color: "#2fd39e" }}>without the call center.</span>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "rgba(255,255,255,0.65)", maxWidth: 960 }}>
            Trained, bilingual teams in Cairo, managed from West Palm Beach. Kickoff in 24 hours, live in days — billed by the minute.
          </div>
        </div>

        {/* bottom pills */}
        <div style={{ display: "flex", gap: 16 }}>
          <div style={pill}>500K+ dials / month</div>
          <div style={pill}>98% fluent English</div>
          <div style={pill}>Zero platform fees</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
