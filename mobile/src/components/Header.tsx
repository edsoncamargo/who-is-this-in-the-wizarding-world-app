import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import clsx from "clsx";
import Back from "./back";

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
  const [assets] = useAssets([require(`../../assets/logo.png`)]);
  const [logo, setLogo] = useState<string>("");
  const [isDownload, setIsDownload] = useState<boolean>(false);

  useEffect(() => {
    if (assets && assets.length > 0) {
      setIsDownload(assets[0].downloaded);

      if (isDownload) {
        setLogo(assets[0].uri);
      }
    }
  }, [logo, isDownload, assets]);

  return (
    <View className="mb-14 w-[100%]">
      {hasBackButton && <Back />}

      <View className="items-center">
        {logo ? (
          <Image
            source={{ uri: logo }}
            style={{ width: 102.3, height: 104.56 }}
            className="mb-2"
          />
        ) : (
          <View></View>
        )}

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
      </View>
    </View>
  );
}
