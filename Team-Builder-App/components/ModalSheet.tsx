// components/ModalSheet.tsx
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Pressable, View } from "react-native";

type ModalSheetProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  heightRatio?: number;
};

export default function ModalSheet({ open, onClose, children, heightRatio = 0.7 }: ModalSheetProps) {
  const { height: SH } = Dimensions.get("window");
  const H = Math.round(SH * heightRatio);

  const ty = useRef(new Animated.Value(SH)).current;
  const ov = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(ty, { toValue: open ? 0 : SH, duration: 220, useNativeDriver: true }),
      Animated.timing(ov, { toValue: open ? 1 : 0, duration: 180, useNativeDriver: true }),
    ]).start();
  }, [open, ov, ty, SH]);

  return (
    <View pointerEvents={open ? "auto" : "none"} className="absolute inset-0 z-50">
      <Animated.View className="absolute inset-0 bg-black" style={{ opacity: ov.interpolate({ inputRange: [0,1], outputRange: [0,0.35] }) }} />
      <Pressable onPress={onClose} className="absolute inset-0" />

      <Animated.View
        className="absolute left-0 right-0 bottom-0 bg-white dark:bg-neutral-900 rounded-t-3xl p-4"
        style={{ height: H, transform: [{ translateY: ty }] }}
      >
        {children}
      </Animated.View>
    </View>
  );
}
