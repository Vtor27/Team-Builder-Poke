import React, { useEffect, useState } from "react";
import { Text, View, FlatList, ScrollView } from "react-native";
import { Pokemon } from "@/types/types";
import { getPokemonWhithFilters } from "@/service/pokedexService";
import CardImagePoke from "@/components/CardImagePoke";

export default function Index() {
  const [pokedexData, setPokedexData] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokedex = async () => {
      try {
        const res = await getPokemonWhithFilters({ generation: 3 });
        setPokedexData(res);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPokedex();
  }, []);

  
  //{pokedexData.map((pokemon) => (
  //<CardImagePoke key={pokemon.id} pokemon={pokemon} />
  //))}

  return (
    <View className="flex-1">
      <View className="bg-white flex-row h-2/5">
        <FlatList
          data={pokedexData}
          keyExtractor={(poke) => poke.id.toString()}
          renderItem={({ item }) => <CardImagePoke pokemon={item} />}
        />
      </View>
    </View>
  );
}
