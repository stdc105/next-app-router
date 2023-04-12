import Dictionary from './Dictionary'
import Filter from './Filter'

export default function Home() {
  return (
    <main>
      <p>
        Open devtools, switch to Network tab, and start using the filters and
        fuzzy search below.
      </p>
      <p>
        There should be requests made to Next.js server on every filter and
        fuzzy search change.
      </p>
      <Filter />
      <Dictionary />
    </main>
  )
}
