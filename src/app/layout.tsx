import type { Metadata } from "next";
import { Geist, Geist_Mono, Advent_Pro, Flamenco } from "next/font/google";
import "./globals.scss";

const advent = Advent_Pro({
  variable: "--font-advent",
  weight: '400',
  subsets: ['latin']
});

const flamenco = Flamenco({
  variable: "--font-flamenco",
  weight: '400',
  subsets: ['latin']
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const APP_NAME = "Agua Vida"
const APP_DESCRIPTION = "Handy chlorine calculator"
export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: APP_NAME,
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={`${flamenco.variable} ${advent.variable} ${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
