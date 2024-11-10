export default async function fetchOneBook(id: number) {
  const url = `https://onebite-books-server-main-amber-nine.vercel.app/book/${id}`
  const response = await fetch(url)
  try {
    if (!response.ok) new Error()
    return response.json()
  } catch (err) {
    console.log(err)
    return {}
  }
}
