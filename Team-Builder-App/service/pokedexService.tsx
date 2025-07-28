import { FiltersPokemon } from "@/types/types";

const API_URL = "http://192.168.1.135:8069/api/pokemon/filter?";

export const getPokemonWithoutFilters = async () => {
  try {
    const response = await fetch(API_URL);

    console.log("Response: " + response.status);

    if (!response.ok) {
      throw new Error("Error al conectar con la API");
    }

    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

export const getPokemonWhithFilters = async (filters: FiltersPokemon) => {
  const filtersForUrl = new URLSearchParams();
  try {
    //SIEMPRE RECIBIRÁ COMO MÍNIMO UN TIPO
    if (filters.type) {
      filters.type.forEach((t) => filtersForUrl.append("type", t));
    }

    // if (filters.type) {
    //   if (filters.type.length === 1) {
    //     const stringTypes = filters.type[0].toString();
    //     filtersForUrl.append("type", stringTypes);
    //   }
    //   if (filters.type.length === 2) {
    //     const stringTypes = filters.type[0] + filters.type[1];
    //     filtersForUrl.append("type", stringTypes);
    //   }
    // }

    if (filters.name) filtersForUrl.append("name", filters.name);
    if (filters.regionApparitions)
      filtersForUrl.append("regionApparitions", filters.regionApparitions);
    if (filters.generation)
      filtersForUrl.append("generation", filters.generation.toString());
    if (filters.tier) filtersForUrl.append("tier", filters.tier);
    if (filters.regionOrigin)
      filtersForUrl.append("regionOrigin", filters.regionOrigin);

    console.log("Filters: " + filtersForUrl.toString());
    console.log("API URL: " + API_URL + filtersForUrl.toString());
    console.log("regionOrigin:", filters.regionOrigin);
    console.log("regionApparitions:", filters.regionApparitions);

    const response = await fetch(`${API_URL}${filtersForUrl.toString()}`);

    console.log("Response: " + response.status);

    if (!response.ok) {
      throw new Error("Error al conectar con la API");
    }

    return await response.json();
  } catch (err) {
    console.error(err);
  }
};
