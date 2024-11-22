import { motion, AnimatePresence } from 'framer-motion'
// AnimatePresence : animation 적용해야 하는 대상이 2개 이상일 시 사용

export default function AboutPage() {
  return (
    <>
      <h1>About Page!</h1>

      {/* 애니메이션 적용 대상이 1개일 때 */}
      <motion.div
        initial={{ width: '100px', backgroundColor: '#f00' }}
        animate={{ width: '200px', backgroundColor: '#0f0' }}
        transition={{ duration: 1, delay: 1 }}>
        <div style={{ height: '100px' }}></div>
      </motion.div>

      {/* 애니메이션 적용 대상이 2개 이상일 떄 */}
      {/* <AnimatePresence>
        <motion.div
          initial={{ width: '100px', backgroundColor: 'red' }}
          animate={{ width: '200px', backgroundColor: 'royalblue' }}
          exit={{}} // 사라져야 하는 대상은 어떻게 사라지는 지에 대한 설정 추가 필요
          transition={{ duration: 1, delay: 1 }}>
          <div
            style={{ height: '100px' }}
            className="show"></div>
          <div
            style={{ height: '100px' }}
            className="hide"></div>
        </motion.div>
      </AnimatePresence> */}
    </>
  )
}
