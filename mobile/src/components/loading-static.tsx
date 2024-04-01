import { ActivityIndicator, View } from "react-native";

export default function LoadingStatic() {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="#9CB0DC"></ActivityIndicator>
    </View>
  );
}
