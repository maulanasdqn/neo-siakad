import { FC, PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const monserat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neo Siakad",
  description: "Neo Siakad Universitas Islam Nusantara",
  icons: {
    icon: "./favicon.svg",
  },
};

const RootLayout: FC<Readonly<PropsWithChildren>> = ({ children }) => {
  return (
    <html lang="en">
      <body className={monserat.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
