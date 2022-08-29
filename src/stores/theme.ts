import { atom } from "jotai";

type Theme = {
  colorScheme: "dark" | "light";
};

export const themeAtom = atom<Theme>({ colorScheme: "light" });
