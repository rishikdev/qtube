import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "./provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "QTube",
  description: "A platform to watch YouTube videos",
};

const customFont = Comfortaa({
  weight: "variable",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={customFont.className}>
        <ReduxProvider>
          {children}
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
