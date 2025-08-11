export interface Pokemon {
    id: number;
    name: string;
    types: string[];
    generation: number;
    regionOrigin: string;
    regionApparition: string;
    image: string;
    icon: string;
}

export interface DetailedPokemon {
    id: number;
    name: string;
    types: string[];
    height: number;
    weight: number;
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
    generation: number;
    regionOrigin: string;
    image: string;

}

export interface FiltersPokemon {
    name?: string;
    type?: string[];
    regionApparitions?: string;
    generation?: number;
    tier?: string;
    regionOrigin?: string;
}

export interface ItemMultiPicker {
    label: string;
    value: string;
}

export interface ItemSinglePicker {
    label: string;
    value: string | number;
}

