import { useLocalSearchParams, useRouter } from "expo-router";
import { icons, iconType } from "@/icons/icons";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DetailedPokemon } from "@/types/types";
import { getDetailedPokemon } from "@/service/pokeInfoService";

const PokeInfoComplete = () => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [pokeData, setPokeData] = useState<DetailedPokemon | null>(null);

  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { pokeId } = useLocalSearchParams<{ pokeId: string }>();
  const pokeIdParsed = Number(pokeId);

  useEffect(() => {
    const fetchDetailedPoke = async () => {
      try {
        const res = await getDetailedPokemon(pokeIdParsed);
        console.log(res);
        setPokeData(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDetailedPoke();
  }, []);

  const indexFormat = String(pokeData?.id).padStart(3, "0");

  const image = String(pokeData?.image);

  return (
    <View
      className="flex-1 bg-slate-500/60 justify-center items-center"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <View className="w-11/12 h-[95%] rounded-2xl bg-white">
        <View
          className="w-full h-[30%] rounded-2xl bg-[#735797] p-1"
          style={{
            borderBottomLeftRadius: "35%",
            borderBottomRightRadius: "35%",
          }}
        >
          <View className="top-0 h-12 items-center justify-between flex-row">
            <Pressable
              onPress={() => router.back()}
              className="flex-row items-center"
            >
              <Image className="h-7 w-7" source={icons.iconBack} />
              <Text className="font-semibold text-xl">Pokédex</Text>
            </Pressable>
            <Pressable
              onPress={() => setIsFavorite(!isFavorite)}
              className="pr-2"
            >
              {!isFavorite ? (
                <Image className="h-9 w-9" source={icons.iconFavUnselect} />
              ) : (
                <Image className="h-9 w-9" source={icons.iconFavSelect} />
              )}
            </Pressable>
          </View>
          <View className="h-12 w-full flex-row justify-between items-center px-2">
            <Text className="text-white text-3xl font-bold">{pokeData?.name}</Text>
            <Text className="text-white text-xl font-semibold">#{indexFormat}</Text>
          </View>
          {/**REVISAR PORQUE NO FUNCIONA */}
          <View className="border justify-center items-center h-48">
          <Image resizeMode="cover" className="h-36 w-full" source={pokeData?.image ? {uri: pokeData?.image} : {uri: icons.iconMissing}}/>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PokeInfoComplete;
