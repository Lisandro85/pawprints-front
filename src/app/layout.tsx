import type { Metadata } from "next";
import "./globals.css";
import SessionAuthProvider from "../../context/SessionAuthProvider";
import NavBar from "../../components/NavBar";
import { MessageProvider } from "../../context/Message.context";
import Footer from "../../components/Footer";

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
      <body className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <SessionAuthProvider>
            <MessageProvider>
              <NavBar />
              {children}
            </MessageProvider>
          </SessionAuthProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
