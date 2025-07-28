import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { icons } from "@/icons/icons";
import CustomMultiPickerComponent from "./CustomMultiPickerComponent";
import CustomSinglePickerComponent from "./CustomSinglePickerComponent";
import { FiltersPokemon } from "@/types/types";

type Props = {
  onCloseFilters: () => void;
  onPressFilters: (filters: FiltersPokemon) => void;
  onPressCleanFilters: () => void;
  showFilters: boolean;
  insets: { bottom: number };
};

const FiltersComponent = (props: Props) => {
  const [nameFilter, setNameFilter] = useState("");

  //VALORES Y ESTADOS PARA EL FILTRO GENERACIÓN
  const [selectedGeneration, setSelectedGeneration] = useState<
    string | number | null
  >(null);
  const itemsGenerations = [
    { label: "Generation 1", value: 1 },
    { label: "Generation 2", value: 2 },
    { label: "Generation 3", value: 3 },
    { label: "Generation 4", value: 4 },
    { label: "Generation 5", value: 5 },
    { label: "Generation 6", value: 6 },
    { label: "Generation 7", value: 7 },
  ];

  //VALORES Y ESTADOS PARA EL FILTRO TIPO
  const [selectedType, setSelectedType] = useState<string[]>([]);

  const itemsTypes = [
    { label: "Normal", value: "Normal" },
    { label: "Fire", value: "Fire" },
    { label: "Water", value: "Water" },
    { label: "Electric", value: "Electric" },
    { label: "Grass", value: "Grass" },
    { label: "Ice", value: "Ice" },
    { label: "Fighting", value: "Fighting" },
    { label: "Poison", value: "Poison" },
    { label: "Ground", value: "Ground" },
    { label: "Flying", value: "Flying" },
    { label: "Psychic", value: "Psychic" },
    { label: "Bug", value: "Bug" },
    { label: "Rock", value: "Rock" },
    { label: "Ghost", value: "Ghost" },
    { label: "Dragon", value: "Dragon" },
    { label: "Dark", value: "Dark" },
    { label: "Steel", value: "Steel" },
    { label: "Fairy", value: "Fairy" },
  ];

  //VALORES Y ESTADOS PARA EL FILTRO REGION DE ORIGEN
  const [selectedRegionOrigin, setSelectedRegionOrigin] = useState<
    string | number | null
  >(null);
  const itemsRegionOrigin = [
    { label: "Kanto", value: "Kanto" },
    { label: "Jotho", value: "Jhoto" },
    { label: "Hoenn", value: "Hoenn" },
    { label: "Shinnoh", value: "Shinnoh" },
    { label: "Kalos", value: "Kalos" },
    { label: "Alola", value: "Alola" },
    { label: "Teselia", value: "Teselia" },
  ];

  //VALORES Y ESTADOS PARA EL FILTRO REGION DE ORIGEN
  const [selectedRegionApparitions, setSelectedRegionApparitions] = useState<
    string | number | null
  >(null);

  const itemsRegionApparitions = [
    { label: "Kanto", value: "Kanto" },
    { label: "Jotho", value: "Jhoto" },
    { label: "Hoenn", value: "Hoenn" },
    { label: "Shinnoh", value: "Shinnoh" },
    { label: "Kalos", value: "Kalos" },
    { label: "Alola", value: "Alola" },
    { label: "Teselia", value: "Teselia" },
  ];

  return (
    <View
      className="bg-red-400 flex-1 rounded-t-xl"
      style={{ paddingBottom: props.insets.bottom }}
    >
      <View className="flex-row items-center justify-around h-14 mx-4 my-2">
        <Text className="text-center text-3xl font-bold p-2 border-black">
          Filtros de Búsqueda
        </Text>
        <Pressable
          onPress={props.onCloseFilters}
          className="px-3 py-3 scale-x-125 scale-y-110"
        >
          {!props.showFilters ? (
            <Image
              source={icons.iconUp}
              resizeMode="contain"
              className="w-10 h-10"
            />
          ) : (
            <Image
              source={icons.iconDown}
              resizeMode="contain"
              className="w-10 h-10"
            />
          )}
        </Pressable>
      </View>
      <ScrollView className="w-full px-4 border-t-2 rounded-t">
        <View className="flex-1 w-full px-4 justify-center items-center">
          <View className="flex-row items-center justify-center my-1 h-16 w-12/12  pb-3 border-b-2">
            <Text className="mr-11 text-2xl font-semibold">Name</Text>
            <View className="w-8/12">
              <TextInput
                value={nameFilter}
                onChangeText={setNameFilter}
                className="border rounded-xl w-12/12 bg-white"
                placeholder="Buscar por nombre"
                placeholderTextColor="gray"
              />
            </View>
          </View>

          {/* FILTRO PARA LOS TIPOS */}
          <CustomMultiPickerComponent
            items={itemsTypes}
            selectedValues={selectedType}
            setSelectedValues={setSelectedType}
            label="Type"
          />

          {/* FILTROS PARA LAS GENERACIONES */}
          <CustomSinglePickerComponent
            items={itemsGenerations}
            selectedValue={selectedGeneration}
            setSelectedValue={setSelectedGeneration}
            label="Generation"
          />

          {/* FILTROS PARA LAS REGIONES DE ORIGEN */}
          <CustomSinglePickerComponent
            items={itemsRegionOrigin}
            selectedValue={selectedRegionOrigin}
            setSelectedValue={setSelectedRegionOrigin}
            label="Region origin"
          />

          {/* FILTROS PARA LAS REGIONES DONE APARECEN */}
          <CustomSinglePickerComponent
            items={itemsRegionApparitions}
            selectedValue={selectedRegionApparitions}
            setSelectedValue={setSelectedRegionApparitions}
            label={"Regions apparitions"}
          />
          <View className="flex-row w-full items-center justify-between">
            <Pressable
              className="border rounded-xl bg-black h-14 w-8/12 justify-center items-center my-5"
              onPress={() => {
                props.onPressFilters({
                  name: nameFilter,
                  type: selectedType,
                  generation: selectedGeneration
                    ? Number(selectedGeneration)
                    : undefined,
                  regionOrigin:
                    typeof selectedRegionOrigin === "string"
                      ? selectedRegionOrigin
                      : undefined,
                  regionApparitions:
                    typeof selectedRegionApparitions === "string"
                      ? selectedRegionApparitions
                      : undefined,
                });
                props.onCloseFilters();
              }}
            >
              <View className="border rounded-xl bg-slate-900 h-14 w-full justify-center items-center mt-1.5 mr-2.5 mb-3">
                <Text className="text-xl font-bold text-white">FILTRAR</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                setNameFilter("");
                setSelectedGeneration(null);
                setSelectedType([]);
                setSelectedRegionOrigin(null);
                setSelectedRegionApparitions(null);
                props.onPressCleanFilters();
              }}
              className="border rounded-xl bg-black h-14 w-16 justify-center items-center my-5"
            >
              <View className="border rounded-xl bg-slate-900 h-14 w-16 justify-center items-center mt-1.5 mr-2.5 mb-3">
                <Image
                  source={icons.iconCleanFilters}
                  resizeMode={"contain"}
                  className="h-10 w-10"
                />
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FiltersComponent;
