import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import PageTransition from "@/components/PageTransition";
import { AuthProvider } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Kenangan - Koleksi Momen Berharga",
  description: "Sebuah perjalanan waktu melalui foto dan cerita kenangan hidup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="mobile-app-shell">
        <AuthProvider>
          <div className="safe-bottom">
            <PageTransition>
              {children}
            </PageTransition>
          </div>
          <BottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
