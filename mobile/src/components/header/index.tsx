import { Text, View } from "react-native";
import clsx from "clsx";
import Back from "@/components/back";
import { MotiView } from "moti";

import Logo from "@/assets/images/logo.svg";

interface Header {
  title?: Array<{
    text: string;
    isHilighte?: boolean;
    hasBreakLine?: boolean;
    hasSpace?: boolean;
  }>;
  hasBackButton?: boolean;
}

export default function Header({
  title = [
    {
      text: "Who is this in",
      isHilighte: false,
      hasBreakLine: true,
      hasSpace: true,
    },
    { text: "The", isHilighte: false, hasBreakLine: false, hasSpace: true },
    {
      text: "Wizarding",
      isHilighte: true,
      hasBreakLine: false,
      hasSpace: true,
    },
    { text: "World", isHilighte: false, hasBreakLine: false, hasSpace: true },
  ],
  hasBackButton,
}: Header) {
  return (
    <View className="mb-14 w-[100%]">
      {hasBackButton && <Back />}

      <View className="items-center">
        <MotiView
          from={{ opacity: 0, translateY: -30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring" }}
        >
          <Logo className="mb-2" />
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring" }}
        >
          <Text className="max-w-[200] text-center">
            {title.map((item, index) => (
              <Text
                key={item.text + index}
                className={clsx(" font-handwriting text-2xl text-primary", {
                  ["text-highlight"]: item.isHilighte,
                })}
              >
                {item.text}
                {item.hasSpace && " "}
                {item.hasBreakLine && "\n"}
              </Text>
            ))}
          </Text>
        </MotiView>
      </View>
    </View>
  );
}
