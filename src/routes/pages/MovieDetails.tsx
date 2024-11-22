import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Modal from '@/components/Modal'
import { useMovieStore } from '@/stores/movie'
import Loader from '@/components/Loader'

// store로 이동
// export interface MovieDetails {
//   Title: string
//   Year: string
//   Rated: string
//   Released: string
//   Runtime: string
//   Genre: string
//   Director: string
//   Writer: string
//   Actors: string
//   Plot: string
//   Language: string
//   Country: string
//   Awards: string
//   Poster: string
//   Ratings: Rating[]
//   Metascore: string
//   imdbRating: string
//   imdbVotes: string
//   imdbID: string
//   Type: string
//   DVD: string
//   BoxOffice: string
//   Production: string
//   Website: string
//   Response: string
// }
// export interface Rating {
//   Source: string
//   Value: string
// }

export default function MovieDetailsPage() {
  const { movieId } = useParams() // 주소 부분의 movieId 값 가져온다.
  // const [GETTER, SETTER] = useState(초기값)

  const movie = useMovieStore(state => state.currentMovie)
  const isLoading = useMovieStore(state => state.isLoading)
  const fetchMovieDetails = useMovieStore(state => state.fetchMovieDetails)

  // movie 데이터를 store로 이동
  // const [movie, setMovie] = useState<MovieDetails | null>(null)
  // 유니언 타입 : movie는 null 일수도 있고, 서버에서 데이터를 가져오면 MovieDetails 타입이 될 수도 있어.
  // MovieDetails 항목 하나하나 다 초기값 정해주기에는 너무 많으므로 위처럼 유니턴 타입 사용해서 null로 초기화.

  // useEffect(실행할 함수, 의존성배열) - 의존하는 데이터가 변경되었을 때 함수가 실행될 수 있게 함.
  //                                    의존하는 데이터를 설정해주지 않으면 컴포넌트 생성 시 최초 한번 실행됨.
  //   useEffect(() => {
  //     // fetchMovieDetails 함수가 MovieDetailsPage 컴포넌트 생성 시 최초 한번 실행될 수 있게 함.
  //     fetchMovieDetails() // useEffect를 사용하지 않으면 무한 루프 걸림...
  //   }, [])

  useEffect(() => {
    if (!movieId) return // 타입 가드 (movieId가 undefined일 경우 걸러지도록)
    fetchMovieDetails(movieId) // 영화 id 변경되면 정보 새로 가져와서 데이터 변경되도록 함.
  }, [movieId])

  // store로 이동
  // async function fetchMovieDetails() {
  //   // 해당 컴포넌트가 생성될 때 최초 한번 실행됨. -> 해당 컴포넌트가 다시 로드되지 않는 이상 내부 정보가 변경되지 않음.
  //   const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&i=${movieId}`)
  //   const movie = await res.json()
  //   setMovie(movie)
  // }

  return (
    <Modal loading={isLoading}>
      <h1>Movie Details Page!</h1>
      <h2>{movieId}</h2>
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
      <>
        {movie && (
          <>
            <h2>{movie.Title}</h2>
            <img
              src={movie.Poster}
              alt={movie.Title}
            />
            <p>{movie.Director}</p>
            <p>{movie.Plot}</p>
          </>
        )}
      </>
      {/* )} */}
    </Modal>
  )
}
