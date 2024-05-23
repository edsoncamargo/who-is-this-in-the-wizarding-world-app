import { TouchableOpacity, View, Text, Dimensions } from "react-native";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface Button {
  name: string;
  isCorrect: boolean;
  disabled?: boolean;
  hasPressed?: boolean;
  handleOnPress: (name: string, isCorrect: boolean) => void;
}

export default function Button({
  name,
  isCorrect,
  disabled,
  hasPressed = false,
  handleOnPress,
}: Button) {
  const SCREEN_HORIZONTAL_PADDING = (24 * 2) / 2;
  const windowWidth = Dimensions.get("window").width;
  const answerButtonWidth = windowWidth / 2 - (SCREEN_HORIZONTAL_PADDING + 4);
  let [pressed, setPressed] = useState<boolean>(hasPressed);

  function getIsCorrect() {
    handleOnPress(name, isCorrect);
    setPressed(true);
  }

  return (
    <View className="mb-2 items-center">
      <TouchableOpacity
        className={clsx(
          "align-center max-h-[84] min-h-[84] items-center justify-center rounded-2xl border-2 border-secondary px-4 transition-all",
          {
            ["border-success"]: isCorrect && pressed,
            ["border-error"]: isCorrect === false && pressed,
          }
        )}
        style={{ width: answerButtonWidth }}
        activeOpacity={0.7}
        onPress={getIsCorrect}
        disabled={disabled}
      >
        <Text
          className={clsx(
            "color-primary text-center font-regular text-xl transition-all",
            {
              ["text-bold"]: (isCorrect || isCorrect === false) && pressed,
              ["color-neutral-1"]:
                (isCorrect || isCorrect === false) && pressed,
            }
          )}
        >
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
