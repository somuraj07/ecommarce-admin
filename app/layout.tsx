import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/providers/modal-Provider";
import "./globals.css";
import prismadb from "@/lib/prismadb";
import { ToastProvider } from "@/providers/toast-provider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Developed By Somu Kalyankar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
       <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider/>
        <ModalProvider />
        {children}

      </body>
    </html>
    </ClerkProvider>
   
  );
}
