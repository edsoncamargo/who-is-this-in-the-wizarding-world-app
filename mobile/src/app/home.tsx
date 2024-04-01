import { Text, TouchableOpacity, View } from "react-native";
import { Link, useRouter } from "expo-router";

import Header from "../components/header";
import Footer from "../components/footer";

export default function Home() {
  const router = useRouter();

  function redirectTo(route: string) {
    router.push(`/${route}`);
  }

  return (
    <View className="w-[100%] flex-1">
      <Header />

      <View className="flex-1 items-start justify-center">
        <TouchableOpacity
          className="self-center pb-4"
          onPress={() => redirectTo("quiz/levels")}
        >
          <Text className="mb-2 text-3xl font-bold text-primary">
            Play Quiz
          </Text>
          <View className="h-1 w-12 bg-highlight"></View>
        </TouchableOpacity>

        <TouchableOpacity
          className="self-center pb-4"
          onPress={() => redirectTo("explore-characters")}
        >
          <Text className="mb-2 text-3xl font-bold text-primary">
            Explore Characters
          </Text>
          <View className="h-1 w-24 self-end bg-highlight"></View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => redirectTo("how-to-play")}
          className="self-center pb-4"
        >
          <Text className="mb-2 text-3xl font-bold text-primary">
            How to Play
          </Text>
          <View className="h-1 w-16 bg-highlight"></View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => redirectTo("about")}
          className="self-center pb-4"
        >
          <Text className="mb-2 text-3xl font-bold text-primary ">About</Text>
          <View className="h-1 w-4 self-end bg-highlight"></View>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
}
