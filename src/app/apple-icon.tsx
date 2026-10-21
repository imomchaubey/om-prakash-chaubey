import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { siteConfig } from "@/data/site";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon(): ImageResponse {
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
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0D0D0D",
          borderRadius: "36px",
          border: "4px solid #FF6B00",
          fontFamily: "GeistSans",
          fontSize: "76px",
          fontWeight: 700,
          letterSpacing: "-0.04em",
        }}
      >
        <span style={{ color: "#FFFFFF" }}>{siteConfig.logoPrefix}</span>
        <span style={{ color: "#FF6B00" }}>{siteConfig.logoDot}</span>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "GeistSans",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
