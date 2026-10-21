import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { profileData } from "@/data/profile";
import { siteConfig } from "@/data/site";

export const alt = `${profileData.name} | ${profileData.roleTitle}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage(): ImageResponse {
  const fontPath = path.join(
    process.cwd(),
    "node_modules",
    "next",
    "dist",
    "compiled",
    "@vercel",
    "og",
    "Geist-Regular.ttf"
  );
  const fontData = fs.readFileSync(fontPath);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0D0D0D",
          padding: "56px 64px",
          fontFamily: "GeistSans",
          color: "#FFFFFF",
          position: "relative",
        }}
      >
        {/* Subtle dark surface card with orange accent top border */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            backgroundColor: "#141414",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderTop: "4px solid #FF6B00",
            borderRadius: "20px",
            padding: "48px 56px",
          }}
        >
          {/* Top row: OM. logo and availability pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                fontSize: "40px",
                fontWeight: 700,
                letterSpacing: "-0.03em",
              }}
            >
              <span style={{ color: "#FFFFFF" }}>{siteConfig.logoPrefix}</span>
              <span style={{ color: "#FF6B00" }}>{siteConfig.logoDot}</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "#1A1A1A",
                border: "1px solid rgba(255, 107, 0, 0.4)",
                borderRadius: "9999px",
                padding: "10px 22px",
                fontSize: "18px",
                color: "#FFFFFF",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "9999px",
                  backgroundColor: "#FF6B00",
                }}
              />
              <span>{profileData.availabilityBadge}</span>
            </div>
          </div>

          {/* Center: Name, Role Title, and Value Statement */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div
              style={{
                fontSize: "34px",
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
              }}
            >
              {profileData.name}
            </div>
            <div
              style={{
                fontSize: "66px",
                fontWeight: 700,
                color: "#FF6B00",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
              }}
            >
              {profileData.roleTitle}
            </div>
            <div
              style={{
                fontSize: "24px",
                color: "#A3A3A3",
                lineHeight: 1.45,
                maxWidth: "880px",
                marginTop: "6px",
              }}
            >
              {profileData.valueStatement}
            </div>
          </div>

          {/* Bottom row: Location & Key Stack */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              paddingTop: "24px",
              fontSize: "20px",
              color: "#A3A3A3",
            }}
          >
            <span>{profileData.location}</span>
            <span style={{ color: "#FF6B00" }}>
              Python · Next.js · FastAPI · LangGraph · MLOps
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "GeistSans",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
