// components/TextSearchModal.tsx
import React, { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput, Keyboard } from "react-native";
import ModalSheet from "./ModalSheet";

type Props = {
  open: boolean;
  onClose: () => void;
  onSearch?: (query: string) => void;
  initialQuery?: string; // opcional
};

export default function SearchNameComponent({ open, onClose, onSearch, initialQuery }: Props) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) setQuery(initialQuery ?? "");
  }, [open, initialQuery]);

  const handleSearch = () => {
    const q = query.trim();
    onSearch?.(q);
    Keyboard.dismiss();
    onClose();
  };

  return (
    <ModalSheet open={open} onClose={onClose} heightRatio={0.5}>
      <View className="mb-3">
        <Text className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">Buscar</Text>
      </View>

      <View className="gap-3">
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Nombre, nº Pokédex…"
          placeholderTextColor="#9CA3AF"
          className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-xl px-4 py-3"
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />

        <View className="flex-row gap-3 mt-2">
          <Pressable onPress={onClose} className="flex-1 bg-neutral-200 dark:bg-neutral-800 rounded-xl py-3 items-center">
            <Text className="text-neutral-800 dark:text-neutral-200">Cancelar</Text>
          </Pressable>
          <Pressable onPress={handleSearch} className="flex-1 bg-indigo-600 rounded-xl py-3 items-center">
            <Text className="text-white font-semibold">Buscar</Text>
          </Pressable>
        </View>
      </View>
    </ModalSheet>
  );
}
