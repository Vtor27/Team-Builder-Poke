// components/SideMenu.tsx
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, View, Text, Image } from "react-native";
import { icons } from "@/icons/icons";
import ButtonMenu from "@/components/ButtonMenu";

type Props = { open: boolean; onToggle: () => void; children?: React.ReactNode };

export default function SideMenu({ open, onToggle, children }: Props) {
  const widthMenu = useRef(new Animated.Value(-300)).current;
  const overlay = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(widthMenu, { toValue: open ? 0 : -300, duration: 200, useNativeDriver: true }),
      Animated.timing(overlay, { toValue: open ? 1 : 0, duration: 160, useNativeDriver: true }),
    ]).start();
  }, [open, widthMenu, overlay]);

  return (
    <View pointerEvents={open ? "auto" : "none"} className="absolute inset-0 z-50">
      <Animated.View
        className="absolute inset-0 bg-black"
        style={{ opacity: overlay.interpolate({ inputRange: [0, 1], outputRange: [0, 0.35] }) }}
      />
      <Pressable onPress={onToggle} className="absolute inset-0" />

      <Animated.View
        className="absolute left-0 top-0 bottom-0 w-6/12 bg-white rounded-r-3xl shadow-2xl p-4"
        style={{ transform: [{ translateX: widthMenu }] }}
      >
        {children ?? (
          <View className="gap-3">
            <View className="flex-row justify-between">
            <Text className="pt-5 pl-1 text-3xl font-bold text-neutral-900">Menú</Text>
            <Pressable onPress={onToggle} className="py-2">
              <Image source={icons.iconMenuDrawerClose} className="h-10 w-10 "/>
            </Pressable>
            </View>
            <View className="h-1 bg-black rounded-full"/>
            <View className=" mt-1 pl-1 py-2">
                <ButtonMenu text="Pokédex" imageSource="iconPokedex" onPress={() => console.log("Navegando a la Pokedex.")}/>
                <ButtonMenu text="Team-Builder" imageSource="iconYunque" onPress={() => console.log("Navegando al creador de equipos.")}/>
                <ButtonMenu text="Equipos" imageSource="iconSwordShield" onPress={() => console.log("Navegando a ver los equipos guardados.")}/>
                <ButtonMenu text="Favoritos" imageSource="iconFavSelect" onPress={() => console.log("Navegando a Favoritos.")}/>
                <ButtonMenu text="Perfil" imageSource="iconUser" onPress={() => console.log("Navegando a la pantalla de perfil")}/>
                <ButtonMenu text="Login" imageSource="iconLogin" onPress={() => console.log("Navegando a la página de login o cerrar sesion.")}/>
            </View>
          </View>
        )}
      </Animated.View>
    </View>
  );
}
