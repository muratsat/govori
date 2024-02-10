import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { modes } from "./modes";
import { Separator } from "./ui/separator";

const loadSounds = () =>
  modes.map((sound) => {
    return { name: sound.name, audio: new Audio(sound.src) };
  });

export default function SpeechTrainer() {
  const [running, setRunning] = useState(false);
  const [currentMode, setCurrentMode] = useState("");

  const toggle = () => {
    setRunning((prev) => !prev);
  };

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    const sounds = loadSounds();

    const randomDurationMiliseconds = (
      minDurationMs: number,
      maxDurationMs: number
    ) =>
      Math.floor(
        Math.random() * (maxDurationMs - minDurationMs) + minDurationMs
      );

    let lastIndex = 0;
    const playRandom = () => {
      const randomIndex = () => Math.floor(Math.random() * sounds.length);
      let newIndex = randomIndex();
      while (newIndex === lastIndex) newIndex = randomIndex();
      lastIndex = newIndex;
      sounds[newIndex].audio.play();
      console.log(sounds[newIndex].audio.volume);
      setCurrentMode(() => sounds[newIndex].name);
    };

    const start = () => {
      setRunning(true);
      playRandom();
      intervalId = setInterval(() => {
        playRandom();
        // }, randomDurationMiliseconds(1000, 1001));
      }, randomDurationMiliseconds(4000, 6000));
    };

    const stop = () => {
      setRunning(false);
      clearInterval(intervalId);
    };

    running ? start() : stop();

    return () => clearInterval(intervalId);
  }, [running]);

  return (
    <Card className="w-full max-w-4xl h-full min-h-[40vh]">
      <CardHeader>
        <CardTitle className="bold text-3xl lg:text-4xl">
          Упражнение на скорость речи
        </CardTitle>
      </CardHeader>
      <CardContent className="md:text-xl min-h-72 flex flex-col gap-5">
        <p>
          Просто возьмите текст и читайте его: быстро, медленно, средней
          скорости, очень медленно и очень быстро.
        </p>
        <p>
          Нажмите кнопку, чтобы начать. После старта каждые несколько секунд
          будет озвучиваться новый темп чтения
        </p>
        {running && (
          <>
            <Separator />
            <h1 className="text-xl md:text-2xl">
              Текущая скорость: <b>{currentMode}</b>
            </h1>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="w-full max-w-sm text-2xl font-bold" onClick={toggle}>
          {running ? "Stop" : "Start"}
        </Button>
      </CardFooter>
    </Card>
  );
}
