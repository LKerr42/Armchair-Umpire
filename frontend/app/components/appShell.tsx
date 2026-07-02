"use client";

import Navbar from "./navbar";
import Header from "./header";
import Sidebar from "./sidebar";
import { useState } from "react";

export default function AppShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
    <>
        <Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
        />

        <Header onOpenSidebar={() => setSidebarOpen(true)} />
        
        <Navbar />

        <main>
            {children}
        </main>
    </>
    );
}