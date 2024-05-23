import { useEffect, useRef, useState } from "react";
import { View, Text, Modal } from "react-native";

import ChpService from "@/api/chp/chp.service";
import { useLocalSearchParams, useRouter } from "expo-router";
import { shuffleDeck } from "@/utils/shuffle-deck";
import { ImageQuiz } from "@/components/image-quiz";
import { WandLives } from "@/components/wand-lives";
import Button from "@/components/button";
import { Timerbar } from "@/components/timebar";
import { MotiView } from "moti";
import Loading from "@/components/loading";

export default function Questions() {
  let { totalChars = 0 } = useLocalSearchParams<{
    totalChars: string;
  }>();
  totalChars = typeof totalChars !== "string" ? 10 : totalChars;
  const router = useRouter();

  const timerBarRef = useRef<{
    handlePause: () => void;
    handleRestart: () => void;
  } | null>(null);
  const wandsRef = useRef<{
    removeWand: () => number;
    addWand: () => number;
  } | null>(null);
  const totalWands = 3;
  const maxStreakWands = 5;
  const chpService = new ChpService();

  const [chars, setChars] = useState<Array<any>>([]);
  const [currentChar, setCurrentChar] = useState<any>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [charactersThatOnceWere, setCharactersThatOnceWere] = useState<any[]>(
    []
  );
  const [answers, setAnswers] = useState<
    Array<{ isCorrect: boolean; name: string }>
  >([currentChar.name]);
  const [wandsBroken, setWandsBroken] = useState<number>(0);
  const [isLoadingChars, setIsLoadingChars] = useState<boolean>(false);
  const [isLoadingNextChar, setIsLoadingNextChar] = useState<boolean>(false);
  const [correct, setCorrect] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [streakWands, setStreakWands] = useState<number>(0);

  function getCurrentChar(chars: Array<any>) {
    setAnswers([]);

    if (chars && chars.length > 0 && currentQuestion <= Number(totalChars)) {
      let stop = false;

      while (stop === false) {
        const auxCurrentChar =
          chars[Math.floor(Math.random() * Number(totalChars))];
        const hasChar = charactersThatOnceWere.some(
          (char: { name: string }) => auxCurrentChar.name === char.name
        );

        if (hasChar === false) {
          stop = true;
          setCurrentChar(auxCurrentChar);
          setCharactersThatOnceWere([
            ...charactersThatOnceWere,
            auxCurrentChar,
          ]);
          getAnswers(auxCurrentChar, chars);
        }
      }
    }
  }

  function getAnswers(char: any, chars: Array<any>) {
    const maxAnswers = 4;
    const correctChar = { isCorrect: true, name: char.name };
    let newAnswerOptions = [correctChar];

    while (newAnswerOptions.length < maxAnswers) {
      const charName =
        chars[Math.floor(Math.random() * Number(totalChars))].name;

      const hasName = newAnswerOptions.some(
        (answer: { isCorrect: boolean; name: string }) =>
          charName === answer.name
      );

      const hasPreviousName = answers.some(
        (answer: { isCorrect: boolean; name: string }) =>
          charName === answer?.name
      );

      if (hasName === false && hasPreviousName === false) {
        newAnswerOptions.push({ isCorrect: false, name: charName });
      }
    }

    setAnswers(shuffleDeck(newAnswerOptions));
  }

  async function getShuffledChars() {
    setIsLoadingChars(true);
    const { data } = await chpService.getShuffledChars(Number(totalChars));
    setChars(data.chars);
    getCurrentChar(data.chars);
    setIsLoadingChars(false);
  }

  function renderImage() {
    if (isLoadingNextChar) return <Loading />;
    if (currentChar && currentChar.url) {
      return <ImageQuiz url={currentChar.url} />;
    }
  }

  function renderTimerBar() {
    return (
      <Timerbar
        handleEndTimer={handleEndTimer}
        onRestart={handleEndTimer}
        ref={timerBarRef}
      />
    );
  }

  function handleEndTimer() {
    timerBarRef.current!.handleRestart();
    setWandsBroken(wandsRef.current!.removeWand());

    if (isGameOver() === false) setCurrentQuestion(currentQuestion + 1);
  }

  function sendAwnser(_: any, isCorrect: boolean) {
    if (isCorrect) {
      if (currentQuestion <= Number(totalChars)) {
        setIsLoadingNextChar(true);
        timerBarRef.current!.handlePause();
        setCorrect((correct) => correct + 1);
        setStreak((streak) => streak + 1);
        setStreakWands((streak) => streak + 1);

        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1);
          timerBarRef.current!.handleRestart();
          setIsLoadingNextChar(false);
        }, 2000);
      }
    } else {
      setWandsBroken(wandsRef.current!.removeWand());
      setStreak(0);
      setStreakWands(0);
    }
  }

  function renderButtons() {
    return answers.map(
      (answer: { isCorrect: boolean; name: string }, index) => (
        <MotiView
          key={answer?.name + index}
          from={{ opacity: 0, translateY: -30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", delay: 200 + index * 50 }}
        >
          <Button
            name={answer?.name}
            isCorrect={answer?.isCorrect}
            hasPressed={false}
            handleOnPress={sendAwnser}
            disabled={isGameOver() || isLoadingNextChar}
          ></Button>
        </MotiView>
      )
    );
  }

  function isGameOver() {
    return wandsBroken >= totalWands;
  }

  useEffect(() => {
    getShuffledChars();
  }, []);

  useEffect(() => {}, [answers]);
  useEffect(() => {}, [isLoadingNextChar]);

  useEffect(() => {
    if (currentQuestion > 1) getCurrentChar(chars);
    handleGameWin();
  }, [currentQuestion]);

  function handleGameWin() {
    if (currentQuestion > Number(totalChars)) {
      timerBarRef.current!.handlePause();
      router.push({
        pathname: `quiz/feedback`,
        params: { totalChars, winner: true, correct, wrong: wandsBroken },
      });
    }
  }

  useEffect(() => {
    handleGameOver(timerBarRef, router, totalChars, correct, wandsBroken);
  }, [wandsBroken]);

  function handleGameOver(
    timerBarRef: any,
    router: any,
    totalChars: string | number,
    correct: number,
    wandsBroken: number
  ) {
    if (isGameOver()) {
      timerBarRef.current!.handlePause();

      setTimeout(() => {
        router.push({
          pathname: `quiz/feedback`,
          params: { totalChars, winner: false, correct, wrong: wandsBroken },
        });
      }, 2000);
    }
  }

  useEffect(() => {
    if (streak >= maxStreakWands) {
      setTimeout(() => {
        if (streakWands >= maxStreakWands) {
          setWandsBroken(wandsRef.current!.addWand());
          setStreakWands(0);
        }
      }, 1000);
    }
  }, [streakWands]);

  if (isLoadingChars) return <Loading />;

  return (
    <View className=" relative h-full w-full flex-1 flex-col items-center justify-between px-6">
      <View className="h-full w-full flex-1">
        <MotiView
          from={{ opacity: 0, translateY: -30 }}
          animate={{ opacity: 1, translateY: 30 }}
          transition={{ type: "spring", delay: 0 }}
        >
          {renderTimerBar()}
        </MotiView>

        <View className="relative flex flex-row justify-between">
          <View className="h-auto">
            <MotiView
              from={{ opacity: 0, translateY: -30 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "spring", delay: 50 }}
            >
              <Text className="mt-8 text-3xl font-bold text-primary">
                <Text className="font-light">Character</Text>{" "}
                {currentQuestion <= Number(totalChars)
                  ? currentQuestion
                  : Number(totalChars)}{" "}
                of {totalChars}
              </Text>
            </MotiView>

            <MotiView
              from={{ opacity: 0, translateY: -30 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "spring", delay: 100 }}
            >
              <WandLives wands={totalWands} ref={wandsRef} />
            </MotiView>
          </View>
        </View>
      </View>

      <MotiView
        className="relative h-full w-full flex-1"
        from={{ opacity: 0, translateY: -30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "spring", delay: 150 }}
      >
        <View className="relative z-10">
          <MotiView
            className="absolute -top-5 -right-16 h-7 w-full flex-1 flex-row items-center justify-center"
            from={{ opacity: 0, translateY: 30, scale: 0, rotateZ: "90deg" }}
            animate={{
              opacity: streak >= 2 && streakWands !== maxStreakWands ? 1 : 0,
              translateY:
                streak >= 2 && streakWands !== maxStreakWands ? 1 : 30,
              rotateZ:
                streak >= 2 && streakWands !== maxStreakWands
                  ? "0deg"
                  : "90deg",
              scale: streak >= 2 && streakWands !== maxStreakWands ? 1 : 0,
            }}
            transition={{ type: "spring" }}
          >
            <Text className="flex-1 text-center">
              <Text className="text-3xl font-bold text-highlight">
                {streak}
              </Text>
              <Text className=" text-xl text-highlight">x</Text>
            </Text>
          </MotiView>

          <MotiView
            className="absolute -top-5 -right-16 h-7 w-full flex-1 flex-row items-center justify-center"
            from={{ opacity: 0, translateY: 30, scale: 0, rotateZ: "90deg" }}
            animate={{
              opacity: streakWands === maxStreakWands ? 1 : 0,
              translateY: streakWands === maxStreakWands ? 1 : 30,
              rotateZ: streakWands === maxStreakWands ? "0deg" : "90deg",
              scale: streakWands === maxStreakWands ? 1.6 : 0,
            }}
            transition={{ type: "spring" }}
          >
            <Text className="text-center text-xl text-highlight">
              STREAaaAK! 🪄
            </Text>
          </MotiView>
        </View>

        {renderImage()}
      </MotiView>

      <View className="mt-10 mb-10 flex-row flex-wrap justify-between">
        {renderButtons()}
      </View>
    </View>
  );
}
