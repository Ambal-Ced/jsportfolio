import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { ScrollRestoreHost } from "@/components/shell/ScrollRestoreHost";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Justine Cedrick R. Ambal | Portfolio",
  description: "Welcome to Justine Cedrick R. Ambal Portfolio Website",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <Script id="arzen-theme" strategy="beforeInteractive">
          {`try{var t=localStorage.getItem("arzen-theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);document.documentElement.style.colorScheme=t}}catch(e){}`}
        </Script>
        <ScrollRestoreHost />
        {children}
      </body>
    </html>
  );
}
