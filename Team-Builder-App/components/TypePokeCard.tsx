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
  bug: "#A6B91A",
  dark: "#705746",
  dragon: "#6F35FC",
  electric: "#F7D02C",
  fairy: "#D685AD",
  fighting: "#C22E28",
  fire: "#EE8130",
  flying: "#A98FF3",
  ghost: "#735797",
  grass: "#7AC74C",
  ground: "#E2BF65",
  ice: "#96D9D6",
  normal: "#A8A77A",
  poison: "#A33EA1",
  psychic: "#F95587",
  rock: "#B6A136",
  steel: "#B7B7CE",
  water: "#6390F0",
};


// POSIBLE CAMBIO -> UTILIZAR LOS ICONOS DE LOS TIPOS EN VEZ DE LAS TARGETAS CON LOS TIPOS ESCRITOS

const TypePokeCard = ({ types }: Props) => {
  const checkedType = types
    .map((type) => type.toLocaleLowerCase())
    .filter((t): t is PokemonType => t in typeColor);

  const darkTypes = [
    "psychic",
    "poison",
    "dark",
    "ghost",
    "dragon",
    "steel",
    "grass",
    "bug",
    "rock",
    "water",
    "fighting",
    "flying"
  ];

  const checkColorText = (type: string) => 
    darkTypes.includes(type) ? "text-white" : "text:black";
    const type1 = checkedType[0];
    const type2 = checkedType[1];

    if(!type1) return null;

    const stylesWind = {
      typeContainStyle:
        "w-20 h-6  text-center rounded-full justify-center my-1",
      typeTextStyle1: `text-m w-20 font-bold text-center ${checkColorText(type1)}`,
      typeTextStyle2: `text-m w-20 font-bold text-center ${checkColorText(type2)}`,
    };
  
    return types.length === 2 ? (
      <View className="flex-row justify-around w-9/12 pb-1">
        <View
          className={stylesWind.typeContainStyle}
          style={{ backgroundColor: typeColor[checkedType[0]] }}
        >
          <Text className={stylesWind.typeTextStyle1}>{types[0]}</Text>
        </View>
        <View
          className={stylesWind.typeContainStyle}
          style={{ backgroundColor: typeColor[checkedType[1]] }}
        >
          <Text className={stylesWind.typeTextStyle2}>{types[1]}</Text>
        </View>
      </View>
    ) : (
      <View className="p-1 items-center">
        <View
          className={stylesWind.typeContainStyle}
          style={{ backgroundColor: typeColor[checkedType[0]] }}
        >
          <Text className={stylesWind.typeTextStyle1}>{types[0]}</Text>
        </View>
      </View>
    );
  };


export default TypePokeCard;
