import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground, View } from "react-native";

import { backgrounds } from "@/assets/backgrounds/backgrounds";

import { Pokemon } from "@/types/types";
import { getPokemonWithoutFilters } from "@/service/pokedexService";
import CardPokedex from "@/components/CardPokedex";

export default function Index() {
  const [pokedexData, setPokedexData] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokedex = async () => {
      try {
        const res = await getPokemonWithoutFilters();
        setPokedexData(res);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPokedex();
  }, []);

  return (
    <ImageBackground
      source={backgrounds.psyduckBack}
      resizeMode="cover"
      className="flex-1"
    >
      <FlatList
        className="w-full"
        contentContainerStyle={{
          paddingVertical: 16,
        }}
        data={pokedexData}
        keyExtractor={(poke) => poke.id.toString()}
        renderItem={({ item, index }) => {
          return <CardPokedex pokemon={item} index={index + 1} />;
        }}
      />
    </ImageBackground>
  );
}
