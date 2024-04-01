import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

export default function Feedback() {
  const {
    totalChars = 0,
    winner,
    correct = 0,
    wrong = 0,
  } = useLocalSearchParams<{
    totalChars: string;
    winner: string;
    correct: string;
    wrong: string;
  }>();
  const router = useRouter();

  function getCurrentPercentage() {
    console.log((Number(correct) / Number(totalChars)) * 100);
    return `${(Number(correct) / Number(totalChars)) * 100}%`;
  }

  function redirectTo(route: string) {
    router.push({ pathname: `/${route}`, params: { totalChars } });
  }

  return (
    <View className="w-[100%] flex-1 justify-between">
      <View className="relative px-6">
        <View className="absolute -left-[85] -top-[140] h-[460] w-[450] rounded-full bg-primary/50"></View>
        <View className="absolute -top-36 -left-24 h-[450] w-[450] rounded-full bg-secondary"></View>

        <Text className="mb-8 text-8xl">🏆</Text>
        <Text className="text-xl font-bold tracking-[6] text-primary">
          {winner === "true"
            ? "Wizard master 🎉\nExplore more magic at Hogwarts 🧙‍♂️✨"
            : "No worries, wizard ✨\nNext quiz, shine 🧙‍♀️"}
        </Text>
      </View>

      <View>
        <View className="flex flex-row items-end px-6">
          <Text className="text-6xl font-bold text-primary">{correct}/</Text>
          <Text className="mb-[6] text-3xl text-highlight">{totalChars}</Text>

          <View className="mb-[12] ml-1">
            <Entypo name="star" color="#E7DB80" size={24} />
          </View>
        </View>

        <View className="w-auto px-6">
          <View
            className={`relative mb-8 h-[48] w-full flex-row items-center justify-center overflow-hidden rounded-full border-4 border-highlight bg-highlight`}
          >
            <View
              className="absolute left-0 h-[48] w-full bg-primary"
              style={{ width: getCurrentPercentage() }}
            ></View>
          </View>
        </View>

        <View className="flex flex-row justify-between gap-2 px-6">
          <View className="flex flex-row items-center">
            <View className="mr-2 h-2 w-2 rounded-full bg-success"></View>

            <View className="flex">
              <Text className="text-bold mb-1 text-2xl text-primary">
                🏆 {correct}
              </Text>
              <Text className="text-xl text-primary">Correct</Text>
            </View>
          </View>

          <View className="flex flex-row items-center">
            <View className="mr-2 h-2 w-2 rounded-full bg-highlight"></View>

            <View className="flex">
              <Text className="text-bold mb-1 text-2xl text-primary">
                🧙🏽‍♂️ {totalChars}
              </Text>
              <Text className="text-xl text-primary">Total Chars</Text>
            </View>
          </View>

          <View className="flex flex-row items-center">
            <View className="mr-2 h-2 w-2 rounded-full bg-error"></View>

            <View className="flex">
              <Text className="text-bold mb-1 text-2xl text-primary">
                🪄 {wrong}
              </Text>
              <Text className="text-xl text-primary">Broken Wands</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="flex">
        <View className="absolute -bottom-10 h-[108] w-full rounded-t-3xl bg-primary/50"></View>
        <View className="absolute -bottom-10 h-[100] w-full rounded-t-3xl bg-secondary"></View>

        <View className="flex w-full flex-row justify-between px-6">
          <TouchableOpacity
            className="flex flex-row items-center justify-center gap-2"
            onPress={() => redirectTo("")}
          >
            <Text className="text-xl font-bold text-primary">Menu</Text>
            <Entypo name="menu" color="#9CB0DC" size={20} />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex flex-row items-center justify-center gap-2"
            onPress={() => redirectTo("quiz/questions")}
          >
            <Text className="text-xl font-bold text-primary">Again </Text>
            <MaterialIcons name="replay" color="#9CB0DC" size={20} />
          </TouchableOpacity>

          <TouchableOpacity className="flex flex-row items-center justify-center gap-2">
            <Text className="text-xl font-bold text-primary">Share</Text>
            <Entypo name="share" color="#9CB0DC" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timerBar: {
    borderColor: "#F0F7F4",
    borderWidth: 2,
    borderRadius: 32,
    overflow: "hidden",
  },
});
