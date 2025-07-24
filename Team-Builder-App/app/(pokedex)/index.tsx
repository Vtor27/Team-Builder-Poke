import React, { useEffect, useRef, useState } from "react";
import { View, Animated, FlatList, Dimensions } from "react-native";
import { Pokemon } from "@/types/types";
import { getPokemonWhithFilters } from "@/service/pokedexService";
import CardImagePoke from "@/components/CardImagePoke";
import CardNamePokedex from "@/components/CardNamePokedex";
import TicketShape from "@/components/TicketShape";
import FiltersComponent from "@/components/FiltersComponent";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height } = Dimensions.get("window"); //Asigno el alto de la pantalla a una constante
const ITEM_HEIGHT = 80; // Alto de cada item

export default function Index() {
  const [pokedexData, setPokedexData] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [selectId, setSelectId] = useState<number | null>(null);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false); // Estado para controlar la visibilidad de los filtros

  const insets = useSafeAreaInsets(); // Obtiene los insets de la zona segura del dispositivo

  const scrollY = useRef(new Animated.Value(0)).current; // Valor inicial de la animación del scroll, se utiliza useRef para que no se reinicie en cada renderizado.

  const flatRef = useRef<FlatList>(null); // Referencia al FlatList para poder manipularlo directamente

  const slideAnimation = useRef(new Animated.Value(height)).current; // Animación para el efecto de deslizamiento de los filtros.

  useEffect(() => {
    const fetchPokedex = async () => {
      try {
        const res = await getPokemonWhithFilters({ generation: 1 });
        setPokedexData(res);
        setSelectedPokemon(res[0]); // Inicializa el primer Pokémon como seleccionado
        setSelectId(0); // Inicializa el primer Pokémon como seleccionado
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPokedex();
  }, []);

  const handlePokemonSelected = (index: number) => {
    const pokeSelected = pokedexData[index];
    setSelectId(index);
    setSelectedPokemon(pokeSelected);

    const offset = index * ITEM_HEIGHT - ITEM_HEIGHT;
    flatRef.current?.scrollToOffset({ offset, animated: true });
  };

  const handleOnFilters = () => {
    if (isFiltersVisible) {
      Animated.timing(slideAnimation, {
        toValue: height,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setIsFiltersVisible(false));
    } else {
      Animated.timing(slideAnimation, {
        toValue: height - 350, // Altura de la pantalla menos la altura de los filtros
        duration: 500,
        useNativeDriver: true,
      }).start(() => setIsFiltersVisible(true));
    }
  };

  return (
    <View
      className="flex-1 bg-black"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom + 10 }}
    >
      <View className="bg-blue-400 h-2/5 justify-center items-center border">
        {selectedPokemon && <CardImagePoke pokemon={selectedPokemon} />}
      </View>

      {/*Parte que se anima con efecto noria FALTA ARREGLAR EL EFECTO DE HUNDIMIENTO AL PULSAR*/}
      <Animated.FlatList
        data={pokedexData}
        ref={flatRef}
        keyExtractor={(poke) => poke.id.toString()}
        ListHeaderComponent={<View style={{ height: 0 }} />}
        ListFooterComponent={<View style={{ height: ITEM_HEIGHT * 2 }} />}
        contentContainerStyle={{
          paddingTop: 60, // Espacio para que el FlatList no se superponga con la parte superior
          paddingBottom: ITEM_HEIGHT * 2, // Espacio para que el FlatList no se superponga con la parte inferior
        }}
        showsVerticalScrollIndicator={true} // Oculta la barra de scroll vertical
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }], // Escucha el evento de scroll
          { useNativeDriver: true } // Habilita el uso del driver nativo para mejorar el rendimiento
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 2) * ITEM_HEIGHT,
            index * ITEM_HEIGHT,
            (index + 2) * ITEM_HEIGHT,
          ];

          const isSelected = item.id - 1 === selectId;

          const scale = isSelected
            ? scrollY.interpolate({
                inputRange,
                outputRange: [0.9, 1.15, 0.9],
                extrapolate: "clamp",
              })
            : scrollY.interpolate({
                inputRange,
                outputRange: [0.9, 1.15, 0.9],
                extrapolate: "clamp",
              });

          const opacity = isSelected
            ? 1
            : scrollY.interpolate({
                inputRange,
                outputRange: [0.3, 0.7, 0.3],
                extrapolate: "clamp",
              });

          return (
            <Animated.View
              style={{
                height: ITEM_HEIGHT,
                transform: [{ scale }],
                opacity,
              }}
              className="justify-center items-center "
            >
              <TicketShape />
              <View className="absolute inset-0 flex-row items-center justify-around pr-7 pl-8 space-x-3">
                <CardNamePokedex
                  pokemonSelected={() => handlePokemonSelected(index)}
                  isSelected={item.id - 1 === selectId ? true : false}
                  pokemon={item}
                />
              </View>
            </Animated.View>
          );
        }}
      />

      <Animated.View
        style={{
          transform: [
            {
              translateY: slideAnimation,
            },
          ],
          left: 0,
          right: 0,
          height: 380 + insets.bottom,
          paddingBottom: insets.bottom,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          zIndex: 10,
          position: "absolute",
        }}
      >
        <FiltersComponent
          onCloseFilters={handleOnFilters}
          showFilters={isFiltersVisible}
          insets={insets}
        />
      </Animated.View>
    </View>
  );
}
