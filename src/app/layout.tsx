import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio | 3D Interactive Developer Portfolio",
  description: "Modern 3D animated portfolio showcasing projects, skills, and professional experience with interactive Three.js elements",
  keywords: ["portfolio", "3D", "Three.js", "React", "developer", "web development"],
  authors: [{ name: "Portfolio Developer" }],
  creator: "Portfolio Developer",
  openGraph: {
    title: "Portfolio | 3D Interactive Developer Portfolio",
    description: "Modern 3D animated portfolio showcasing projects, skills, and professional experience",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | 3D Interactive Developer Portfolio",
    description: "Modern 3D animated portfolio showcasing projects, skills, and professional experience",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
