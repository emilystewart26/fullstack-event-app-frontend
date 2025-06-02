import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./globalComponents/Navigation";
import Footer from "./globalComponents/Footer";
import { AuthProvider } from "./context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EventApp",
  description: "Post your events, reach your audience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
    <Navigation />
    {children}
    <Footer />
  </AuthProvider>
</body>
    </html>
  );
}