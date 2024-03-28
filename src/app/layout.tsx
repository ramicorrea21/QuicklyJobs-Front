import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { AuthProvider } from "./context/authContext";

const inter = Inter(
{ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuicklyJobs",
  description: "Platform to offer and request professional services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
        <Navbar/>
        <div className="">
        {children}
        </div>
      </body>
      </html>
    </AuthProvider>
  );
}
