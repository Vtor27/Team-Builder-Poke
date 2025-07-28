import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { ItemSinglePicker } from "@/types/types";
import { ChevronDown } from "lucide-react-native";
import { icons } from "@/icons/icons";

type Props = {
  label: string;
  selectedValue: string | number | null;
  setSelectedValue: (val: string | number | null) => void;
  items: ItemSinglePicker[];
};

const CustomSinglePickerComponent = ({
  label,
  selectedValue,
  setSelectedValue,
  items,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="justify-center h-28 w-full border-b-2 my-1">
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl font-semibold mb-2 mr-10 ">{label}</Text>
        {selectedValue && (
          <Pressable
            onPress={() => setSelectedValue(null)}
            className=" h-12 w-12 justify- items-center"
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
          {selectedValue
            ? items.find((item) => item.value === selectedValue)?.label
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
          <View className="bg-white w-11/12 max-h-[60%] rounded-2xl p-4 shadow-xl">
            <ScrollView showsVerticalScrollIndicator={false}>
              {items.map((item) => (
                <TouchableOpacity
                  key={item.value.toString()}
                  className="py-3 px-4 border-b border-gray-200"
                  onPress={() => {
                    setSelectedValue(item.value);
                    setModalVisible(false);
                  }}
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

export default CustomSinglePickerComponent;
