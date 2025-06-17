import type React from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shaheer Hassan - Full Stack Developer Portfolio",
  description:
    "Professional portfolio showcasing full-stack development projects, skills, and experience in modern web technologies.",
  keywords: "full-stack developer, web development, React, Next.js, portfolio",
  authors: [{ name: "Shaheer Hassan" }],
  generator: "v0.dev",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}

