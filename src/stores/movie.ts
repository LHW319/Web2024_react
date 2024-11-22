import { create } from 'zustand'
import { combine } from 'zustand/middleware' // create 내 타입 지정을 용이하게 해주는 미들웨어

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}
export interface MovieDetails {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}
export interface Rating {
  Source: string
  Value: string
}

// combine 사용
// combine(상태, 액션)
export const useMovieStore = create(
  combine(
    {
      inputText: '',
      searchText: '', // 타입 추론 가능하므로 타입 선언 불필요(타입 추론 가능한 경우는 초기값만 넣어주면 됨.)
      // movies: [], // 타입 추론 불가하므로 아래처럼 지정 필요
      movies: [] as Movie[], // 타입 단언
      // currentMovie: null, // 타입 추론 불가하므로 아래처럼 지정 필요
      currentMovie: null as null | MovieDetails,
      isLoading: false // 타입 추론 가능하므로 타입 선언 불필요
    },
    (set, get) => {
      return {
        // 인자의 타입 명시 필요
        setInputText: (text: string) => {
          set({
            inputText: text
          })
        },
        setSearchText: (text: string) => {
          set({
            searchText: text
          })
        },
        fetchMovies: async () => {
          const { searchText } = get() // 내부의 다른 상태값을 가져오는 것.
          const res = await fetch(
            `https://omdbapi.com/?apikey=7035c60c&s=${searchText}`
          )
          const { Search } = await res.json()
          set({
            movies: Search
          })
        },

        // 인자의 타입 명시 필요
        // 타입을 지정하는 행위 => 타이핑
        fetchMovieDetails: async (movieId: string) => {
          set({
            isLoading: true
          })
          const res = await fetch(
            `https://omdbapi.com/?apikey=7035c60c&i=${movieId}`
          )
          const data = await res.json()
          set({
            currentMovie: data,
            isLoading: false
          })
        }
      }
    }
  )
)

// create<상태와 액션의 타입>
// export const useMovieStore = create<{
//   searchText: string
//   movies: Movie[]
//   currentMovie: MovieDetails | null // null로 초기화하므로 유니온 타입 지정,
//   isLoading: boolean
//   setSearchText: (text: string) => void // setSarchText에 return이 없으므로
//   fetchMovies: () => Promise<void>
//   fetchMovieDetails: (movieId: string) => Promise<void>
// }>((set, get) => {
//   // set: 상태 지정 함수, get: 상태 가져오는 함수

//   // state 객체를 리턴 : 상태, 액션 등등 정의
//   return {
//     searchText: '', // 상태
//     movies: [], // 상태
//     currentMovie: null,
//     isLoading: false,

//     // 객체 데이터 내의 속성에 함수 데이터가 들어있으면? => 메소드, store에서는 "액션" 으로 지칭
//     setSearchText: text => {
//       // 액션
//       // searchText = text
//       set({
//         searchText: text
//       })
//     },
//     fetchMovies: async () => {
//       const { searchText } = get() // 내부의 다른 상태값을 가져오는 것.
//       const res = await fetch(
//         `https://omdbapi.com/?apikey=7035c60c&s=${searchText}`
//       )
//       const { Search } = await res.json()
//       set({
//         movies: Search
//       })
//     },
//     fetchMovieDetails: async movieId => {
//       set({
//         isLoading: true
//       })

//       //   await new Promise(resolve => setTimeout(resolve, 3000)) // 테스트 하기 위해 3초 delay 줌.

//       const res = await fetch(
//         `https://omdbapi.com/?apikey=7035c60c&i=${movieId}`
//       )
//       const data = await res.json()
//       set({
//         currentMovie: data,
//         isLoading: false
//       })
//     }
//   }
// })
