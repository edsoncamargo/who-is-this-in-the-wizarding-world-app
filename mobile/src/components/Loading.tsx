import { ActivityIndicator, View } from "react-native";

export default function Loading() {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: -1,
      }}
      className="bg-tertiary"
    >
      <ActivityIndicator size="large" color="#9CB0DC"></ActivityIndicator>
    </View>
  );
}
