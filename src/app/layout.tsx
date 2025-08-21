import type { Metadata, Viewport } from "next";
import "@/styles/main.scss";
import { ViewportProvider } from "@/components/providers/ViewportProvider";

export const metadata: Metadata = {
  title: "Chatavel - 仲間と一緒にチャットしながら旅行計画",
  description: "仲間と一緒にチャットしながら旅行計画を立てられる、モバイルファーストのSPA",
  keywords: ["旅行", "チャット", "プランニング", "旅行計画", "費用管理", "写真共有"],
  authors: [{ name: "Chatavel Team" }],
  creator: "Chatavel Team",
  publisher: "Chatavel Team",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#667eea',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body>
        <ViewportProvider>
          {children}
        </ViewportProvider>
      </body>
    </html>
  );
}
