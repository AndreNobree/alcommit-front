import "./globals.css";

import Header from '../components/header';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'App Alcommit',
  description: 'simplifying your commits',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Header/>

        {children}
      </body>
    </html>
  );
}
