import { GetServerSidePropsContext, InferGetStaticPropsType } from 'next'
import style from './[id].module.css'
import fetchOneBook from '@/lib/fetch-one-book'
import { useRouter } from 'next/router'

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
    ],
    fallback: true,
    //false : 404 Not Found
    //'blocking' : 없을 경우 SSR 방식으로 실시간 사전렌더링
    //true : SSR + 데이터 없는 페이지,fallback 상태페이지, 로딩페이지(isFallback 프로퍼티 사용) 없을 경우 NotFound페이지로 넘길 수 있음,
  }
}

export const getStaticProps = async (context: GetServerSidePropsContext) => {
  const id = context.params!.id
  const data = await fetchOneBook(Number(id))
  if (!data) {
    return {
      notfound: true,
    }
  }
  return {
    props: { data },
  }
}

export default function BookPage({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  if (router.isFallback) return '로딩중입니다.'
  if (data.length === 0) return '문제가 발생했습니다.'

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
