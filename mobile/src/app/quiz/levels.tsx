import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Header from "../../components/header";
import { MotiView } from "moti";

export default function Levels() {
  const router = useRouter();

  const levels = [
    { n: 1, name: "Hogwarts Freshman" },
    { n: 2, name: "1st Year Student" },
    { n: 3, name: "2nd Year Student" },
    { n: 4, name: "3nd Year Student" },
    { n: 5, name: "4nd Year Student" },
    { n: 6, name: "5nd Year Student" },
    { n: 7, name: "6nd Year Student" },
    { n: 8, name: "7nd Year Student" },
    { n: 9, name: "Hogwarts Graduate" },
    { n: 10, name: "Supreme Wizard" },
  ];

  function redirectTo(route: string, params: any) {
    router.push({ pathname: `/${route}`, params });
  }

  return (
    <View className="w-full flex-1 px-6">
      <Header
        title={[
          {
            text: "L",
            isHilighte: true,
            hasBreakLine: false,
            hasSpace: false,
          },
          {
            text: "evels",
            isHilighte: false,
          },
        ]}
        hasBackButton={true}
      />

      <ScrollView className="gap-y-4" showsVerticalScrollIndicator={false}>
        {levels.map((level, index) => (
          <MotiView
            key={index}
            from={{ opacity: 0, translateY: -30 }}
            animate={{ opacity: 1, translateY: 30 }}
            transition={{ type: "spring", delay: index * 50 }}
          >
            <TouchableOpacity
              className="align-center max-h-[84] min-h-[84] items-center justify-center rounded-2xl border-2 border-secondary px-4 transition-all"
              activeOpacity={0.7}
              onPress={() =>
                redirectTo("quiz/questions", { totalChars: level.n * 10 })
              }
            >
              <Text className="color-primary text-center font-regular text-xl transition-all">
                {level.name}
              </Text>
            </TouchableOpacity>
          </MotiView>
        ))}
      </ScrollView>
    </View>
  );
}
