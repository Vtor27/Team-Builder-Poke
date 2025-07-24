import { Pokemon } from "@/types/types";
import React, { useRef } from "react";
import { View, Text, Animated, Pressable, Easing } from "react-native";
import { icons } from "@/icons/icons";
import TicketShape from "./TicketShape";

type Props = {
  pokemon: Pokemon;
  isSelected: boolean;
  pokemonSelected?: (pokemon: Pokemon) => void; // Callback function to handle selection
};

const NameCardPoke = ({
  pokemon,
  isSelected = false,
  pokemonSelected,
}: Props) => {
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const pokeballAnimation = useRef(new Animated.Value(0)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnimation, {
      toValue: 0.95, //Al pulsar hará el efecto de hundimiento
      useNativeDriver: true,
    });
  };

  const onPressOut = () => {
    Animated.spring(scaleAnimation, {
      toValue: 1, // Al soltar volverá a su tamaño original
      friction: 3, // Fricción para suavizar el efecto
      useNativeDriver: true,
    }).start();
  };

  const rotatePokeball = () => {
    Animated.sequence([
      Animated.timing(pokeballAnimation, {
        toValue: -1,
        duration: 250,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(pokeballAnimation, {
        toValue: 1,
        duration: 250,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(pokeballAnimation, {
        toValue: 0,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const rotationPokeball = pokeballAnimation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-45deg", "0deg", "45deg"], // Rotación completa
  });

  return (
    <Pressable
      onPressIn={() => {
        onPressIn();
        rotatePokeball();
      }}
      onPressOut={onPressOut}
      className="relative w-[300px] h-[60px] mb-1 self-center"
      onPress={() => pokemonSelected?.(pokemon)}
    >
      <TicketShape fill={isSelected ? "#E53935" : "#FFA726"} />

      <Animated.View
        style={{
          transform: [{ scale: scaleAnimation }],
        }}
        className="absolute inset-0 flex-row items-center justify-around pr-7 pl-8 space-x-3 "
      >
        <Animated.Image
          style={{ transform: [{ rotate: rotationPokeball }] }}
          source={icons.pokeballPokedex}
          className="w-10 h-10 mr-6 "
          resizeMode={"contain"}
        />
        <View className="flex-row items-center justify-center h-9/12 w-9/12 bg-white rounded-lg">
          <Text className="text-xl font-bold text-black text-center p-2">
            # {pokemon.id}
          </Text>
          <Text className="text-2xl font-bold text-black text-center p-2">
            {pokemon.name}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};
export default NameCardPoke;
