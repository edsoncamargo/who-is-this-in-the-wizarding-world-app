import { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";

import ChpService from "@/api/chp/chp.service";
import { useLocalSearchParams, useRouter } from "expo-router";
import { shuffleDeck } from "@/utils/shuffle-deck";
import Loading from "@/components/loading";
import { ImageQuiz } from "@/components/image-quiz";
import { TimerBar } from "@/components/timebar";
import Button from "@/components/button";
import { WandLives } from "@/components/wand-lives";

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
    let auxAnswers = [{ isCorrect: true, name: char.name }];

    while (auxAnswers.length < 4) {
      const charName =
        chars[Math.floor(Math.random() * Number(totalChars))].name;
      const hasName = auxAnswers.some(
        (answer: { isCorrect: boolean; name: string }) =>
          charName === answer.name
      );

      if (hasName === false) {
        auxAnswers.push({ isCorrect: false, name: charName });
      }
    }

    setAnswers(shuffleDeck(auxAnswers));
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
      <TimerBar
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
        <Button
          key={answer?.name + index}
          name={answer?.name}
          isCorrect={answer?.isCorrect}
          handleOnPress={sendAwnser}
          disabled={isGameOver() || isLoadingNextChar}
        ></Button>
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
    <View className="h-full w-full flex-1 flex-col items-center justify-between px-6">
      <View className="h-full w-full flex-1">
        {renderTimerBar()}

        <View className="relative flex flex-row justify-between">
          <View className="h-auto">
            <Text className="mt-8 text-3xl font-bold text-primary">
              <Text className="font-light">Character</Text>{" "}
              {currentQuestion <= Number(totalChars)
                ? currentQuestion
                : Number(totalChars)}{" "}
              of {totalChars}
            </Text>

            <WandLives wands={totalWands} ref={wandsRef} />
          </View>

          <View className="absolute right-0 bottom-0 mr-4 flex min-w-[60] -rotate-[30deg] flex-row items-center justify-center">
            {streak >= 2 && streakWands !== maxStreakWands ? (
              <>
                <Text className="text-3xl font-bold text-highlight">
                  {streak}
                </Text>
                <Text className="text-highlig text-xl text-highlight">x</Text>
              </>
            ) : (
              streakWands === maxStreakWands && (
                <Text className="text-highlig text-xl text-highlight">
                  STREAaaAK! 🪄
                </Text>
              )
            )}
          </View>
        </View>
      </View>

      {renderImage()}

      <View className="mt-10 flex-row flex-wrap justify-between">
        {renderButtons()}
      </View>
    </View>
  );
}
