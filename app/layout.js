import { Figtree, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { themeInitScript } from "@/lib/theme";
import { introInitScript } from "@/lib/intro";
import { AppProviders } from "@/app/components/providers/AppProviders";
import SiteGuard from "@/app/components/providers/SiteGuard";
import AppBackground from "@/app/components/ui/AppBackground";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-face",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-face",
  display: "swap",
});

export const metadata = {
  title: "Dostin Santana — Fullstack Developer | Logic Code Spot",
  description:
    "Fullstack Web Developer en Santo Domingo, RD. Founder de Logic Code Spot. MERN, C#/.NET, sistemas DGII, e-commerce y SaaS.",
  openGraph: {
    title: "Dostin Santana — Fullstack Developer",
    description:
      "Founder & Lead Developer de Logic Code Spot. Sistemas empresariales, SaaS y APIs escalables.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${figtree.variable} ${sourceSerif.variable} ${figtree.className} antialiased overflow-x-hidden bg-[var(--bg)] text-[var(--fg)]`}
      >
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <Script
          id="intro-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: introInitScript }}
        />
        <SiteGuard />
        <AppBackground />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
