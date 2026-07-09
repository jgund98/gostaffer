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
          alignItems: "center",
          justifyContent: "center",
          gap: 44,
          background: "linear-gradient(135deg, #08281b 0%, #0c3a28 48%, #051a12 100%)",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {/* soft green glows for depth */}
        <div
          style={{
            position: "absolute",
            top: -170,
            left: -130,
            width: 560,
            height: 560,
            display: "flex",
            background: "radial-gradient(circle, rgba(47,211,158,0.30), rgba(47,211,158,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -210,
            right: -150,
            width: 640,
            height: 640,
            display: "flex",
            background: "radial-gradient(circle, rgba(47,211,158,0.16), rgba(47,211,158,0) 70%)",
          }}
        />
        {/* faint mark watermark */}
        {MARK && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={MARK} width={540} height={540} alt="" style={{ position: "absolute", right: -130, bottom: -170, opacity: 0.05 }} />
        )}

        {/* logo — the primary focus */}
        {LOGO ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={LOGO} width={720} height={198} alt="GoStaffer" style={{ display: "flex" }} />
        ) : (
          <div style={{ display: "flex", fontSize: 128, fontWeight: 800, letterSpacing: -3 }}>
            <span style={{ color: "#fff" }}>go</span>
            <span style={{ color: "#2fd39e" }}>staffer</span>
          </div>
        )}

        {/* one short, on-brand line */}
        <div
          style={{
            display: "flex",
            fontSize: 38,
            fontWeight: 500,
            letterSpacing: -0.5,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          Real people. On your phones.{" "}
          <span style={{ color: "#2fd39e", marginLeft: 10 }}>Today.</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
