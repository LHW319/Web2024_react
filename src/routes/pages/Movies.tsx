// import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
// import { useMovieStore } from '@/stores/movie'
import SearchBar from '@/components/movies/SearchBar'
import MovieList from '@/components/movies/MovieList'

// interface Movie {
//   // 서버에서 받아온 데이터를 type으로 변환해주는 사이트(https://transform.tools/json-to-typescript) 활용해서 작성
//   Title: string
//   Year: string
//   imdbID: string
//   Type: string
//   Poster: string
// }

// movie.d.ts 파일 만들어서 interface 를 별도로 뺄 수도 있다.
// movie를 다른 곳에서도 쓴다면 별도로 빼서 관리...

export default function MoviesPage() {
  // 반응형 데이터가 바뀌면 화면도 바뀐다.
  // searchText : 검색어
  // store 사용하면 아래 내용 필요 없음.
  // const [searchText, setSearchText] = useState('')

  // const [movies, setMovies] = useState([])  // never[] => moview가 never type으로 초기화됨. -> never type 배열에는 아이템을 넣을 수 없다!!
  // movies : 검색된 영화 리스트
  // store 사용하면 아래 내용 필요 없음.
  // const [movies, setMovies] = useState<Movie[]>([])

  // store 사용하면 아래 내용 필요 없음.
  // async function fetchMovies() {
  //   const res = await fetch(
  //     `https://omdbapi.com/?apikey=7035c60c&s=${searchText}`
  //   )
  //   const { Search } = await res.json()
  //   setMovies(Search) // movies에 api로 받아온 데이터 들어감.
  // }

  // 모듈화 하면서 각 모듈로 이동됨.
  // const searchText = useMovieStore(state => state.searchText)
  // const movies = useMovieStore(state => state.movies)
  // const setSearchText = useMovieStore(state => state.setSearchText)
  // const fetchMovies = useMovieStore(state => state.fetchMovies)

  // 아래 처럼 한꺼번에 가져올 경우, 가져올 경우, movies가 필요없어서 안져왔어도 이미 state에 store 내 상태가 다 있으므로,
  // movies 상태의 값이 변경될 경우, Moview 페이지에서 movies를 사용하지 않음에도 불구하고 페이지가 re-redering 됨.
  // 따라서 필요한것만 따로 따로 가져와야 한다!!
  // const {searchText, setSearchText, fetchMovies} = useMovieStore(state  => state)
  return (
    <>
      <h1>Movies Page!</h1>

      {/* 모듈화 - /component/movies/SearchBar.tsx */}
      {/* <input
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        // onKeyDown={e => {
        //     if(e.key == 'Enter'){
        //         fetchMovies()
        //     }
        // }}
        onKeyDown={e => e.key === 'Enter' && fetchMovies()}
      />
      <button onClick={fetchMovies}>검색</button> */}
      <SearchBar />

      {/* 모듈화 - /components/movies/MovieList.tsx */}
      {/* <ul>
        {movies.map(movie => (
          <li key={movie.imdbID}>
            <Link to={`/movies/${movie.imdbID}`}>{movie.Title}</Link>
          </li>
        ))}
      </ul> */}
      <MovieList />

      {/* 자식 컴포넌트 출력 위치 결정 */}
      <Outlet />
    </>
  )
}

// 원시형 데이터 타입 : 타입 추론 가능(변수 선언할 때 타입 명시하지 않아도 타입 추론에 의해 에러 발생하지 않음.)
//// 문자, 숫자, boolean, null, undefined, symbol, BigInt

// 참조형 데이터 타입(변수 선언할 때 타입 명시 필요. ex. 타입 명시하지 않고 빈 배열로 선언하면, 빈 배열이 뭘 참조하는지 알 수 없다...)
//// 배열, 객체, 함수
