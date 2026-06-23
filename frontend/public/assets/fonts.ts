import { Quantico, Outfit } from "next/font/google";

export const quantico = Quantico({
    subsets: ["latin"],
    weight: ["400", "700"],
    style: ["normal", "italic"],
    variable: "--font-quantico"
});

export const outfit = Outfit({
    subsets: ["latin"],
    weight: ["400", "600"],
    style: ["normal"],
    variable: "--font-outfit"
});