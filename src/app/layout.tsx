import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ong Kim Hoo | Data & BI Expert",
  description:
    "A responsive personal portfolio with an auto-running pixel adventure career timeline.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
