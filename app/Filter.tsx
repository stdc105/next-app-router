'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { WordType } from './Dictionary'

const useSearchParam = (name: string) => {
  const router = useRouter()
  const path = usePathname()
  const searchParams = useSearchParams()
  const value = searchParams.get(name)
  const setSearchParam = (newValue: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams)
    if (newValue !== null) {
      newSearchParams.set(name, newValue)
    } else {
      newSearchParams.delete(name)
    }
    const newUrl = `${path}?${newSearchParams.toString()}`
    router.replace(newUrl)
  }
  return [value, setSearchParam] as const
}

const useTypeFilter = () => {
  const [search, setSearch] = useSearchParam('type')
  let types = [] as WordType[]
  if (search) {
    types = search.split(',') as WordType[]
  }

  const toggleWordType = (wordType: WordType) => {
    let newTypes
    if (types.includes(wordType)) {
      newTypes = types.filter((t) => t !== wordType)
    } else {
      newTypes = [...types, wordType]
    }

    setSearch(newTypes.join(','))
  }

  return [types, toggleWordType] as const
}

const useFuzzySearch = () => {
  const [search, setSearch] = useSearchParam('fuzzy')
  const setFuzzySearch = (value: string) => setSearch(value || null)
  return [search ?? '', setFuzzySearch] as const
}

const Filter = () => {
  const [types, toggleWordType] = useTypeFilter()
  const [fuzzySearch, setFuzzySearch] = useFuzzySearch()

  return (
    <div className="filters">
      <label>
        <input
          type="checkbox"
          onChange={() => toggleWordType('noun')}
          checked={types.includes('noun')}
        />
        <span>noun</span>
      </label>
      <label>
        <input
          type="checkbox"
          onChange={() => toggleWordType('verb')}
          checked={types.includes('verb')}
        />
        <span>verb</span>
      </label>
      <label>
        <input
          type="checkbox"
          onChange={() => toggleWordType('adjective')}
          checked={types.includes('adjective')}
        />
        <span>adjective</span>
      </label>
      <input
        type="input"
        value={fuzzySearch}
        placeholder="Fuzzy Search"
        onChange={(e) => setFuzzySearch(e.target.value)}
        autoFocus={true} // I know this is a hack to make it not lose focus
      />
    </div>
  )
}

export default Filter
export { useTypeFilter, useFuzzySearch }
