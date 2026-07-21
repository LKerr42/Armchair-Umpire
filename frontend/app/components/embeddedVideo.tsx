import Link from "next/link";

type SocialLinkProps = {
    href: string | null;
};

function ensureHttps(url: string) {
    return url.startsWith("http") ? url : `https://${url}`;
}

function getYoutubeThumbnail(url: string) {
    const id = new URL(url).searchParams.get("v");

    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export default function EmbeddedVideo({
    href,
}: SocialLinkProps) {
    if (!href) {
        return (
            <p>No highlights found :(</p>
        );
    }

    return (
        <Link href={href} target="_blank" rel="noopener noreferrer" 
                className="relative block group w-50 hover:cursor-pointer"
            >
            <img src={getYoutubeThumbnail(href)} alt="Highlights" className="rounded-lg"></img>
            <div className="absolute inset-0 bg-black/30 rounded-lg group-hover:bg-black/40 transition"></div>
            
            <p className="text-white absolute bottom-4 left-4 text-lg">
                Highlights
            </p>
        
            <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-5xl shadow-md group-hover:text-neutral-300 transition-colors">▶</p>
            </div>
        </Link>
    );
}