import { quantico } from "./fonts";

export default function HomePage() {
return (
    <main>
        {/*Header*/}
        <div className="grid grid-cols-3 items-center w-screen h-fit p-8 bg-slate-800"> 
            <p className="text-left">Following</p>

            <h1 className={`${quantico.className} text-center font-bold italic text-6xl`}>
                The Scoreline
            </h1>

            <p className="text-right">Profile</p>
        </div>
        {/*Nav*/}
        <div className="flex w-screen h-fit p-10 bg-blue-500">
            <p>content</p>
        </div>
    </main>
);
}