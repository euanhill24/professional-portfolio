import type { Metadata, Viewport } from "next";
import { displayFont, bodyFont } from "@/lib/fonts";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://euanhill.com"),
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Euan Hill — AI Consultant & Technologist",
    description:
      "Portfolio of Euan Hill, an AI technology consultant specialising in enterprise AI strategy, intelligent automation, and digital transformation.",
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: "Euan Hill",
  },
  twitter: {
    card: "summary_large_image",
    title: "Euan Hill — AI Consultant & Technologist",
    description:
      "Portfolio of Euan Hill, an AI technology consultant specialising in enterprise AI strategy, intelligent automation, and digital transformation.",
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
              email: "mailto:euan.hill24@gmail.com",
              sameAs: [
                "https://www.linkedin.com/in/euan-hill/",
                "https://github.com/euanhill24",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Roboyo",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Edinburgh",
                addressCountry: "GB",
              },
              knowsAbout: [
                "Enterprise AI strategy",
                "Multi-agent AI platforms",
                "Azure AI Foundry",
                "Intelligent automation",
                "Process mining",
                "Digital transformation",
              ],
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
