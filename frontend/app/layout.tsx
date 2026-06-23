import type { Metadata } from "next";
import { outfit } from "./components/fonts";
import Navbar from "./components/navbar";
import Header from "./components/header";
import "./globals.css";

export const metadata: Metadata = {
    title: "Armchair Umpire",
    description: "Sports statistics web app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
return (    
    <html lang="en">
        <body className={outfit.variable}>
            <Header />
            
            <Navbar />

            {children}
        </body>
    </html>
);
}
