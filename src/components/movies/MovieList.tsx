import { Link } from 'react-router-dom'
// import { useMovieStore } from '@/stores/movie'
import { useMovies } from '@/hooks/movie'
import Loader from '../Loader'

export default function MovieList() {
  // useQuery 사용
  const { data: movies, isLoading, isFetching } = useMovies() // 캐싱된 데이터를 가져옴.
  // isLoading : 최초에 데이터 가져올때 한번만  true => 언제 써? ex) 처음 접속 시 이미 저장되어 있는 목록을 보여줘야할 때
  // isFetching : 서버에서 데이터 가져오는 중에 true

  // store 사용
  // const movies = useMovieStore(state => state.movies)

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <ul>
          {movies?.map(movie => (
            <li key={movie.imdbID}>
              <Link to={`/movies/${movie.imdbID}`}>
                {movie.Title} ({movie.Year})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
