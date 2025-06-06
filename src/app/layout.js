// app/layout.js
"use client";
import { useEffect, useState } from 'react';
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { usePathname } from 'next/navigation';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const [isAdminPanel, setIsAdminPanel] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsAdminPanel(pathname.includes('/admin'));
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <title>Maplocally</title>
        <meta name="description" content="Generated by create next app" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`} style={{ margin: 'auto' }}>
        <StyleProvider hashPriority="high">
          <ConfigProvider>
            {!isAdminPanel && <Navbar />}
            {children}
            {!isAdminPanel && <Footer />}
          </ConfigProvider>
        </StyleProvider>
      </body>
    </html>
  );
}
