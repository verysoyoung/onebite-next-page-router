import SearchableLayout from '@/components/searchable-layout'
import style from './index.module.css'
import { ReactNode } from 'react'
import BookItem from '@/components/book-item'
import { InferGetStaticPropsType } from 'next'
import fetchBooks from '@/lib/fetch-books'
import fetchRandomBooks from '@/lib/fetch-random-books'

export const getStaticProps = async () => {
  // 컴포넌트보다 먼저 실행, 컴포넌트에 필요한 데이터 불러오는 함수
  // Promise.all() 동시에 병렬로 불러옴
  console.log('index page')
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ])

  return {
    //단 하나의 객체를 리턴 props 프로퍼티값을 넣어야함
    props: {
      allBooks,
      recoBooks,
    },
  }
}

export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {allBooks.map(book => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {recoBooks.map(book => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  )
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
