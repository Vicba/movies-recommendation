import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movies app",
  description: "Movies app with a vector database",
  icons: "/portret.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex bg-dark-blue">
        <Sidebar />
        <main className="flex-1 ml-24 my-5 mr-4 overflow-hidden h-full">
          {children}
        </main>
      </body>
    </html>
  );
}
