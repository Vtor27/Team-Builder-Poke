import React from "react";
import { Pokemon } from "@/types/types";
import { Image, Text, TouchableOpacity, View } from "react-native";
import TypePokeCard from "@/components/TypePokeCard";

type Props = {
  pokemon: Pokemon;
  index: number;
  onPress: () => void;
};

const CardPokedex = ({ pokemon, index, onPress }: Props) => {
  const indexFormat = String(index).padStart(3, "0");

  return (
    <TouchableOpacity onPress={onPress} className="w-[100%] min-h-[80%] bg-cian ml-0 rounded-r-full flex-row items-center px-4 " >
      <View className="w-16 h-16 justify-center items-center mr-5 ml-8">
        <View className="w-14 h-14 rounded-full ml-8 justify-center items-center bg-white border">
          <Image source={{ uri: pokemon.icon }} className="w-14 h-14" />
        </View>
      </View>

      <View className="flex-col ">
      <View className="flex-1 flex-row items-center px-2">
        <Text className="text-black mr-2 font-semibold text-xl">#{indexFormat} -</Text>
        <Text className="font-bold text-black text-2xl">{pokemon.name}</Text>
      </View>
        <TypePokeCard types={pokemon.types}/>
      </View>
    </TouchableOpacity>
  );
};

export default CardPokedex;
