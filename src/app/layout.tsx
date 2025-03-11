import type { Metadata } from "next";
import "./globals.css";
import SessionAuthProvider from "../../context/SessionAuthProvider";
import NavBar from "../../components/NavBar";
import { MessageProvider } from "../../context/Message.context";

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
            <MessageProvider>
              <NavBar />
              {children}
            </MessageProvider>
          </SessionAuthProvider>
        </main>
      </body>
    </html>
  );
}
