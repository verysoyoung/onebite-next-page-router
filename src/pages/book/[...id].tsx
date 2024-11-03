import { useRouter } from 'next/router'
export default function BookPage() {
  const router = useRouter()
  const { id } = router.query
  return <div>Book : {id}</div>
}
