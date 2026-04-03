import { useState, useEffect, useCallback } from 'react'

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%"

export default function useTextScramble(finalText: string, trigger: boolean) {
  const [displayText, setDisplayText] = useState('')
  const [revealed, setRevealed] = useState(0)

  const scramble = useCallback(() => {
    let result = ''
    for (let i = 0; i < finalText.length; i++) {
      if (i < revealed) {
        result += finalText[i]
      } else {
        result += CHARS[Math.floor(Math.random() * CHARS.length)]
      }
    }
    setDisplayText(result)
  }, [finalText, revealed])

  useEffect(() => {
    if (!trigger) return

    const interval = setInterval(() => {
      scramble()
      setRevealed(prev => Math.min(prev + 1, finalText.length))
    }, 50)

    return () => clearInterval(interval)
  }, [trigger, scramble, finalText.length])

  return displayText
}