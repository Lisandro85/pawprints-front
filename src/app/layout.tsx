import type { Metadata } from "next";
import "./globals.css";
import SessionAuthProvider from "../../context/SessionAuthProvider";

export const metadata: Metadata = {
  title: "Paw Prints",
  description: "Paw Pints",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>
          <SessionAuthProvider>{children}</SessionAuthProvider>
        </main>
      </body>
    </html>
  );
}
