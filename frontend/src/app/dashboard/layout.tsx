import { Nixie_One } from "next/font/google";
import { Nunito_Sans } from "next/font/google";
import "../globals.scss";

import Header from "@/src/app/components/header/header";
import StoreProvider from "@/src/app/storeProvider";
import { ErrorsBlock } from "@/src/app/components/errors/errors";

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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={`${nixie.variable} ${nunito.className}`}>
          <Header />
          {children}
          <ErrorsBlock />
        </body>
      </html>
    </StoreProvider>
  );
}
