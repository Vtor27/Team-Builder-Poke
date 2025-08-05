import React from "react";
import { Pokemon } from "@/types/types";
import { Image, Text, View } from "react-native";

type Props = {
  pokemon: Pokemon;
  index: number;
};

const CardPokedex = ({ pokemon, index }: Props) => {
  const indexFormat = String(index).padStart(3, "0");

  return (
    <View className="h-20 w-11/12 flex-row bg-slate-600 my-2 mx-auto justify-center rounded-full">
      <View className=" w-16 h-full justify-center border items-center">
        <View className="w-14 h-14 rounded-full justify-center items-center bg-white">
          <Image source={{ uri: pokemon.icon }} className="w-16 h-16" />
        </View>
      </View>
      <View className="flex-row items-center">
        <Text className="text-white m">#{indexFormat}</Text>
        <Text className="font-bold text">{pokemon.name}</Text>
      </View>
    </View>
  );
};

export default CardPokedex;
