import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { profileData } from "@/data/profile";
import { siteConfig } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${profileData.name} | ${profileData.roleTitle}`,
    template: `%s | ${profileData.name}`,
  },
  description:
    "Portfolio of Om Prakash Chaubey, Full-Stack & AI Engineer in Patiala, India. Building full-stack Next.js & FastAPI apps, LangGraph AI agents, and ML pipelines.",
  alternates: {
    canonical: "/",
  },
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps): React.JSX.Element {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-bg text-text-primary antialiased selection:bg-accent selection:text-bg">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-[10px] focus:bg-accent focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-bg"
        >
          Skip to content
        </a>
        <LenisProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
