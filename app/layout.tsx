import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlagConquest",
  description:
    "แอปพลิเคชันฝึกการ capture the flag เพื่อให้นักศึกษาภาควิชาวิศวกรรมคอมพิวเตอร์ได้ทำการฝึกซ้อม เป็นส่วนหนึ่งของวิชา Project (261492) ภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
