import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

// Tanstack 사용(useQuery)
export default function DelayedData() {
  const [time, setTime] = useState(1000) // 꺼내욜 데이터에 대해 전개 연산자(...rest 로 나머지 리턴값들 꺼내오는 것)  쓰지 말아라
  const { data, isStale } = useQuery({
    queryKey: ['delay', time], // 외부 변수 사용 시 queryKey에 추가해야 함(time).
    queryFn: async () =>
      (await fetch(`https://api.heropy.dev/v0/delay?t=${time}`)).json(), // 시간을 외부에서 받아서 쓰도록 수정
    staleTime: 1000 * 10 // 10초 후 상함. 즉, 10초 동안 신선함.
  })
  return (
    <>
      <div>데이터가 {isStale ? '상했어요..' : '신선해요!'}</div>
      <div>{JSON.stringify(data)}</div>
    </>
  )
}
