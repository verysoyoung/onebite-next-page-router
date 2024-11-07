import SearchableLayout from '@/components/searchable-layout'
import { ReactNode } from 'react'
import BookItem from '@/components/book-item'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import fetchBooks from '@/lib/fetch-books'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q
  const searchBooks = await fetchBooks(q as string)

  return {
    props: { searchBooks },
  }
}

export default function Search({
  searchBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      {searchBooks.map(book => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  )
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
