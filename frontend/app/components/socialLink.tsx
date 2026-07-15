import Link from "next/link";

type SocialLinkProps = {
    href: string | null;
    label: string;
};

function ensureHttps(url: string) {
    return url.startsWith("http") ? url : `https://${url}`;
}

export default function SocialLink({
    href,
    label,
}: SocialLinkProps) {
    if (!href) {
        return null;
    }

    return (
        <div className="mt-5 w-full border-2 border-solid border-cyan-900 rounded-lg p-4">
            <p className="text-lg text-white">{label}</p>
            <Link href={ensureHttps(href)} target="_blank" rel="noopener noreferrer"
                className="text-lg text-sky-600 wrap-break-word hover:text-sky-400 cursor-pointer transition-colors">{href}</Link>
        </div>
    );
}