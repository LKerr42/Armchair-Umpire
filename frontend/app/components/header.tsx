import { quantico } from "./fonts"; 
            
export default function Header() {
    return (
        <div className="grid grid-cols-3 items-center w-screen h-fit p-8 bg-slate-900"> 
            <p className="text-left">Following</p>

            <h1 className={`${quantico.className} text-center font-bold italic text-6xl`}>
                The Armchair Umpire
            </h1>

            <p className="text-right">Profile</p>
        </div>
    );
}