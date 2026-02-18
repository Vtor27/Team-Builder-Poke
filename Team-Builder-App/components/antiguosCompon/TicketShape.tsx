import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  fill?: string; // Color de fondo
  stroke?: string; // Color del borde
  strokeWidth?: number; // Grosor del borde
};

export default function TicketShape({
  fill = "#FFFFFF", // Fondo blanco
  stroke = "#E88D00", // Borde naranja similar al de la imagen
  strokeWidth = 2, // Grosor medio
}: Props) {
  const width = 300;
  const height = 60;

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Path
        d={`
          M0,12
          Q12,12 12,0
          H288
          Q288,12 300,12
          V48
          Q288,48 288,60
          H12
          Q12,48 0,48
          Z
        `}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
}
