import type { Metadata } from "next";
import "./globals.css";
import SessionAuthProvider from "../../context/SessionAuthProvider";
import NavBar from "../../components/NavBar";

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
          <SessionAuthProvider>
            <NavBar />
            {children}
          </SessionAuthProvider>
        </main>
      </body>
    </html>
  );
}
