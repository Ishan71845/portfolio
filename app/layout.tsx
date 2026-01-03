import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Chatbot from "@/components/Chatbot";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGradient from "@/components/CursorGradient";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Ishan Shrivastava | Full Stack & Blockchain Engineer",
    template: "%s | Ishan Shrivastava",
  },
  description:
    "Portfolio of Ishan Shrivastava - Full Stack Developer and Blockchain Engineer specializing in React, Next.js, and Solidity. Building scalable web applications and decentralized solutions.",
  keywords: [
    "Ishan Shrivastava",
    "Full Stack Developer",
    "Blockchain Engineer",
    "Web3 Developer",
    "React Developer",
    "Next.js Developer",
    "Solidity Developer",
    "Smart Contracts",
    "Ethereum",
    "TypeScript",
    "Node.js",
    "MERN Stack",
    "Portfolio",
    "Pune",
    "India",
  ],
  authors: [{ name: "Ishan Shrivastava", url: "https://github.com/Ishan71845" }],
  creator: "Ishan Shrivastava",
  publisher: "Ishan Shrivastava",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ishanshrivastava.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ishanshrivastava.dev",
    title: "Ishan Shrivastava | Full Stack & Blockchain Engineer",
    description:
      "Portfolio of Ishan Shrivastava - Full Stack Developer and Blockchain Engineer specializing in React, Next.js, and Solidity.",
    siteName: "Ishan Shrivastava Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ishan Shrivastava - Full Stack & Blockchain Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ishan Shrivastava | Full Stack & Blockchain Engineer",
    description:
      "Portfolio of Ishan Shrivastava - Full Stack Developer and Blockchain Engineer specializing in React, Next.js, and Solidity.",
    images: ["/og-image.png"],
    creator: "@ishanshrivastava",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/svg+xml" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground min-h-screen`}
      >
        {/* Skip to main content - Accessibility */}
        <a
          href="#home"
          className="skip-link"
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>

        {/* Scroll Progress Indicator */}
        <ScrollProgress />

        {/* Cursor Gradient Effect */}
        <CursorGradient />

        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Main Content */}
        <main
          id="main-content"
          className="lg:ml-[280px] min-h-screen"
          role="main"
        >
          {children}
        </main>

        {/* AI Chatbot */}
        <Chatbot />
      </body>
    </html>
  );
}
