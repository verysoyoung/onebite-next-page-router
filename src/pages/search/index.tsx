import SearchableLayout from '@/components/searchable-layout'
import { ReactNode, useEffect, useState } from 'react'
import BookItem from '@/components/book-item'
import fetchBooks from '@/lib/fetch-books'
import { useRouter } from 'next/router'
import { BookData } from '@/types'
import Head from 'next/head'

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const q = context.
//   const searchBooks = await fetchBooks(q as string)

//   return {
//     props: { searchBooks },
//   }
// }

export default function Search() {
  const [books, setBooks] = useState<BookData[]>([])
  const router = useRouter()
  const q = router.query.q
  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string)
    setBooks(data)
  }
  useEffect(() => {
    if (q) {
      fetchSearchResult()
    }
  }, [q])
  return (
    <div>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="검색" />
        <meta property="og:description" content="한입북스 도서 검색페이지" />
      </Head>
      {books.map(book => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  )
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
