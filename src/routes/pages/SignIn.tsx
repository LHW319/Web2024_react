import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function SignInPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams() // 쿼리스트링(반응형 데이터) 처리

  // 쿼리스트링 동적 제어
  useEffect(() => {
    // 갱신 전 상태 : http://localhost:5173/signin
    // http://localhost:5173/signin?a=1&b=1 로 만들때
    // 1)
    searchParams.set('a', '1')
    searchParams.set('b', '1')
    // 주소가 변경되면 history에 내역이 쌓임.
    // setSearchParams(searchParams)
    // replace:true 지정해주면 history에 내역 쌓지 않고 넘어감.
    setSearchParams(searchParams, { replace: true })

    // 2)
    // setSearchParams({
    //     a:"1",
    //     b:'2'
    // },{replace:true})
  }, [])

  // FormEvent가 어디서 발생한 것인지(HTMLFormElement)를 명시
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    // html의 form에서 submit 이벤트 발생하면 새로고침 발생하는 것을 막는다.
    event.preventDefault()
    const formData = new FormData(event.currentTarget) // event.currentTarget : event가 걸려져있는 그 요소를 보장하는 속성
    // event.target은 Form 요소임이 보장되지 않음.

    const id = formData.get('id')
    const pw = formData.get('pw')
    console.log(id, pw)

    if (id && pw) {
      // 로그인 성공 -> callbackUrl 확인해서 있으면 해당 페이지로, 없으면 메인으로 보냄.
      localStorage.setItem('token', '1234adgkal')
      const callbackUrl = searchParams.get('callbackUrl') // <- 여기에 /dashboard만 들어있어야 한다.
      console.log(callbackUrl)
      navigate(callbackUrl || '/')
    }

    // 실제로는 서버로 id, pw 보내서 처리
    // fetch('https://api.heropy.dev/signin', {
    //  headers:{
    //      'X-Id': id as string,
    //      'X-Password': pw as string
    //  }
    //  })
    // const data = await res.json()
    // if(data.accessToken){    // 1. 서버 쿠키에 저장  2. 클라이언트에서 받아서 클라이언트에서 처리
    //      로그인 완료
    //      return;
    // }
    //  else    // 로그인 실패
  }

  return (
    <>
      <h1>Sign In Page!</h1>
      {/* html의 form에서 submit 이벤트 발생하면 새로고침 발생함. */}
      <form onSubmit={onSubmit}>
        <input
          name="id"
          placeholder="아이디를 입력하세요!"
        />
        <input
          name="pw"
          type="password"
          placeholder="비밀번호를 입력하세요!"
        />
        <button type="submit">로그인</button>
      </form>
    </>
  )
}
