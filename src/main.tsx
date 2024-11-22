import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
import Router from '@/routes'
import './main.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// main.tsx : entry point(진입점)

// 최상위 컴포넌트에 정의(프로젝트 당 1개)
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  // StrictMode는 개발자 모드에서 사용하는 것. - 서버 api 호출 시 두번씩 호출될 수 있다.
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  </StrictMode>
)
