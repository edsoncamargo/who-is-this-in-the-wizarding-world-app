import { ScrollView, Text, View } from "react-native";
import Header from "../../components/header";
import { Accordion } from "../../components/accordion";
import { useState } from "react";

export default function HowToPlay() {
  const accordions = [
    {
      title: "Game Objective",
      content: (
        <Text>
          <Text className="text-highlight">•</Text> Successfully identify as
          many characters as possible while maintaining a maximum of 3 lives.
          Players aim to achieve a high score by correctly guessing characters,
          avoiding the loss of all three lives.
        </Text>
      ),
    },
    {
      title: "Rounds",
      content: (
        <Text>
          <Text className="text-highlight">•</Text> Each round will feature a
          random photo of a character from the Harry Potter universe (human,
          wizard, or creature).
        </Text>
      ),
    },
    {
      title: "Answer Options",
      content: (
        <Text>
          <Text className="text-highlight">•</Text> Four answer options will be
          displayed, each with the name of a related character.
          {"\n\n"}
          <Text className="text-highlight">•</Text> Only one of the options is
          the correct answer.
        </Text>
      ),
    },
    {
      title: "Lives",
      content: (
        <Text>
          <Text className="text-highlight">•</Text> The player starts with three
          lives, represented by magical wands.
          {"\n\n"}
          <Text className="text-highlight">•</Text> Each incorrect answer or
          failure to respond in time results in the loss of a life.
          {"\n\n"}
          <Text className="text-highlight">•</Text> Additionally, the player has
          the opportunity to recover a life by successfully identifying five
          characters in a row. This encourages a streak of correct answers,
          rewarding the player with an extra life for their proficiency.
          {"\n\n"}
          <Text className="text-highlight">•</Text> However, the player cannot
          exceed a maximum of three lives.
        </Text>
      ),
    },
    {
      title: "Timer",
      content: (
        <Text>
          <Text className="text-highlight">•</Text> A 10-second timer will be
          displayed for each question.
          {"\n\n"}
          <Text className="text-highlight">•</Text> If time runs out before
          answering, a life will be lost.
          {"\n\n"}
          <Text className="text-highlight">•</Text> The timer resets for each
          new question.
        </Text>
      ),
    },
    {
      title: "Levels",
      content: (
        <Text>
          <Text className="text-highlight">•</Text> The number of characters to
          be guessed is determined by the current level.
          {"\n\n"}
          <Text className="text-highlight">•</Text> The game starts at level 1
          with 10 characters and advances to level 10, adding 10 characters with
          each level.
          {"\n\n"}
          <Text className="text-highlight">•</Text> There is no automatic
          progression between levels.{"\n\n"}
          <Text className="text-highlight">•</Text> The levels represent the
          journey from a Hogwarts Freshman to a Master of Magic:
          {"\n"}
          <Text className="text-highlight">-</Text> Level 1: Hogwarts Freshman
          {"\n"}- Level 2: 1st Year Student
          {"\n"}
          <Text className="text-highlight">-</Text> Level 3: 2nd Year Student
          {"\n"}- Level 4: 3rd Year Student
          {"\n"}
          <Text className="text-highlight">-</Text> Level 5: 4th Year Student
          {"\n"}- Level 6: 5th Year Student
          {"\n"}
          <Text className="text-highlight">-</Text> Level 7: 6th Year Student
          {"\n"}
          <Text className="text-highlight">-</Text> Level 8: 7th Year Student
          {"\n"}- Level 9: Hogwarts Graduate
          {"\n"}
          <Text className="text-highlight">-</Text> Level 10: Master of Magic
        </Text>
      ),
    },
    {
      title: "Victory",
      content: (
        <Text>
          <Text className="text-highlight">•</Text> The player wins the game by
          reaching the last question of the level without losing all three
          lives.
        </Text>
      ),
    },
    {
      title: "'Explorer Characters' Section",
      content: (
        <Text>
          <Text className="text-highlight">•</Text> Allows players to search and
          filter characters for training before playing the quiz.
        </Text>
      ),
    },
  ];

  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(
    null
  );

  const handleAccordionPress = (index: number) => {
    setOpenAccordionIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <View className="w-full flex-1 px-6">
      <Header
        title={[
          {
            text: "How to",
            isHilighte: false,
            hasBreakLine: false,
            hasSpace: true,
          },
          {
            text: "Play",
            isHilighte: true,
          },
        ]}
        hasBackButton={true}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {accordions.map((accordion, index) => (
          <Accordion
            key={index}
            title={accordion.title}
            content={accordion.content}
            isOpen={index === openAccordionIndex}
            onPress={() => handleAccordionPress(index)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
