import { IconName, icons } from "@/icons/icons";
import React, { useRef } from "react";
import { Text, Pressable, Animated, Image } from "react-native";

type Props = {
  text: string;
  imageSource: IconName;
  onPress?: () => void;
};

const ButtonMenu = ({ text, imageSource, onPress }: Props) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
      <Animated.View
        style={{
          transform: [{ scale }],
        }}
        className="border mb-4 w-12/12 h-10 rounded-2xl flex-row justify-around items-center"
      >
        <Text className="text-xl">{text}</Text>
        <Image source={icons[imageSource]} className="h-7 w-7" />
      </Animated.View>
    </Pressable>
  );
};

export default ButtonMenu;
