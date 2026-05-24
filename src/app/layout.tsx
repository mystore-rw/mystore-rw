import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Provider } from "@/components/ui/provider";
import { QueryProvider } from "@/components/ui/query-provider";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MyStore RW — Browse Local. Buy on WhatsApp.",
  description:
    "Discover products from trusted local vendors in your Kigali neighborhood. Connect directly on WhatsApp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.variable} style={{ fontFamily: "var(--font-roboto), sans-serif" }}>
        <Provider>
          <QueryProvider>{children}</QueryProvider>
        </Provider>
      </body>
    </html>
  );
}
