import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Product showcase application",
  description: "lets view products and inquiry about them",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` bg-white text-black min-h-screen `}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <Toaster richColors position="top-center"></Toaster>
      </body>
    </html>
  );
}
