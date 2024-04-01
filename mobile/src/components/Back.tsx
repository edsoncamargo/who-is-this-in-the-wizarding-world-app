import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Back() {
  const router = useRouter();

  return (
    <View>
      <TouchableOpacity
        className="absolute top-0 left-0"
        onPress={() => router.back()}
      >
        <Feather name="chevron-left" color="#9CB0DC" size={24} />
      </TouchableOpacity>
    </View>
  );
}
