import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full flex items-center justify-between p-4 bg-slate-800 text-white">
            <div className="flex gap-10">
                <Link href="/">Home</Link>
                <Link href="/">Games</Link>
                <Link href="/">Leagues</Link>
                <Link href="/">Teams</Link>
            </div>
        </nav>
    );
}