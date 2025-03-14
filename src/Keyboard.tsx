
import { Key } from "react"
import styles from "./Keyboard.module.css"

const KEYS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ]

type KeyboardProps = {
    activeLetters: string[],
    inactiveLetters: string[],
    addGuessedLetter: (letter: string) => void
    disabled?: boolean
}

export default function Keyboard({
    activeLetters,
    inactiveLetters, 
    disabled = false,
    addGuessedLetter
  }: KeyboardProps){
    return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
            gap: ".5rem",
          }}
        >
            {KEYS.map(key => {
                const isActive = activeLetters.includes(key)
                const isInactive = inactiveLetters.includes(key)
                return <button 
                          key={key}
                          className={`${styles.btn} ${isActive ? styles.active : ""} ${isInactive ? styles.inactive : ""}`}
                          onClick={() => addGuessedLetter(key)}
                          disabled={isActive || isInactive || disabled}
                        >
                            {key}
                        </button>
            })}
        </div>
    )
}