import { useMovieStore } from '@/stores/movie'
// import type { Movie } from '@/stores/movie' // Movie라는 타입 가져옴.
// import { useMovies } from '@/hooks/movie'
// import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

export default function SearchBar() {
  // useQuery 사용
  // const { refetch } = useMovies() // refetch : 매번 새로운 데이터 가져와라
  const searchText = useMovieStore(state => state.searchText)
  const setSearchText = useMovieStore(state => state.setSearchText)
  const inputText = useMovieStore(state => state.inputText)
  const setInputText = useMovieStore(state => state.setInputText)
  const queryClient = useQueryClient()

  function fetchMovies() {
    setSearchText(inputText) // 검색할 때 searchText가 갱신되도록.

    queueMicrotask(() => {
      // 캐싱된게 있으면 그것을 전달. (refetch는 캐싱과 상관없이 무조건 새로 가져오므로, 캐싱된걸 가져오려면 fetchQuery 써야...)
      // 컴포넌트 내의 모든 useQuery 들을 실행 가능. -> 어떤 queryFn을 실행할지 queryKey를 통해 알려줌.
      // 옵션은 useQuery 선언 시 넣은 것과 맞춰줘야 함.(옵션을 모듈화해서 가져다가 쓸 수 있도록 하는 것도 가능)
      queryClient.fetchQuery({
        queryKey: ['movies', searchText],
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60 // 이 옵션을 useQuery 내 옵션과 맞췆춰야 함.
      })
    })
  }

  // zustand 사용
  // const fetchMovies = useMovieStore(state => state.fetchMovies)

  return (
    <>
      <input
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && fetchMovies()}
      />
      <button onClick={() => fetchMovies()}>검색</button>

      {/* tanstack useQuery 사용 */}
      {/* <input
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && fetchMovies()}
      />
      <button onClick={() => fetchMovies()}>검색</button> */}

      {/* Zustand 사용 */}
      {/* <input
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && fetchMovies()}
      />
      <button onClick={fetchMovies}>검색</button> */}
    </>
  )
}
