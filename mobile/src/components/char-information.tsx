import React from "react";
import { View, Text, ImageBackground } from "react-native";

import Gryffindor from "@/assets/images/houses/gryffindor.svg";
import Hufflepuff from "@/assets/images/houses/hufflepuff.svg";
import Ravenclaw from "@/assets/images/houses/ravenclaw.svg";
import Slytherin from "@/assets/images/houses/slytherin.svg";
import Goop from "@/assets/images/goop.svg";

import { Chars } from "@/api/chp/chp.service";

interface CharInformationProps extends Chars {}

const CharInformation: React.FC<CharInformationProps> = React.memo(
  ({
    id,
    name,
    blood,
    born,
    species,
    gender,
    house,
    url,
  }: CharInformationProps) => {
    console.log(name);

    function houseToRender() {
      switch (house) {
        case "Gryffindor":
          return <Gryffindor width="100%" height={75} />;
        case "Hufflepuff":
          return <Hufflepuff width="100%" height={75} />;
        case "Ravenclaw":
          return <Ravenclaw width="100%" height={75} />;
        case "Slytherin":
          return <Slytherin width="100%" height={75} />;
        default:
          return <></>;
      }
    }

    return (
      <View className="mb-6 overflow-hidden">
        <View className="max-h-[280] w-full overflow-hidden rounded-t-2xl bg-secondary">
          <ImageBackground
            className="h-full max-h-[280] w-full"
            source={{
              uri: url,
            }}
            imageStyle={{
              resizeMode: "stretch",
              alignSelf: "flex-start",
              justifyContent: "flex-start",
            }}
            blurRadius={6}
          />
          <ImageBackground
            className="absolute h-full max-h-[280] w-full"
            source={{
              uri: url,
            }}
            imageStyle={{
              resizeMode: "center",
            }}
          />
        </View>

        <View className="relative w-full bg-secondary/60 p-6">
          <View className="pb-6">
            <Text className="font-handwriting text-3xl text-highlight">
              {name}
            </Text>
            {born !== "None" && (
              <Text className="font-regular text-xl text-primary">{born}</Text>
            )}
          </View>
          <View className="flex flex-row flex-wrap gap-2">
            <Text className="relative z-10 max-w-[150] rounded-full bg-cta p-2 px-4 text-center text-xl font-bold text-neutral-1">
              {gender}
            </Text>
            <Text className="relative z-10 max-w-[150] rounded-full bg-success p-2 px-4 text-center text-xl font-bold text-neutral-1">
              {species}
            </Text>
            <Text className="relative z-10 max-w-[150] rounded-full bg-error p-2 px-4 text-center text-xl font-bold text-neutral-1">
              {blood}
            </Text>
          </View>
          <View className="absolute -right-24 -top-10 z-10 h-full w-full">
            {/* {houseToRender()} */}
          </View>

          <Text className="z-1 absolute -right-10 -bottom-10">
            <Goop />
          </Text>
        </View>
      </View>
    );
  }
);

export default CharInformation;
