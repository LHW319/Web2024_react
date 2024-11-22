import { Link, NavLink, useNavigate } from 'react-router-dom'
import styles from './Header.module.css' // style라는 이름은 변경해도 됨.

const navigations = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/movies', label: 'Movies' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/delay', label: 'Delay' },
  { to: '/todos', label: 'Todos' }
]

export default function Header() {
  // Hook은 React 컴포넌트 내부에서 호출 필요
  const navigate = useNavigate()
  //   navigate(-1) : 뒤로 하나 이동
  //   navigate(1) : 앞으로 한번 이동

  function toSignIn() {
    navigate('/signin')
  }

  return (
    <header className={styles.header}>
      {/* a tag : 새로운 주소에 맞게 페이지를 새로고침 함. */}
      {/* <a href="/">Home</a>
      <a href="/about">About</a> */}

      {/* ================================================================================================== */}
      {/* 컴포넌트 방식의 탐색 - Link, NavLink, Navigate */}

      {/* 내 사이트 안에서 하위 주소만 변경되어 이동할 경우 => Link를 쓰면 새로고침 하지 않음. */}
      {/* 외부 사이트로의 이동은 a tag 사용 */}
      {/* <Link to="/">Home</Link>
      <Link to="/about">About</Link> */}

      {/* NavLink라는 컴포넌트 사용하여 페이지 이동 구현 */}
      {/* 현재 표시된 페이지의 버튼에 불이 들어옴.(active 라는 클래스가 붙게 됨.) */}
      {/* NavLink는 classNme 항목에 함수를 넣을 수 있다. */}
      {/* <NavLink to="/" className={(payload) => {
        return payload.isActive ? styles.active : ''   // Home 버튼이 활성화되면 payload.isActive가 true가 된다.
      }}>Home</NavLink> */}

      {/* 위 코드를 구조분해 할당 사용해서 아래처럼 축약 가능 */}
      {/* <NavLink
        to="/"
        className={({ isActive }) => (isActive ? styles.active : '')}>
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? styles.active : '')}>
        About
      </NavLink> */}

      {/* 같은 형식이 반복되므로, 배열 만들어서 활용 */}
      {navigations.map(nav => {
        return (
          <NavLink
            key={nav.to}
            to={nav.to}
            className={({ isActive }) => (isActive ? styles.active : '')}>
            {nav.label}
          </NavLink>
        )
      })}
      <button onClick={toSignIn}>로그인</button>
      {/* Navigate라는 컴포넌트는 활용도가 떨어짐. */}

      {/* ================================================================================================== */}
      {/* 프로그래밍 방식의 탐색 - navigate(), redirect() */}
      {/* ex) 로그인 버튼 만들고 클릭 시 로그인 로직 처리 후 프로그래밍 방식으로(navigate 함수) 페이지 이동 처리 */}
      {/* redirect는 react 컴포넌트가 아닌 곳에서(ex. ts 파일) 호출 가능 */}
    </header>
  )
}
