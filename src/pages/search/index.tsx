import SearchableLayout from '@/components/searchable-layout'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import books from '@/mock/books.json'
import BookItem from '@/components/book-item'

export default function Search() {
  const router = useRouter()
  const { q } = router.query
  return (
    <div>
      {books.map(book => (
        <BookItem {...book} />
      ))}
    </div>
  )
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
