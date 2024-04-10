import { Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";

import clsx from "clsx";

import Route from "@/@types/routes";

type MenuItemProps = {
  href: Route;
  text: string;
  index: number;
};

export default function MenuItem({ href, text, index }: MenuItemProps) {
  return (
    <Link href={href} asChild>
      <TouchableOpacity className="self-center pb-4">
        <Text className="mb-2 text-3xl font-bold text-primary">{text}</Text>
        <View
          className={clsx(
            "h-1 w-10 bg-highlight",
            index % 2 === 0 ? "self-start" : "self-end"
          )}
        ></View>
      </TouchableOpacity>
    </Link>
  );
}
