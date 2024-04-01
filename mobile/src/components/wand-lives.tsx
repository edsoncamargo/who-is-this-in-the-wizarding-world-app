import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { StyleSheet, Text, View } from "react-native";

interface WandLivesProps {
  wands: number;
}

export const WandLives = forwardRef((props: WandLivesProps, ref: any) => {
  const { wands = 3 } = props;
  const [broken, setBroken] = useState<number>(0);

  function removeWand() {
    const wandsBroken = broken <= wands ? broken + 1 : wands;
    setBroken(wandsBroken);
    return wandsBroken;
  }

  function addWand() {
    const wandsBroken = broken > 0 && broken <= wands ? broken - 1 : broken;
    setBroken(wandsBroken);
    return wandsBroken;
  }

  useEffect(() => {}, [broken]);

  useImperativeHandle(ref, () => ({
    removeWand,
    addWand,
  }));

  return (
    <View className="flex-row space-x-4">
      {new Array(wands).fill(null).map((_, index) => (
        <Text
          key={`${index}-wand`}
          className="text-xl"
          style={index < broken ? styles.disable : null}
        >
          🪄
        </Text>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  disable: {
    color: "transparent",
    textShadowColor: "#9CB0DC",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 1,
  },
});
