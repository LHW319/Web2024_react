import Header from '@/components/Header'
import {
  Outlet,
  useOutlet,
  ScrollRestoration,
  useLocation
} from 'react-router-dom' // 자식 페이지들이 header 밑에 출력되어야 한다고 위치 잡아주기 위한 라이브러리
import { AnimatePresence, motion } from 'framer-motion'

export default function DefaultLayout() {
  const loacatiion = useLocation()
  const outlet = useOutlet() // 반응형 데이터 -> 데이터가 변경되면 화면이 바뀐다.
  // 이름 없는 태그 : Fragment
  return (
    <>
      <Header />

      {/* 나의 자식 컴포넌트들이 여기에 붙을거다. */}
      {/* 애니메이션이 처리되어야 하는 대상 */}
      <AnimatePresence>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // absolute로 하면 주변 요소와의 상호작용을 고려하지 않음 -> 요소가 겹쳐져서 사라지고 나타나게 됨.
          // absolute로 하지 않으면 사라지는 요소가 완전히 사라질때까지 자리를 잡고 있다가, 사라지면 그 이후에 나타나는 요소가 자리를 찾아 들어감.
          exit={{ opacity: 0, position: 'absolute' }}
          transition={{ duration: 1 }}>
          {/* 정적인 값. 사라지는 페이지와 나타나는 페이지가 동시에 outlet에 들어가게 됨. -> 페이지 전환될 때 같은게 2개 보이게 됨 */}
          {/* <Outlet /> */}

          {/* 사라지는 것과 나타나는 것이 구분되어 보이게 됨. */}
          {outlet}
        </motion.div>
      </AnimatePresence>

      {/* 링크 눌러서 다른 컴포넌트 로딩 시 스크롤이 처음으로 돌아간다.(스크롤 복구) */}
      <ScrollRestoration />
    </>
  )
}
