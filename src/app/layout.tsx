import type { Metadata } from "next";
import { displayFont, bodyFont } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Euan Hill — AI Consultant & Technologist",
  description:
    "Portfolio of Euan Hill, an AI technology consultant specialising in enterprise AI strategy, intelligent automation, and digital transformation.",
  keywords: [
    "AI Consultant",
    "Technology Consultant",
    "Enterprise AI",
    "Automation",
    "Digital Transformation",
    "Euan Hill",
  ],
  authors: [{ name: "Euan Hill" }],
  openGraph: {
    title: "Euan Hill — AI Consultant & Technologist",
    description:
      "Portfolio of Euan Hill, an AI technology consultant specialising in enterprise AI strategy, intelligent automation, and digital transformation.",
    type: "website",
    locale: "en_GB",
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
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Euan Hill",
              jobTitle: "AI Consultant & Technologist",
              description:
                "AI technology consultant specialising in enterprise AI strategy, intelligent automation, and digital transformation.",
              url: "https://euanhill.com",
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
