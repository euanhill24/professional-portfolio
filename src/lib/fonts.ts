import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";

// Only the weights actually used: 300 (display/watermark/numerals), 400 (headings)
export const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-display",
  display: "swap",
});

export const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
