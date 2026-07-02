import { quantico } from "@/public/assets/fonts"; 

type HeaderProps = {
    onOpenSidebar: () => void;
};

export default function Header({
    onOpenSidebar,
}: HeaderProps) {
    return (
        <div className="grid grid-cols-3 items-center w-full p-8 bg-slate-900">
            <button
                onClick={onOpenSidebar}
                className="text-left w-fit hover:text-sky-400 cursor-pointer transition-colors"
            >
                Following
            </button>
 
            <h1 className={`${quantico.className} text-center font-bold italic text-6xl`}>
                The Armchair Umpire
            </h1>

            <p className="text-right">Profile</p>
        </div>
    );
}