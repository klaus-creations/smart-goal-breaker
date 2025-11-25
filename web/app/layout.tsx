import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Goal Breaker",
  description: "Break down your goals into achievable steps",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-white min-h-screen ${inter.className}`}>
        <AppProviders>
          <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
              <Link
                href="/"
                className="text-xl font-bold text-gray-900 tracking-tight"
              >
                Goal Breaker
              </Link>

              <Link href="/create">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-full">
                  + New Goal
                </Button>
              </Link>
            </div>
          </nav>

          <main className="container mx-auto py-8 px-4">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
