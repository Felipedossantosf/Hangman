import { KeyboardEvent, useCallback, useEffect, useState } from "react";
import words from "./wordsList.json";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";

function App() {  
  const [wordToGuess, setWordToGuess] = useState<string>(() => {
    return words[Math.floor(Math.random() * words.length)];
  })

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter));

  const addGuessedletter = useCallback((letter: string) => {
    if(guessedLetters.includes(letter) || isLoser || isWinner) return

    setGuessedLetters((guessedLetters) => [...guessedLetters, letter])
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedletter(key)
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",                
        fontFamily: "sans-serif",
        maxWidth: "800px",
        gap: "2rem",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          fontSize: "2rem",
          textAlign: "center"
        }}
      >
        {isWinner && "You win!, Refresh to try again"}
        {isLoser && "You lose!, Refresh to try again"} 
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess}/>
      <div
        style={{
          alignSelf: "stretch"
        }}
      >
        <Keyboard 
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedletter}
        />
      </div>
    </div>
  )
}

export default App
