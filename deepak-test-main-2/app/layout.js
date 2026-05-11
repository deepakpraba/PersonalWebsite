import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Starfield from "./components/Starfield";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Deepak Prabaharan",
  description: "Personal portfolio and website of Deepak Prabaharan",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#05050f]">
        <Starfield />
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <footer className="relative z-10 w-full border-t border-blue-500/20 bg-[#05050f]/80 py-6 text-center text-xs text-zinc-600 tracking-widest uppercase">
          © {new Date().getFullYear()} Deepak Prabaharan — All rights reserved.
        </footer>
      </body>
    </html>
  );
}
