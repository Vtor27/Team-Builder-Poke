import { Pokemon } from "@/types/types";
import CardTypePoke from "@/components/TypeCard";
import React, { Image, View, Text, TouchableOpacity } from "react-native";

type Props = {
  pokemon: Pokemon;
};

const CardImagePoke = ({ pokemon }: Props) => {
  return (
    <View className="flex-row m-2 bg-gray-100 p-4 rounded-lg mb-4 border border-gray-300">
      <View className="w-1/2 h-48 justify-center items-center border border-black-300">
        <Image
          source={{ uri: pokemon.image }}
          resizeMode="contain"
          className="w-40 h-40 mb-2"
        />
      </View>
      <View className="w-1/2 h-48">
        <View className="flex-row justify-center items-center ">
          <Text className="text-xl font-bold text-black text-center p-2 ">
            # {pokemon.id}
          </Text>
          <Text className="text-2xl font-bold text-black text-center p-2 ">
            {pokemon.name}
          </Text>
        </View>
        <CardTypePoke types={pokemon.types} />

        <View className="border flex-1 justify-center items-center">
          <TouchableOpacity className="border w-32 h-12 justify-center rounded-3xl bg-black">
            <Text className="text-center font-bold text-3xl color-white">
              Details
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CardImagePoke;
