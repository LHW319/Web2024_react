import {
  createBrowserRouter,
  RouterProvider,
  createHashRouter
} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import DefaultLayout from './layouts/Default'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import NotFound from './pages/NotFound'
import Dashboard from './pages/Dashboard'
import SignIn from './pages/SignIn'
import { requiresAuth } from './loaders/requiresAuth'
import Delay from './pages/Delay'
import Todos from './pages/Todos'
import Todo from './pages/Todo'

// 배열이므로 순서가 있다 -> 어떤 주소가 들어왔을 때 배열 내 원소 순서대로 비교
const router = createBrowserRouter([
  // BrowserRouter로 어떤 페이지들을 관리할지를 옵션으로 전달
  {
    // 중첩라우트(route 안에 children 속성으로 중첩해서 route 객체 추가)
    element: <DefaultLayout />, // 모든 페이지에서 DefaultLayout이 출력됨
    // loader:  requiresAuth, <- 최상위 페이지에 인증 제어를 넣으면 하위 페이지 접근할 때도 이 부분이 실행되므로, 일일이 페이지 마다 인증 넣을 필요 없이 전체 페이지에 대한 인증 수행 가능
    // 자식 페이지들
    // 부모의 어디에 출력될 것인지 명시해줘야 함. -> Outlet 사용
    children: [
      {
        path: '/',
        element: <Home /> // Home이라는 컴포넌트
      },
      {
        // http://localhost:5173/about -> 서버가 /about을 처리할 수 있는 구조를 제공해야 한다.(url직접 접근 시)
        //                                ex) vercel.json 설정
        // http://localhost:5173/#/about -> hash를 통해서 페이지 관리 => createHashRouter 사용
        //                                  서버에서 세팅할게 없다.
        path: '/about',
        element: <About /> // About이라는 컴포넌트
      },
      {
        path: '/movies',
        element: <Movies />,

        // /movies 페이지가 출력된 상태에서 MovieDetails를 자식으로 출력하겠다.
        children: [
          {
            path: '/movies/:movieId',
            element: <MovieDetails />
          }
        ]
      },
      // 별도 페이지로 띄우는 경우
      // {
      //   path: '/movies/:movieId', // 동적 세그먼트
      //   element: <MovieDetails />
      // }

      // 로그인한 사람만 진입 가능한 "보호되는 경로(protected route)"
      {
        path: '/dashboard',
        element: <Dashboard />,
        // /dashboard 접속 직전에 실행됨. 이 함수 실행이 끝나야 dashboard 페이지 접속됨.
        // 함수 내용 길어질 수 있으므로 모듈화해서 처리
        // 로그인 체크
        loader: requiresAuth

        // loader: async() => {
        //   const [user, isAdmin] = await Promise.all([requiresAuth(), checkAdmin()])
        //   if(user, isAdmin){
        //     return user <- 이 값을 userLoaderData 로 받을 수 있다!
        //   }
        // }
      },
      {
        path: '/signin',
        element: <SignIn />
      },
      {
        path: '/delay',
        element: <Delay />
      },
      {
        path: '/todos',
        element: <Todos />,
        children: [
          {
            path: '/todos/:todoId',
            element: <Todo />
          }
        ]
      }
    ]
  },
  // 404 처리 : 어떤 주소가 들어왔을 때 router 배열 내 원소 순서대로 비교하므로, 404 처리는 가장 마지막에 넣는다.
  {
    path: '*', // 모든 주소와 일치. 앞에서 일치하는 주소가 없을 경우 여기가 실행됨.
    element: <NotFound />
  }
])

// 함수 컴포넌트
export default function Router() {
  // router를 Props로 전달
  return <RouterProvider router={router} />
}
