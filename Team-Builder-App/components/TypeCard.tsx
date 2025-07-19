import { View, Text } from "react-native";

type PokemonType =
  | "bug"
  | "dark"
  | "dragon"
  | "electric"
  | "fairy"
  | "fighting"
  | "fire"
  | "flying"
  | "ghost"
  | "grass"
  | "ground"
  | "ice"
  | "normal"
  | "poison"
  | "psychic"
  | "rock"
  | "steel"
  | "water";

type Props = {
  types: string[];
};

const typeColor: Record<PokemonType, string> = {
  bug: "#6B8E23",
  dark: "#2F4F4F",
  dragon: "#008080",
  electric: "#FFD700",
  fairy: "#DDA0DD",
  fighting: "#FF6347",
  fire: "#FF4500",
  flying: "#ADD8E6",
  ghost: "#483D8B",
  grass: "#228B22",
  ground: "#A0522D",
  ice: "#AFEEEE",
  normal: "#DCDCDC",
  poison: "#9370D8",
  psychic: "#C71585",
  rock: "#D2B48C",
  steel: "#708090",
  water: "#1E90FF",
};

const CardTypePoke = ({ types }: Props) => {
  const checkedType = types
    .map((type) => type.toLocaleLowerCase())
    .filter((t): t is PokemonType => t in typeColor);

  const darkTypes = ["psychic", "poison", "dark", "ghost", "dragon", "steel"];

  const checkColorText = (
    darkTypes: string[],
    type1: string,
    type2: string
  ) => {
    return darkTypes.includes(type1 || type2) ? "text-white" : "text-black";
  };

  const stylesWind = {
    typeContainStyle: "w-24 h-8 rounded-full justify-center ",
    typeTextStyle: `text-lg font-bold text-center ${checkColorText(darkTypes, checkedType[0], checkedType[1])}`,
  };

  return types.length === 2 ? (
    <View className="flex-row w-full justify-around border">
      <View
        className={stylesWind.typeContainStyle}
        style={{ backgroundColor: typeColor[checkedType[0]] }}
      >
        <Text className={stylesWind.typeTextStyle}>{types[0]}</Text>
      </View>
      <View
        className={stylesWind.typeContainStyle}
        style={{ backgroundColor: typeColor[checkedType[1]] }}
      >
        <Text className={stylesWind.typeTextStyle}>{types[1]}</Text>
      </View>
    </View>
  ) : (
    <View className="flex-row w-full justify-around border">
      <View
        className={stylesWind.typeContainStyle}
        style={{ backgroundColor: typeColor[checkedType[0]] }}
      >
        <Text className={stylesWind.typeTextStyle}>{types[0]}</Text>
      </View>
    </View>
  );
};

export default CardTypePoke;
