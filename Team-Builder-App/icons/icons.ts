export const icons = {
    pokeballPokedex: require("./pokeball-pokedex.png"),
    deleteValue: require("./icon_deleteValue.png"),
    iconUp: require("./icon_up.png"),
    iconDown: require("./icon_down.png"),
    iconCleanFilters: require("./icon_clear.png")
} as const;

export const iconType = {
    bug: require("./types/bug.png"),
    dark: require("./types/dark.png"),
    dragon: require("./types/dragon.png"),
    electric: require("./types/electric.png"),
    fairy: require("./types/fairy.png"),
    fighting: require("./types/fighting.png"),
    fire: require("./types/fire.png"),
    flying: require("./types/flying.png"),
    ghost: require("./types/ghost.png"),
    grass: require("./types/grass.png"),
    ground: require("./types/ground.png"),
    ice: require("./types/ice.png"),
    normal: require("./types/normal.png"),
    poison: require("./types/poison.png"),
    psychic: require("./types/psychic.png"),
    rock: require("./types/rock.png"),
    steel: require("./types/steel.png"),
    water: require("./types/water.png")
} as const;

export type IconName = keyof typeof icons;
export type IconType = keyof typeof iconType;
