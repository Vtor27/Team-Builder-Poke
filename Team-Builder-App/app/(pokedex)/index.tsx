import React, { useEffect, useState, useRef } from "react";
import {
  ImageBackground,
  View,
  Dimensions,
  StatusBar,
  Image,
  Animated,
  Pressable,
} from "react-native";

import { useMenu } from "@/context/MenuContext";
import { icons } from "@/icons/icons";

import { backgrounds } from "@/assets/backgrounds/backgrounds";

import { FiltersPokemon, Pokemon } from "@/types/types";
import CardPokedex from "@/components/CardPokedex";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import FiltersComponent from "@/components/FiltersComponent";
import SearchNameComponent from "@/components/SearchNameComponent";
import {
  getPokemonWhithFilters,
  getPokemonWithoutFilters,
} from "@/service/pokedexService";

import { router } from "expo-router";

export default function Index() {
  const [pokedexData, setPokedexData] = useState<Pokemon[]>([]);
  const { open, toggleMenu } = useMenu();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [lastFilters, setLastFilters] = useState<FiltersPokemon | undefined>(
    undefined
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const CARD_HEIGHT = 82;
  const SCREEN_H = Dimensions.get("window").height;
  const LIST_TOP_OFFSET = 80;
  const ITEM_GAP = 0;
  const VISIBLE_ITEM_HEIGHT = CARD_HEIGHT + ITEM_GAP;

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

  const handleApplyFilters = async (filters: FiltersPokemon) => {
    setLoading(true);
    setError(null);
    try {
      const noFilters =
        !filters.name &&
        (!filters.type || filters.type.length === 0) &&
        !filters.generation &&
        !filters.regionOrigin &&
        !filters.regionApparitions &&
        !filters.tier;

      const res = noFilters
        ? await getPokemonWithoutFilters()
        : await getPokemonWhithFilters(filters);

      setPokedexData(res ?? []);
      setLastFilters(noFilters ? undefined : filters);
    } catch (e: any) {
      setError(e?.message || "No se pudieron aplicar los filtros");
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getPokemonWithoutFilters();
      setPokedexData(res ?? []);
      setLastFilters(undefined);
    } catch (e: any) {
      setError(e?.message || "No se pudieron limpiar los filtros");
    } finally {
      setLoading(false);
    }
  };

  const handleTextSearch = async (q: string) => {
    setLoading(true);
    setError(null);
    try {
      const trimmed = (q || "").trim();
      const res = trimmed
        ? await getPokemonWhithFilters({ name: trimmed })
        : await getPokemonWithoutFilters();
      setPokedexData(res ?? []);
      setLastFilters(trimmed ? { name: trimmed } : undefined);
    } catch (e: any) {
      setError(e?.message || "No se pudo realizar la búsqueda");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={backgrounds.nidokingBack}
      resizeMode="stretch"
      className="flex-1"
    >
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View
        className="flex-1"
        style={{ paddingBottom: insets.bottom, paddingTop: insets.top }}
      >
        <View
          pointerEvents="none"
          className="absolute -left-0 top-0 z-10 h-full w-full"
        >
          <Image
            resizeMode="cover"
            source={require("@/assets/images/Cover.png")}
            className="h-full w-full"
          />
        </View>

        <View className="absolute ml-6 mt-3 z-20 flex-row justify-between w-11/12 p-2">
          <Pressable
            onPress={toggleMenu}
            className="p-2 rounded-full border border-x-2"
          >
            <Image className="h-12 w-12" source={icons.iconMenuDrawerOpen} />
          </Pressable>
          <Pressable
            onPress={() => console.log("Abriendo pantalla de perfil.")}
            className="p-1 rounded-full border border-x-2"
          >
            <Image className="h-14 w-14" source={icons.iconProfile} />
          </Pressable>
        </View>

        <Animated.FlatList
          data={pokedexData}
          keyExtractor={(_, i) => String(i)}
          decelerationRate={0.9}
          scrollEventThrottle={8}
          contentContainerStyle={{
            marginTop: LIST_TOP_OFFSET,
            paddingBottom: insets.bottom + 130,
            paddingVertical: 0,
            paddingLeft: 0,
            paddingRight: 15,
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          // ESTO DE DE LA SCROLLBAR
          // onLayout={(e) => setViewportH(e.nativeEvent.layout.height)}
          // onContentSizeChange={(_w, h) => setContentH(h)}
          renderItem={({ item, index }) => {
            // centro real del ítem teniendo en cuenta el offset superior
            const itemCenterY =
              index * VISIBLE_ITEM_HEIGHT +
              VISIBLE_ITEM_HEIGHT / 2 +
              LIST_TOP_OFFSET;

            const distanceFromCenter = Animated.subtract(
              itemCenterY,
              Animated.add(scrollY, SCREEN_H / 2)
            );

            // Parámetros de la curva
            const CURVE_WIDTH_FACTOR = 1.25;
            const RANGE = (SCREEN_H * CURVE_WIDTH_FACTOR) / 2;

            const ARC_MAX_OFFSET = 105;
            const BASE_SHIFT = -18;

            const absProgress = distanceFromCenter.interpolate({
              inputRange: [-RANGE, 0, RANGE],
              outputRange: [1, 0, 1],
              extrapolate: "clamp",
            });

            // Ease cúbica suave: 3p^2 - 2p^3
            const SAMPLES = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1];
            const easeCubic = (p: number) => 3 * p * p - 2 * p * p * p;
            const outputRange = SAMPLES.map(
              (p) => easeCubic(p) * ARC_MAX_OFFSET
            );

            const translateCurve = absProgress.interpolate({
              inputRange: SAMPLES,
              outputRange,
              extrapolate: "clamp",
            });

            const translateX = Animated.add(
              new Animated.Value(BASE_SHIFT),
              translateCurve
            );

            return (
              <Animated.View
                style={{
                  height: CARD_HEIGHT,
                  justifyContent: "center",
                  transform: [{ translateX }],
                }}
              >
                <CardPokedex
                  pokemon={item}
                  index={index + 1}
                  onPress={() =>
                    router.push({
                      pathname: "/(modals)/poke-info-complete",
                      params: { pokeId: index + 1 },
                    })
                  }
                />
              </Animated.View>
            );
          }}
        />
        <View className="flex-row bottom-1 w-full justify-around items-center absolute z-20 h-14">
          <Pressable
            onPress={() => setFiltersOpen(true)}
            className="h-14 w-14 justify-center items-center  z-20 rounded-2xl border mr-4 border-y-4"
          >
            <Image source={icons.iconFilter} className="h-10 w-10" />
          </Pressable>
          <Pressable
            onPress={() => setSearchOpen(true)}
            className="  h-14 w-14 justify-center items-center  z-20 rounded-2xl border border-y-4"
          >
            <Image source={icons.iconSearch} className="h-10 w-10" />
          </Pressable>
        </View>

        <FiltersComponent
          open={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
          initial={lastFilters}
        />

        <SearchNameComponent
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          onSearch={handleTextSearch}
        />
      </View>
    </ImageBackground>
  );
}
