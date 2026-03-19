import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "GymBadgeTracker",
  description: "Traccia. Sblocca. Domina la tua Palestra.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        try {
          var theme = localStorage.getItem('theme');
          if (theme === 'dark' || (!theme && true)) {
            document.documentElement.classList.add('dark');
          }
        } catch(e) {}
      `,
          }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${syne.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
          >
            {/* Background Elements from Mockup */}
            <div className="bg-noise"></div>

            <Navbar />

            {/* Main content area expands to push footer down */}
            <main className="flex-1 flex flex-col relative z-[2] overflow-y-auto overflow-x-hidden">
              {children}
            </main>

            <Footer />
            <CookieBanner />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
