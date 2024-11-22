import { useQuery } from '@tanstack/react-query'

// 캐싱하는 것은 컴포넌트를 왔다 갔다 하는 중에 유효.
// 페이지 새로고침 하면 새로 데이터 가져옴.
export default function DelayedData({ time }: { time: number }) {
  // data에는 queryFn의 반환값이 들어간다.
  const { data } = useQuery<{
    message: string
    time: string
  }>({
    // queryKey: ['delay'], // 고유한 값
    queryKey: ['delay', time], // 고유한 값
    queryFn: async () => {
      const res = await fetch(`https://api.heropy.dev/v0/delay?t=${time}`)
      return await res.json()
    },
    staleTime: 1000 * 60 // 데이터 캐싱하고 싶을 경우 명시 필요.(데이터 상하는데까지 걸리는 시간)
  })
  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

// CRUD 기준
// GET, POST, PUT(전체 수정), PATCH(일부 수정), DELETE

// 아래 셋 중 하나를 선택하는 기준
// useQuery : GET 사용 시 (받는 것에 초점)
// useInfiniteQuery

//----------------------

// useMutation : POST, PUT, PATCH, DELETE 사용 시 (보내는 것에 초점)
