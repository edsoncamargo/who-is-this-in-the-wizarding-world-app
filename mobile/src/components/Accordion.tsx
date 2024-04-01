import { ReactNode, forwardRef, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

interface Accordion {
  title: string;
  content: ReactNode;
  isOpen: boolean;
  onPress: () => void;
}

export const Accordion = forwardRef(
  ({ title, content, isOpen, onPress }: Accordion, ref: any) => {
    const [localOpen, setLocalOpen] = useState<boolean>(false);

    useEffect(() => {
      setLocalOpen(isOpen);
    }, [isOpen]);

    const handlePress = () => {
      setLocalOpen(!localOpen);
      onPress();
    };

    return (
      <View className="w-full border-b border-primary py-4">
        <TouchableOpacity
          className="flex flex-row items-center justify-between py-2"
          onPress={handlePress}
          activeOpacity={0.7}
        >
          <Text className="text-xl font-bold text-primary">{title}</Text>
          <Feather
            name="chevron-down"
            color="#9CB0DC"
            size={24}
            style={{ transform: [{ rotate: localOpen ? "180deg" : "0deg" }] }}
          />
        </TouchableOpacity>

        {localOpen && (
          <View>
            <Text className="text-xl text-primary">{content}</Text>
          </View>
        )}
      </View>
    );
  }
);
