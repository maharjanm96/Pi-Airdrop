import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Open_Sans } from "next/font/google";
import TanStackContext from "./context/TanstackContext";
import "./globals.css";

const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pi Airdrop",
  description: "Free Pi Network airdrop for everyone!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <TanStackContext>
        <html lang="en" suppressHydrationWarning>
          <body className={openSans.className}>
            <Toaster />

            {children}
          </body>
        </html>
      </TanStackContext>
    </SessionProvider>
  );
}
