import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <Drawer 
        screenOptions={{ 
          headerShown: false, 
          drawerType: 'slide', 
          }}>

          <Drawer.Screen name="index" options={{drawerLabel: 'Pokedex', title: 'pokedex'}}/>
      </Drawer>
    </GestureHandlerRootView>
  
  )
}
