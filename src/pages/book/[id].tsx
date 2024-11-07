import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import style from './[id].module.css'
import fetchOneBook from '@/lib/fetch-one-book'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params!.id
  const data = await fetchOneBook(Number(id))
  return {
    props: { data },
  }
}

export default function BookPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const router = useRouter()
  // const { id } = router.query
  console.log(data)
  const { title, subTitle, description, author, publisher, coverImgUrl } = data
  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  )
}
