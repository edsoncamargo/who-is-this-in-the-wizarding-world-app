import { Text, TouchableOpacity, View } from "react-native";
import * as Linking from "expo-linking";
import { MotiView } from "moti";

export default function Footer() {
  function goToPortfolio() {
    Linking.openURL("https://edsoncamargo.dev");
  }

  return (
    <MotiView
      className="w-[100%] flex-row justify-center gap-2"
      from={{ opacity: 0, translateY: 100 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "spring" }}
    >
      <Text className="text-primary opacity-60">© 2024 —</Text>
      <TouchableOpacity onPress={() => goToPortfolio()} activeOpacity={0.7}>
        <Text className="font-bold text-highlight opacity-60">
          edsoncamargo.dev.
        </Text>
      </TouchableOpacity>
      <Text className="text-primary opacity-60">All rights reserved.</Text>
    </MotiView>
  );
}
