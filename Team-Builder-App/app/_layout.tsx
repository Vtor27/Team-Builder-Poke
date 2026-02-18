import { useMemo, useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MenuContext } from "@/context/MenuContext";
import SideMenu from "@/components/SideMenu";

import "../global.css";
import { prefetch } from "expo-router/build/global-state/routing";
import { Presentation } from "lucide-react-native";

export default function App() {
  const [open, setOpen] = useState(false);
  const valueProvider = useMemo(
    () => ({ open, setOpen, toggleMenu: () => setOpen((v) => !v) }),
    [open]
  );

  return (
    <SafeAreaProvider>
      <MenuContext.Provider value={valueProvider}>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(pokedex)" />
          <Stack.Screen name="(modals)" options={{ presentation: "transparentModal" }} />
        </Stack>
        <SideMenu open={open} onToggle={() => setOpen((v) => !v)} />
      </MenuContext.Provider>
    </SafeAreaProvider>
  );
}
