import "./globals.css";
import { Inter } from "next/font/google";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Apply Now",
  description: "Job application form",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
