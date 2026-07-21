import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NexPetCare | Booking Engine",
  description: "Automated pet care scheduling systems",

  // --- ADDED: PWA Metadata ---
  manifest: "/manifest.json",
  icons: {
    apple: "/logohome.jpg", // Tells iOS to use this specific logo for the home screen
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NexPetCare",
  },
};

// In Next.js 14+, theme color is handled in a separate viewport export
export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="h-full bg-white text-gray-900">
        {children}
        <Analytics />
      </body>
    </html>
  );
}