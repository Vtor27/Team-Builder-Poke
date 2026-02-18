import { Pokemon } from "@/types/types";
import React, { useRef } from "react";
import { View, Text, Animated, Pressable, Easing, Image } from "react-native";
import { icons } from "@/icons/icons";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  pokemon: Pokemon;
  isSelected: boolean;
  pokemonSelected?: (pokemon: Pokemon) => void;
};

const CardNamePokedex = ({ pokemon, pokemonSelected }: Props) => {
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
      className="relative w-10/12 h-[70px] mb-1 self-center border-[#a0b0b9] border-y-2 bg-slate-900 rounded-2xl"
      onPress={() => pokemonSelected?.(pokemon)}
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleAnimation }],
        }}
        className="absolute inset-0"
      >
        <LinearGradient
          colors={["#e0e0e0", "#c8d0d9", "#a0b0b9", "#ffffff00"]}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 0.5, y: 1 }}
          style={{ borderRadius: 10 }}
        >
          <View className="flex-row items-center justify-around w-full h-full px-2">
            <Animated.Image
              style={{ transform: [{ rotate: rotationPokeball }] }}
              source={icons.pokeballPokedex}
              className="w-10 h-10 mr-1"
              resizeMode="contain"
            />

            <View className="flex-row items-center justify-center h-9/12 w-7/12 rounded-xl-">
              <Text
                className="text-3xl font-bold text-black text-center py-2 mr-2"
                style={{
                  textShadowColor: "#b0c0c8",
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 3,
                }}
              >
                # {pokemon.id}
              </Text>
              <Text
                className="text-3xl font-bold text-black text-center py-2"
                style={{
                  textShadowColor: "#b0c0c8",
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 3,
                }}
              >
                {pokemon.name}
              </Text>
            </View>

            <Image
              source={{ uri: pokemon.icon }}
              resizeMode="contain"
              className="w-16 h-16"
            />
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};
export default CardNamePokedex;
