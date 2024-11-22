import { useFetchTodos, useCreateTodo, useTodoFilterStore } from '@/hooks/todo'
import Loader from '@/components/Loader'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function TodosPage() {
  const { data: todos, isLoading } = useFetchTodos()
  const { mutate } = useCreateTodo()
  const [title, setTitle] = useState('')

  const setFilterStatus = useTodoFilterStore(state => state.setFilterStatus)

  // button을 통해 실행될때는 event가 들어오지 않음.
  function createTodo(event?: React.KeyboardEvent<HTMLInputElement>) {
    // 한글의 경우, 입력중이면 mutate가 실행되지 않게 처리
    if (event?.nativeEvent.isComposing) return
    mutate(title) // mutationFn 실행됨. mutationFn의 인자값으로 title이 넘어감.
  }

  return (
    <>
      <h1>Todos!</h1>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && createTodo(e)}
      />
      <button onClick={() => createTodo()}>추가</button>

      <div>
        <button onClick={() => setFilterStatus('all')}>전체</button>
        <button onClick={() => setFilterStatus('todo')}>할 일</button>
        <button onClick={() => setFilterStatus('done')}>완료</button>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <ul>
          {todos?.map(todo => {
            return (
              <li key={todo.id}>
                <Link to={`/todos/${todo.id}`}>
                  ({todo.done ? 'v' : ' '}) {todo.title}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
      <Outlet />
    </>
  )
}
