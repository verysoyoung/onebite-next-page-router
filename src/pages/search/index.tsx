import SearchableLayout from '@/components/searchable-layout'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

export default function Search() {
  const router = useRouter()
  const { q } = router.query
  return <h1>Search : {q}</h1>
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
