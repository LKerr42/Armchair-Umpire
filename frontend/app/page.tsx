import { quantico } from "./components/fonts"; 

export default function HomePage() {
return (
    <main>
        <div className="bg-mauve-900 p-5">
            <h2 className={`${quantico.className} text-left font-bold underline text-4xl`}>
                Latest Scores
            </h2>
        </div>

        <div className="bg-mauve-900 p-5">
            <h2 className={`${quantico.className} text-left font-bold underline text-4xl`}>
                Trending News
            </h2>
        </div>

        <div className="bg-mauve-900 p-5">
            <h2 className={`${quantico.className} text-left font-bold underline text-4xl`}>
                Recommended For You
            </h2>
        </div>
    </main>
);
}