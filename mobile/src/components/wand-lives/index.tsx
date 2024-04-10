import { MotiView } from "moti";
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
        <MotiView
          key={`${index}-wand`}
          from={{ opacity: 0, translateY: -15 }}
          animate={{
            opacity: 1,
            translateY: 0,
          }}
          transition={{ type: "spring", delay: 100 * index }}
        >
          <MotiView
            className="text-xl"
            animate={{ opacity: index < broken ? 0.5 : 1 }}
          >
            <Text className="transition-all">🪄</Text>
          </MotiView>
        </MotiView>
      ))}
    </View>
  );
});
