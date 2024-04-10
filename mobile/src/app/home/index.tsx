import { Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";

import Header from "../../components/header";
import Footer from "../../components/footer";
import { MotiView } from "moti";
import Route from "@/@types/routes";
import clsx from "clsx";
import MenuItems from "@/components/menu/menu-items";

export default function Home() {
  return (
    <View className="mb-10 w-[100%] flex-1">
      <Header />

      <View className="flex-1 items-start justify-center">
        <MenuItems />
      </View>

      <Footer />
    </View>
  );
}
