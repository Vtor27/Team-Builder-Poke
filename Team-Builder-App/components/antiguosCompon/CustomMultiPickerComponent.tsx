import React, { Dispatch, SetStateAction, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { ItemMultiPicker } from "@/types/types";
import { ChevronDown } from "lucide-react-native";
import { icons } from "@/icons/icons";

type Props = {
  label: string;
  selectedValues: string[];
  setSelectedValues: Dispatch<SetStateAction<string[]>>; // Función que actualiza el estado selectedValues. Puede recibir un array nuevo o una función que lo modifique.eccionar.
  max?: number;
  items: ItemMultiPicker[];
};

const CustomMultiPickerComponent = ({
  label,
  selectedValues,
  setSelectedValues,
  items,
  max = 2,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleSelection = (value: string) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    } else if (selectedValues.length < max) {
      setSelectedValues([...selectedValues, value]);
    }
  };

  return (
    <View className="justify-center h-28 w-full my-1 border-b-2">
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl font-semibold mb-2 mr-10">{label}</Text>
        {selectedValues.length > 0 && (
          <Pressable
            onPress={() => setSelectedValues([])}
            className="h-12 w-12 justify-center items-center"
          >
            <Image source={icons.deleteValue} className="h-12 w-12" />
          </Pressable>
        )}
      </View>

      <Pressable
        onPress={() => setModalVisible(true)}
        className="flex-row items-center justify-between border border-black rounded-xl px-4 py-3 bg-white"
      >
        <Text className="text-base text-gray-700">
          {selectedValues.length > 0
            ? selectedValues.join(", ")
            : "Seleccionar..."}
        </Text>
        <ChevronDown size={20} color="#6b7280" />
      </Pressable>

      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          onPress={() => setModalVisible(false)}
          className="flex-1 bg-black/40 justify-center items-center"
        >
          <View className="bg-white w-4/5 max-h-[70%] rounded-2xl p-4 shadow-lg">
            <ScrollView>
              {items.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  className={`py-3 px-4 border-b border-gray-200 ${
                    selectedValues.includes(item.value)
                      ? "bg-gray-100"
                      : "bg-white"
                  }`}
                  onPress={() => toggleSelection(item.value)}
                >
                  <Text className="text-base text-black">{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default CustomMultiPickerComponent;
