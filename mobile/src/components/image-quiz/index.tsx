import { MotiView } from "moti";
import { ImageBackground, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

interface ImageQuiz {
  url: string;
}

export function ImageQuiz({ url }: ImageQuiz) {
  return (
    <MotiView
      className="w-full flex-1 items-center"
      from={{ opacity: 0, translateY: -30 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "spring", delay: 150 }}
    >
      <Shadow
        style={{ borderRadius: 16 }}
        distance={6}
        startColor={"#222455"}
        containerStyle={{ marginVertical: 0, shadowRadius: 16 }}
      >
        <View className="h-[263] max-h-52 w-[186] overflow-hidden rounded-2xl">
          <ImageBackground
            className="h-[263] max-h-52 w-[186]"
            source={{
              uri: url,
            }}
            imageStyle={{
              resizeMode: "cover",
              alignSelf: "flex-start",
              backgroundColor: "#fff",
            }}
          />
        </View>
      </Shadow>
    </MotiView>
  );
}
