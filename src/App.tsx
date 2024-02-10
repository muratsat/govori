import "./App.css";
import SpeechTrainer from "./components/speech-trainer";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="flex flex-col min-h-screen">
        <main className="w-full  flex flex-col items-center p-5 justify-center flex-1 flex-grow-[1]">
          <SpeechTrainer />
        </main>
        <footer className="flex items center justify-center p-4">
          <p className="text-muted-foreground">
            coded by{" "}
            <a className="underline" href="https://github.com/muratsat">
              Murat
            </a>
          </p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
