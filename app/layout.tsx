import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Autofilth.lol",
  description: "Ensuring sure your password manager works !",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} `}>
        <Link href="/">
          <div className="mt-20 relative flex flex-col place-items-center after:absolute after:inset-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:-z-20 after:h-[80px] after:w-[260px] after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 z-[-1]">
            <kbd>autofilth.lol</kbd>
          </div>
        </Link>
        {children}
      </body>
    </html>
  );
}
