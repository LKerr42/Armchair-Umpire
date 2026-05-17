import type { Metadata } from "next";
import { outfit } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
    title: "The Scoreline - Home",
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
                {children}
            </body>
        </html>
    );
}
