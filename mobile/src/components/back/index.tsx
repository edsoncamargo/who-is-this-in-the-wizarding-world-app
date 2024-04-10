import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MotiView } from "moti";

export default function Back() {
  const router = useRouter();

  return (
    <MotiView
      from={{ opacity: 0, translateX: -40 }}
      animate={{
        opacity: 1,
        translateX: 0,
      }}
      transition={{
        type: "spring",
      }}
    >
      <TouchableOpacity
        className="absolute top-0 left-0"
        onPress={() => router.back()}
      >
        <Feather name="chevron-left" color="#9CB0DC" size={24} />
      </TouchableOpacity>
    </MotiView>
  );
}
