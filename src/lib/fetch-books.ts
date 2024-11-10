import { BookData } from '@/types'

export default async function fetchBooks(q?: string): Promise<BookData[]> {
  let url = `https://onebite-books-server-main-amber-nine.vercel.app/5/book`
  if (q) url += `/search?q=${q}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error()
    }
    return await response.json()
  } catch (err) {
    console.log(err)
    return []
  }
}
