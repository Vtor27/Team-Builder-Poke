export const icons = {
    pokeballPokedex: require("./pokeball-pokedex.png"),
    deleteValue: require("./icon_deleteValue.png"),
    iconUp: require("./icon_up.png"),
    iconDown: require("./icon_down.png"),
} as const;

export type IconName = keyof typeof icons;