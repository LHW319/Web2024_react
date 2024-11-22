import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'

// useQueryClient : 다른 컴포넌트(main.tsx)에 있는 queryClient 객체 가져올 수 있게 해주는 hook

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

// 컴포넌트 분리 X, useQuery 사용

export default function MoviesPage() {
  // input 요소에 연결하기 위함.
  const [text, setText] = useState('')
  const [searchText, setSearchText] = useState('')
  const [isStart, setIsStart] = useState(false)

  const queryClient = useQueryClient()

  // useQuery가 반환하는 값이 영화 목록
  const { data: movies, refetch } = useQuery<Movie[]>({
    // refetch는 캐싱 여부에 상관 없이 무조건 항상 다시 가져온다. -> 같은 검색어를 입력해도 캐싱된걸 주는 것이 아니라 다시 가져온다.
    queryKey: ['movies', searchText], // searchText(검색어)가 queryKey에 있어야 'avengers'와 'joker'의 결과가 달라질 수 있다.
    queryFn: async () => {
      const res = await fetch(
        `https://omdbapi.com/?apikey=7035c60c&s=${searchText}`
      )
      const { Search } = await res.json()
      return Search // useQuery를 통해서 반환되는 데이터 중 "data" 속성
    },
    enabled: isStart, // 처음 페이지 진입 시에는  searchText가 비어있는 상태 -> queryFn이 실행되면 안됨.
    staleTime: 1000 * 60 * 5
  })

  function fetchMovies() {
    // 검색할 때 searchText가 갱신되도록.
    setSearchText(text)
    setIsStart(true)
    // 캐싱된게 있으면 그것을 전달.
    // 컴포넌트 내의 모든 useQuery 들을 실행 가능. -> 어떤 query를 실행할지 queryKey를 통해 알려줌.
    queueMicrotask(() => {
      queryClient.fetchQuery({
        queryKey: ['movies', text],
        staleTime: 1000 * 60 * 5 // 이 옵션을 useQuery 내 옵션과 맞췆춰야 함.
      })
    })
  }

  return (
    <>
      <h1>Movies Page!</h1>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && fetchMovies()}
      />
      <button onClick={() => fetchMovies()}>검색</button>

      <ul>
        {movies?.map(movie => (
          <li key={movie.imdbID}>
            <Link to={`/movies/${movie.imdbID}`}>{movie.Title}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  )
}
