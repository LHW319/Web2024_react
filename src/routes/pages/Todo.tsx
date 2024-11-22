import Modal from '@/components/Modal'
import { useParams, useNavigate } from 'react-router-dom'
import { useFetchTodos, useUpdateTodo, useDeleteTodo } from '@/hooks/todo'
import type { Todo } from '@/hooks/todo'
import { useState, useEffect } from 'react'

export default function Todo() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [done, setDone] = useState(false)
  const { todoId } = useParams()
  const { mutateAsync: mutateForUpdateTodo, error } = useUpdateTodo() // mutateAsync : 비동기적으로 실행되는 mutate 함수
  const { mutateAsync: mutateForDeleteTodo } = useDeleteTodo()
  const { data: todos } = useFetchTodos() // 전체 todos 가져옴.(캐싱된 것)

  const todo = todos?.find(todo => todo.id === todoId) // todos가 없으면 todo는 undefined
  console.log(todo)
  useEffect(() => {
    setTitle(todo?.title || '')
    setDone(todo?.done || false)
  }, [todo, todoId])

  async function updateTodo() {
    console.log(title)
    if (!todo) return
    const _title = title.trim()
    if (!_title) return
    if (_title === todo.title && done === todo.done) return // 수정 전/후 의 title이 달라도 저장 X
    await mutateForUpdateTodo({
      ...todo,
      title: _title,
      done
    })
    if (error) {
      // 에러 처리
      alert('수정 실패!')
      return
    }
    console.log('수정 완료')
    cancelTodo()
  }

  function cancelTodo() {
    navigate(-1)
  }

  async function deleteTodo() {
    if (!todo) return
    await mutateForDeleteTodo(todo)
    cancelTodo()
  }

  // Modal에 로딩 추가 불필요. 서버에서 가져오는 데이터를 띄우는게 아니므로.
  return (
    <Modal>
      {todo && (
        <>
          <div>
            <input
              type="checkbox"
              checked={done}
              onChange={e => setDone(e.target.checked)}
            />
          </div>
          <div>
            <textarea
              style={{ width: '100%', padding: 10, boxSizing: 'border-box' }}
              value={title}
              rows={4}
              onChange={e => setTitle(e.target.value)}></textarea>
          </div>
          <div>{todo.createdAt}</div>
          <div>{todo.updatedAt}</div>
        </>
      )}
      <div>
        <button onClick={updateTodo}>저장</button>
        <button onClick={cancelTodo}>취소</button>
        <button onClick={deleteTodo}>삭제</button>
      </div>
    </Modal>
  )
}
