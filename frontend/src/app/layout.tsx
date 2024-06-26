import type { Metadata } from "next";
import { Nixie_One } from "next/font/google";
import { Nunito_Sans } from "next/font/google";
import "./globals.scss";

import Header from "@/src/app/components/header/header";

const nixie = Nixie_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-nixie",
  display: "swap",
});
const nunito = Nunito_Sans({
  weight: "300",
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DayBreak",
  description: "Something for something, not sure!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nixie.variable} ${nunito.className}`}>
        {children}
      </body>
    </html>
  );
}
