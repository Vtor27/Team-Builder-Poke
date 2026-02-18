import React from "react";
import { Pokemon } from "@/types/types";
import CardTypePoke from "@/components/antiguosCompon/TypeCard";
import { Image, View, Text, TouchableOpacity } from "react-native";

type Props = {
  pokemon: Pokemon;
};

const CardImagePoke = ({ pokemon }: Props) => {
  return (
    <View className="flex-1 w-11/12 bg-white p-4 rounded-lg my-2 border items-center">
      <View className="flex-row justify-center items-center w-full">
        <Text className="text-3xl mr-5 font-bold text-black text-center">
          # {pokemon.id}
        </Text>
        <Text className="text-3xl font-bold text-black text-center ">
          {pokemon.name}
        </Text>
      </View>
      <View className="h-52 w-full p-1 justify-start flex-row border ">
        <View className=" h-12/12 w-52 bg-yellow-50 justify-end rounded-3xl ">
          <Image
            source={{ uri: pokemon.image }}
            resizeMode="contain"
            className="w-44 h-44 mb-2"
          />
        </View>
        <View className="">
          <Text className="text-xl font-bold ">Type:</Text>
          <CardTypePoke types={pokemon.types} />
        </View>
      </View>

      <View className="border justify-center items-center">
        <TouchableOpacity className="border w-32 h-12 justify-center rounded-3xl bg-black">
          <Text className="text-center font-bold text-3xl color-white">
            Details
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardImagePoke;
