import { useNavigate } from 'react-router-dom'
import styles from './Modal.module.css'
import Loader from './Loader'
import clsx from 'clsx'

export default function Modal({
  children,
  loading
}: {
  children: React.ReactNode
  loading?: boolean // loading으로 값 넘기지 않으면 undefined 들어옴.
}) {
  const navigate = useNavigate()

  function offModal() {
    navigate(-1)
  }

  return (
    <div className={styles.modal}>
      <div
        className={styles.overlay}
        onClick={() => offModal()}></div>
      {/* <div className={styles.content}>{loading ? <Loader /> : children}</div> */}
      <div
        // className={`${styles.content} ${loading ? styles.content_loading : ''}`}>
        // clsx 활용하여 클래스 정의
        className={clsx(
          styles.content,
          loading ? styles.content_loading : false
        )}>
        {loading ? <Loader /> : children}
      </div>
    </div>
  )
}
