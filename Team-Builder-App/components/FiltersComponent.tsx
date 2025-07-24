import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { icons } from "@/icons/icons";

type Props = {
  onCloseFilters: () => void;
  showFilters: boolean;
  insets: { bottom: number };
};

const FiltersComponent = (props: Props) => {
  const [openGeneration, setOpenGeneration] = useState(false);
  const [valueGeneration, setValueGeneration] = useState(null);
  const [itemsGeneration, setItemsGeneration] = useState([
    { label: "Generation 1", value: 1 },
    { label: "Generation 2", value: 2 },
    { label: "Generation 3", value: 3 },
    { label: "Generation 4", value: 4 },
    { label: "Generation 5", value: 5 },
    { label: "Generation 6", value: 6 },
    { label: "Generation 7", value: 7 },
  ]);

  return (
    <View
      className="bg-red-400 flex-1 rounded-t-xl"
      style={{ paddingBottom: props.insets.bottom + 10 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="w-full px-4"
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
        <View className="flex-row items-center justify-between h-12 mx-8 my-4">
          <Text className="mr-6 text-2xl font-semibold">Name</Text>
          <TextInput
            className="border rounded-xl w-9/12"
            placeholder="Buscar por nombre"
            placeholderTextColor="gray"
          />
        </View>
        <View className="justify-center h-14 mx-8 my-4 ">
          <Text className="text-2xl font-semibold mb-2 mr-10 ">Generation</Text>
          <View className="w-11/12">
            <DropDownPicker
              placeholder="Generation"
              open={openGeneration}
              value={valueGeneration}
              items={itemsGeneration}
              setOpen={setOpenGeneration}
              setValue={setValueGeneration}
              setItems={setItemsGeneration}
              multiple={true}
              mode="BADGE" // Cambia el modo a BADGE para mostrar los valores seleccionados
              listMode="SCROLLVIEW" // Cambia el modo de la lista a MODAL
              scrollViewProps={{
                nestedScrollEnabled: true, // Permite el desplazamiento anidado
                persistentScrollbar: true, // Muestra la barra de desplazamiento
              }}
            />
            {valueGeneration && (
              <Pressable
                onPress={() => setValueGeneration(null)}
                className="absolute right-6 top-3 z-99"
              >
                <Image source={icons.deleteValue} />
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FiltersComponent;
