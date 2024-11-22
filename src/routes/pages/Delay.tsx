// import { useQuery } from '@tanstack/react-query'
import DelayedData from '@/components/DelayedData'

export default function DelayPage() {
  // data에는 queryFn의 반환값이 들어간다.
  //   const { data } = useQuery({
  //     queryKey: ['delay'], // 고유한 값
  //     queryFn: async () => {
  //       const res = await fetch('https://api.heropy.dev/v0/delay?t=2000')
  //       return await res.json()
  //     }
  //   })
  return (
    <>
      <h1>DelayPage!</h1>
      <DelayedData time={1000} />
      {/*위와 같은 데이터가 출력됨 - 위 컴포넌트와 같은 key값을 가지므로*/}
      {/*DelayData 컴포넌트 내에서 queryKey에 time을 넣어주면 위와 다른 데이터가 나옴.*/}
      <DelayedData time={2000} />{' '}
      {/*위와 같은 데이터가 출력됨 - 위 컴포넌트와 같은 key값을 가지므로*/}
      {/*DelayData 컴포넌트 내에서 queryKey에 time을 넣어주면 위와 다른 데이터가 나옴.*/}
      <DelayedData time={5000} />{' '}
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
