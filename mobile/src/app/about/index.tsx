import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";
import { Text, View, ScrollView } from "react-native";

export default function About() {
  return (
    <View className="w-[100%] flex-1 px-6">
      <Header
        title={[
          { text: "A", isHilighte: true, hasBreakLine: false },
          { text: "bout", isHilighte: false, hasBreakLine: false },
        ]}
        hasBackButton={true}
      />

      <ScrollView className="pr-2">
        <Text className="mb-4 text-xl text-highlight">
          Front-end Sorcerer and UI/UX Enchantress:{" "}
          <Text className="ml-5 text-xl text-primary">
            Edson Camargo Menezes.
          </Text>
        </Text>

        <Text className="mb-4 text-xl text-highlight">
          Academic Wizardry:{" "}
          <Text className="ml-5 text-xl text-primary">
            Holds a Bachelor's degree in Information Systems from Senac and a
            Postgraduate Degree in Cross-Platform Mobile Application Projects.
          </Text>
        </Text>

        <Text className="mb-4 text-xl text-highlight">
          Development Spellbook:{" "}
          <Text className="ml-5 text-xl text-primary">React Native.</Text>
        </Text>

        <Text className="mb-4 text-xl text-highlight">
          API Incantation:{" "}
          <Text className="ml-5 text-xl text-primary">
            Crafted with magical prowess through a Node.js API, harnessing the
            power of Amazon S3 for image storage and a database to safeguard the
            mystical character information.
          </Text>
        </Text>

        <Text className="mb-4 text-xl text-highlight">
          Inspired by the Wizarding World:{" "}
          <Text className="ml-5 text-xl text-primary">
            Immersed in the captivating universe of Harry Potter by J.K.
            Rowling.
          </Text>
        </Text>

        <Text className="mb-4 text-xl text-highlight">
          Special Incantations:{" "}
          <Text className="ml-5 text-xl text-primary">
            Extending heartfelt credits to the creators and authors of Harry
            Potter: J.K. Rowling, the film studios, and all those enchanted
            beings involved in conjuring the characters and the magical world of
            Harry Potter.
          </Text>
        </Text>

        <Footer />
      </ScrollView>
    </View>
  );
}
