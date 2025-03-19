import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateSeedPhrase = (
  seedPhrase: string,
  wordLimit: number = 3
) => {
  const words = seedPhrase.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : seedPhrase;
};
