import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, Image, ScrollView } from "react-native";
import ModalSheet from "@/components/ModalSheet"; // el sheet base que sube desde abajo (como te pasé antes)
import CustomMultiPickerComponent from "./ui/CustomMultiPickerComponent";
import CustomSinglePickerComponent from "./ui/CustomSinglePickerComponent";
import { FiltersPokemon } from "@/types/types";
import { icons } from "@/icons/icons";

// Puedes mover estos arrays a un archivo constants si quieres
const itemsGenerations = [
  { label: "Generation 1", value: 1 },
  { label: "Generation 2", value: 2 },
  { label: "Generation 3", value: 3 },
  { label: "Generation 4", value: 4 },
  { label: "Generation 5", value: 5 },
  { label: "Generation 6", value: 6 },
  { label: "Generation 7", value: 7 },
];

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

const itemsRegion = [
  { label: "Kanto", value: "Kanto" },
  { label: "Jhoto", value: "Jhoto" },
  { label: "Hoenn", value: "Hoenn" },
  { label: "Shinnoh", value: "Shinnoh" },
  { label: "Kalos", value: "Kalos" },
  { label: "Alola", value: "Alola" },
  { label: "Teselia", value: "Teselia" },
];

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: (filters: FiltersPokemon) => void;
  onClear?: () => void;
  initial?: FiltersPokemon;
};

export default function FiltersComponent({ open, onClose, onApply, onClear, initial }: Props) {
  const [selectedGeneration, setSelectedGeneration] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedRegionOrigin, setSelectedRegionOrigin] = useState<string | null>(null);
  const [selectedRegionApparitions, setSelectedRegionApparitions] = useState<string | null>(null);

  // (Opcional) Cargar valores iniciales cuando se abre   QUITAR
  useEffect(() => {
    if (!open) return;
    if (initial) {
      setSelectedGeneration(initial.generation ?? null);
      setSelectedType(Array.isArray(initial.type) ? initial.type : []);
      setSelectedRegionOrigin(initial.regionOrigin ?? null);
      setSelectedRegionApparitions(initial.regionApparitions ?? null);
    } else {
      // Si prefieres limpiar cada vez que abres, deja estos a ""
      // setNameFilter(""); setSelectedGeneration(null); setSelectedType([]); ...
    }
  }, [open, initial]);

  const handleApply = () => {
    const filters: FiltersPokemon = {
      type: selectedType.length ? selectedType : undefined,
      generation: selectedGeneration ?? undefined,
      regionOrigin: selectedRegionOrigin ?? undefined,
      regionApparitions: selectedRegionApparitions ?? undefined,
    };
    onApply(filters);
    onClose();
  };

  const handleClear = () => {
    setSelectedGeneration(null);
    setSelectedType([]);
    setSelectedRegionOrigin(null);
    setSelectedRegionApparitions(null);
    onClear?.();
  };

  return (
    <ModalSheet open={open} onClose={onClose} heightRatio={0.75}>
      <View className="mb-3 flex-row items-center justify-between ">
        <Text className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
          Filtros de Búsqueda
        </Text>
        <Pressable onPress={onClose} className="px-2 py-1">
          <Image source={icons.iconCloseWhite} className="w-12 h-12" resizeMode="contain" />
        </Pressable>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 16 }}>

        {/* Tipos */}
        <CustomMultiPickerComponent
          items={itemsTypes}
          selectedValues={selectedType}
          setSelectedValues={setSelectedType}
          label="Type"
        />

        {/* Generación */}
        <CustomSinglePickerComponent
          items={itemsGenerations}
          selectedValue={selectedGeneration}
          setSelectedValue={(v) => setSelectedGeneration(typeof v === "number" ? v : Number(v))}
          label="Generation"
        />

        {/* Regiones */}
        <CustomSinglePickerComponent
          items={itemsRegion}
          selectedValue={selectedRegionOrigin}
          setSelectedValue={(v) => setSelectedRegionOrigin(typeof v === "string" ? v : String(v))}
          label="Region origin"
        />

        <CustomSinglePickerComponent
          items={itemsRegion}
          selectedValue={selectedRegionApparitions}
          setSelectedValue={(v) => setSelectedRegionApparitions(typeof v === "string" ? v : String(v))}
          label="Regions apparitions"
        />
      </ScrollView>

      {/* Botonera */}
      <View className="mt-2 flex-row gap-3">
        <Pressable onPress={handleClear} className="flex-1 bg-neutral-200 dark:bg-neutral-800 rounded-xl py-3 items-center">
          <Text className="text-neutral-800 dark:text-neutral-200">Limpiar</Text>
        </Pressable>
        <Pressable onPress={handleApply} className="flex-1 bg-indigo-600 rounded-xl py-3 items-center">
          <Text className="text-white font-semibold">Filtrar</Text>
        </Pressable>
      </View>
    </ModalSheet>
  );
}
