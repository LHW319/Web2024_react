import { redirect } from 'react-router-dom'

// Request : 자바스크립트가 갖고 있는 클래스
// dashboard 페이지로 접근할때의 요청 정보가 request에 들어옴
export async function requiresAuth({ request }: { request: Request }) {
  console.log(request.url) // http://localhost:5173/dashboard
  const url = new URL(request.url)
  url.pathname // '/dashboard'
  url.search // 쿼리스트링
  const callbackUrl = url.pathname + url.search
  const token = localStorage.getItem('token')
  if (token) {
    // 실제로는 아래와 같은 방식으로 진행(서버에서 사용자 인증)
    // const res = await fetch('https://api.heropy.dev/v0/me', {
    //     headers:{
    //         Authorization: `Bearer ${token}`
    //     }
    // })
    // const user = await res.json() // 로그인한 사용자(유효한 사용자)
    // if(user){
    //     // 통과
    //     return user  <- 이 데이터를 어떻게 사용??? => 리턴 받는 곳(dashboard)에서 useLoaderData로 꺼내서 사용.
    // loader 함수에서 반환하는 데이터는 useLoaderData로 꺼내서 쓸 수 있다.
    // }
    return true
  }
  // 토큰이 없거나 유효한 사용자가 아니면 거절! -> 로그인 페이지로 이동
  // callbackUrl 에 내가 어디로 돌아가야 하는지에 대한 정보 기입
  // 처음부터 로그인 버튼 누른거면 callbackUrl이 비어있게 됨.
  return redirect(`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`)
}
