import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalFooter from "@/components/ConditionalFooter";
import LiveChatWidget from "@/components/LiveChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DAS Healthcare - Domiciliary Care Services",
  description:
    "Providing domiciliary care and support services to enhance the quality of life for individuals with diverse needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
      >
        <main className="flex-grow">{children}</main>
        <ConditionalFooter />
        <LiveChatWidget />
      </body>
    </html>
  );
}
