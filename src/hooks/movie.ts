import { useQuery, queryOptions } from '@tanstack/react-query'
import { useMovieStore } from '@/stores/movie'

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export function useMovies() {
  const searchText = useMovieStore(state => state.searchText)

  // return을 붙이면 아래처럼 useMovies 호출하는 부분에서 데이터를 반환받아 사용할 수 있게 된다.
  // useQuery가 반환하는 데이터(Search)의 타입을 지정해줘야 함.
  return useQuery<
    Movie[]
    //Error,  // queryFn에서 throw Error 수행됐을 시 에러가 여기로 넘어옴.
    //string[] /*select 옵션이 반환하는 데이터의 타입*/
  >({
    queryKey: ['movies', searchText], // 밖에서 가져오는 데이터는 queryKey에 명시되어야 한다!
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 4000)) // 테스트를 위한 지연 추가
      const res = await fetch(
        `https://omdbapi.com/?apikey=7035c60c&s=${searchText}`
      )
      const { Search } = await res.json()
      return Search // useQuery를 통해서 반환되는 데이터
    },
    enabled: !!searchText, // 처음에는 searchText가 비어있으므로 실행되지 않게 -> 검색어가 있을 때만 실행되도록
    staleTime: 1000 * 60 * 60, // gc time은 stateTime보다 길어야 함. 60분마다 새로운 데이터 가져오도록 설정
    gcTime: 1000 * 60 * 65,
    placeholderData: (previousData /* 이전에 사용된 데이터 */) => {
      // placeholderData가 없으면 다음 데이터 가져올 때 화면 깜빡이는 현상 생길 수 있다.
      // 대기 상태에서 출력될 임시 데이터
      // return [{
      //   imdbID:'123', Title:'Hello world!', Year:'1999', Poster:'', Type:''
      // }]
      return previousData
    }
    // 데이터 필터링 해주는 옵션
    // select: (movies /* queryFn이 반환하는 데이터*/) => {
    //   return movies.map(movie => movie.Year)
    //   // return movies.filter(movie => Number.parseInt(movie.Year, 10) > 2000 // 10진법 숫자로 변환
    //   // )
    // }
  })
}

//const {data} = useMovies('avengers')
