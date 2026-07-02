import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="h-16 bg-slate-800 text-white">
            <div className="flex h-full">
                <Link href="/" className="flex items-center px-6 hover:bg-slate-700 transition-colors">Home</Link>
                <Link href="/" className="flex items-center px-6 hover:bg-slate-700 transition-colors">Games</Link>
                <Link href="/" className="flex items-center px-6 hover:bg-slate-700 transition-colors">Leagues</Link>
                <Link href="/" className="flex items-center px-6 hover:bg-slate-700 transition-colors">Teams</Link>
            </div>
        </nav>
    );
}