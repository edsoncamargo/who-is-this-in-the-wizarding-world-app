import { ActivityIndicator } from "react-native";

export default function Loading() {
  return (
    <ActivityIndicator
      className="flex-1 items-center justify-center"
      size="large"
      color="#9CB0DC"
    ></ActivityIndicator>
  );
}
