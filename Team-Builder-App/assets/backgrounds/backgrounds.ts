export const backgrounds = {
    psyduckBack: require("./background_poke.jpg"), 
    nidokingBack: require("./background_Nidoking.jpg"),
    nidoqueenBack: require("./background_Nidoqueen.jpg"),
} as const;

export type BackgroundName = keyof typeof backgrounds;