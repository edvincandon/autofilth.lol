import "@/app/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function NoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark min-h-screen">
      <body className={`${inter.className} `}>{children}</body>
    </html>
  );
}
