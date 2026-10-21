import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { profileData } from "@/data/profile";
import { siteConfig } from "@/data/site";
import { skillGroups } from "@/data/skills";
import { educationEntries } from "@/data/education";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const defaultTitle = `${profileData.name} | ${profileData.roleTitle}`;

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${profileData.name}`,
  },
  description: siteConfig.seoDescription,
  keywords: [...siteConfig.seoKeywords],
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    title: defaultTitle,
    description: siteConfig.seoDescription,
    url: siteConfig.siteUrl,
    siteName: profileData.name,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.seoDescription,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profileData.name,
  jobTitle: profileData.roleTitle,
  url: siteConfig.siteUrl,
  sameAs: profileData.socials.map((social) => social.url),
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: educationEntries[0].institution,
  },
  knowsAbout: skillGroups.flatMap((group) => group.items),
  address: {
    "@type": "PostalAddress",
    addressLocality: profileData.address.addressLocality,
    addressCountry: profileData.address.addressCountry,
  },
};

const serializedPersonJsonLd = JSON.stringify(personJsonLd).replace(
  /</g,
  "\\u003c"
);

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps): React.JSX.Element {
  return (
    <html lang="en" className={`${inter.variable} ${inter.className}`}>
      <head>
        <link
          rel="preload"
          href="/_next/static/media/e4af272ccee01ff0-s.p.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-bg text-text-primary antialiased selection:bg-accent selection:text-bg">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializedPersonJsonLd }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-[10px] focus:bg-accent focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-bg"
        >
          Skip to content
        </a>
        <LenisProvider>
          <Navbar />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
