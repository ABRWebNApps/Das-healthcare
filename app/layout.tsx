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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://dascareproviders.com"
  ),
  title: {
    default: "DAS Healthcare Providers - Domiciliary Care Services",
    template: "%s | DAS Healthcare Providers - Domiciliary Care Services",
  },
  description:
    "Providing expert, personalized domiciliary care and home support services. We empower individuals with diverse needs to live comfortably and independently at home.",
  keywords: [
    "domiciliary care",
    "home care services",
    "supported living",
    "elderly care",
    "healthcare providers",
    "in-home nursing",
    "DAS Healthcare Providers",
  ],
  authors: [{ name: "DAS Healthcare Providers" }],
  creator: "DAS Healthcare Providers",
  publisher: "DAS Healthcare Providers",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: "DAS Healthcare Providers",
    title: "DAS Healthcare Providers - Domiciliary Care Services",
    description:
      "Compassionate domiciliary care tailored to your unique needs. Helping you maintain independence in the comfort of your own home.",
    images: [
      {
        url: "/newlogo.png",
        width: 800,
        height: 600,
        alt: "DAS Healthcare Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DAS Healthcare Providers - Domiciliary Care Services",
    description: "Expert home care and supported living services.",
    images: ["/newlogo.png"],
  },
  icons: {
    icon: "/newlogo.png",
    apple: "/newlogo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
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
