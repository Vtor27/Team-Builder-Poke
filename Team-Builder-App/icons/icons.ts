export const icons = {
    pokeballPokedex: require("./utils/pokeball-pokedex.png"),
    deleteValue: require("./utils/icon_cleanValue.png"),
    iconUp: require("./utils/icon_up.png"),
    iconDown: require("./utils/icon_down.png"),
    iconCleanFilters: require("./utils/icon_clear.png"),
    iconMenuDrawerOpen: require("./utils/open.png"),
    iconMenuDrawerClose: require("./utils/close.png"),
    iconCloseWhite: require("./utils/icon_closeWhite.png"),
    iconPokedex: require("./utils/icon_pokedex.png"),
    iconYunque: require("./utils/yunque.png"),
    iconSwordShield: require("./utils/swordShield.png"),
    iconFavSelect: require("./utils/icon_favoriteSelec.png"),
    iconFavUnselect: require("./utils/icon_favoriteUnSelec.png"),
    iconUser: require("./utils/icon_user.png"),
    iconLogin: require("./utils/icon_login.png"),
    iconLogOut: require("./utils/icon_logOut.png"),
    iconFilter: require("./utils/icon_filter.png"),
    iconSearch: require("./utils/icon_search.png"),
    iconProfile: require("./utils/icon_profile.png"),
    iconBack: require("./utils/icon_back.png"),
    iconMissing: require("./utils/icon_missingImage.png")

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
