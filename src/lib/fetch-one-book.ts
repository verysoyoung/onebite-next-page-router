export default async function fetchOneBook(id: number) {
  const url = `http://localhost:12345/book/${id}`
  const response = await fetch(url)
  try {
    if (!response.ok) new Error()
    return response.json()
  } catch (err) {
    console.log(err)
    return {}
  }
}
