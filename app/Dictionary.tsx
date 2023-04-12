'use client'

import { useFuzzySearch, useTypeFilter } from './Filter'

export const WordTypes = ['noun', 'verb', 'adjective'] as const
export type WordType = typeof WordTypes[number]

export type Word = {
  word: string
  type: WordType // 'noun' | 'verb' | 'adjective'
  explanation: string
}

// Merriam-Webster Words of the Day from 2022-04-08 to 2022-04-12
const dictionary: Word[] = [
  {
    word: 'vicinity',
    type: 'noun',
    explanation:
      'Vicinity is often used as a synonym of neighborhood meaning "the area around or near a particular place." It can also mean "the quality or state of being near" or "an approximate amount, extent, or degree."',
  },
  {
    word: 'oracular',
    type: 'adjective',
    explanation:
      'Oracular can describe something that is used to forecast or divine, or that resembles or relates to something used for such purposes. Oracular can also describe a person who resembles an oracle—a person (such as a priestess of ancient Greece) through whom a deity is believed to speak.',
  },
  {
    word: 'foible',
    type: 'noun',
    explanation:
      "Foibles are minor flaws or shortcomings in character or behavior. In fencing, foible refers to the part of a sword's blade between the middle and point, which is considered the weakest part.",
  },
  {
    word: 'auspicious',
    type: 'adjective',
    explanation:
      'Something described as auspicious is full of promise, showing or suggesting that future success or good results are likely. Auspicious can also mean "attended by good fortune."',
  },
  {
    word: 'circumscribe',
    type: 'verb',
    explanation:
      'Circumscribe means "to limit the size or amount of something," or, in other words, "to constrict the range or activity of."',
  },
]

const Dictionary = () => {
  const [types] = useTypeFilter()
  const [fuzzy] = useFuzzySearch()

  let words = dictionary
  if (types.length) {
    words = words.filter((w) => types.includes(w.type))
  }
  if (fuzzy.length) {
    words = words.filter((w) => w.word.startsWith(fuzzy))
  }

  return (
    <ul>
      {words.map((word) => (
        <li key={word.word}>
          <span>{word.word}</span>
          <span>{word.type}</span>
          <span>{word.explanation}</span>
        </li>
      ))}
    </ul>
  )
}

export default Dictionary
