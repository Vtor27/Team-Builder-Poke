import React from "react";
import { View, Animated } from "react-native";

interface ScrollProgressBarProps {
  scrollY: Animated.Value;
  contentHeight: number;
  viewportHeight: number;
  listTopOffset: number;
  trackHeight: number;
  barWidth?: number;
}

export default function ScrollProgressBar({
  scrollY,
  contentHeight,
  viewportHeight,
  listTopOffset,
  trackHeight,
  barWidth = 6,
}: ScrollProgressBarProps) {
  const indicatorHeight = Math.max(
    (trackHeight * viewportHeight) / contentHeight,
    30
  );

  const scrollable = Math.max(contentHeight - viewportHeight, 1);

  const translateYThumb = scrollY.interpolate({
    inputRange: [0, scrollable],
    outputRange: [0, Math.max(trackHeight - indicatorHeight, 0)],
    extrapolate: "clamp",
  });

  return (
    <View
      pointerEvents="none"
      className="absolute right-3 rounded-full bg-white/25 z-20"
      style={{
        top: listTopOffset,
        height: trackHeight,
        width: barWidth,
      }}
    >
      <Animated.View
        className="absolute left-0 rounded-full bg-white"
        style={{
          height: indicatorHeight,
          width: barWidth,
          transform: [{ translateY: translateYThumb }],
        }}
      />
    </View>
  );
}
