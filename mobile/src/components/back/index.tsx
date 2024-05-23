import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MotiView } from "moti";
import { MotiPressable } from "moti/interactions";

export default function Back() {
  const router = useRouter();

  return (
    <MotiPressable
      onPress={() => router.back()}
      from={{ opacity: 0, translateX: -40 }}
      animate={{
        opacity: 1,
        translateX: 0,
      }}
      transition={{
        type: "spring",
      }}
    >
      <Feather
        className="absolute top-0 left-0 z-50"
        name="chevron-left"
        color="#9CB0DC"
        size={24}
      />
    </MotiPressable>
  );
}
