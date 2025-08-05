export const backgrounds = {
    psyduckBack: require("./background_poke.jpg")
} as const;

export type BackgroundName = keyof typeof backgrounds;