import { Text, TouchableOpacity, View } from "react-native";
import * as Linking from "expo-linking";

export default function Footer() {
  function goToPortfolio() {
    Linking.openURL("https://edsoncamargo.dev");
  }

  return (
    <View className="w-[100%] flex-row justify-center gap-2">
      <Text className="text-primary opacity-60">© 2023 —</Text>
      <TouchableOpacity onPress={() => goToPortfolio()} activeOpacity={0.7}>
        <Text className="font-bold text-highlight opacity-60">
          edsoncamargo.dev.
        </Text>
      </TouchableOpacity>
      <Text className="text-primary opacity-60">All rights reserved.</Text>
    </View>
  );
}
