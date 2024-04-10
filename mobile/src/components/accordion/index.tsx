import { ReactNode, forwardRef, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MotiView, useDynamicAnimation } from "moti";

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
          <MotiView
            animate={{
              rotate: localOpen ? "180deg" : "0deg",
            }}
            transition={{
              type: "spring",
            }}
          >
            <Feather name="chevron-down" color="#9CB0DC" size={24} />
          </MotiView>
        </TouchableOpacity>

        <MotiView
          from={{ opacity: 0, maxHeight: 0 }}
          animate={{
            opacity: localOpen ? 1 : 0,
            maxHeight: localOpen ? 9999 : 0,
          }}
          transition={{
            type: "timing",
            duration: 1000,
          }}
        >
          <Text className="text-xl text-primary">{content}</Text>
        </MotiView>
      </View>
    );
  }
);
