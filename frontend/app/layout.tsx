import type { Metadata } from "next";
import { outfit } from "@/public/assets/fonts"; 
import AppShell from "./components/appShell";
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
            <AppShell>
                {children}
            </AppShell>
        </body>
    </html>
);
}
