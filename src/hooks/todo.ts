import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { create } from 'zustand'

export interface Todo {
  id: string // 할 일 ID
  order: number // 할 일 순서
  title: string // 할 일 제목
  done: boolean // 할 일 완료 여부
  createdAt: string // 할 일 생성일
  updatedAt: string // 할 일 수정일
}

type FilterStatus = 'all' | 'todo' | 'done'

export const useTodoFilterStore = create<{
  filterStatus: FilterStatus
  setFilterStatus: (filter: FilterStatus) => void
}>(set => {
  return {
    filterStatus: 'all',
    setFilterStatus: filter => {
      set({
        filterStatus: filter
      })
    }
  }
})

const headers = {
  'content-type': 'application/json',
  apikey: 'KDT8_bcAWVpD8',
  username: 'KDT8_LeeHeeWon'
}

// 데이터 조회용
export function useFetchTodos() {
  const filterStatus = useTodoFilterStore(state => state.filterStatus)
  return useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
        {
          method: 'GET',
          headers
        }
      )
      // 에러 처리 예시
      // if(!res.ok){
      //   redirect('/error')
      // }
      const data = await res.json()
      // if(!Array.isArray(data)){
      //   redirect('/error')
      // }
      return data
    },
    staleTime: 1000 * 60 * 5,

    // 서버에서 가져온 데이터를 필터링 해주는 옵션
    select: todos => {
      return todos.filter(todo => {
        switch (filterStatus) {
          case 'all':
            return true // 필터링 하지 않는다.
          case 'todo':
            return !todo.done
          case 'done':
            return todo.done
        }
      })
    }
  })
}

// todo 아이템 생성
export function useCreateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (title: string) => {
      const res = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            title // 사용자 입력 받은 데이터
          })
        }
      )
      const data = await res.json()
      console.log(data)
    },
    // 요청 출발하자마자 실행됨
    // mutationFn이 받는 매개변수를 동일하게 받을 수 있음.
    onMutate: title => {
      // 낙관적 업데이트 : 서버로 요청 출발할 때 추가하고자 하는 데이터를 화면 리스트에 바로 넣어버림. -> 서버에 문제 생겨서 실제 추가 못한 경우 다시 리스트에서 지워줘야 함.
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']) // 캐싱된 데이터만 가져옴.
      const newTodo = {
        id: Date.now().toString(), // unix 타임으로부터 현재 몇 ms 지났는가...unique 값 만들 수 있다. (임시 데이터)
        title: title,
        done: false,
        createdAt: '',
        updatedAt: '',
        order: 0
      }
      if (previousTodos) {
        // queryClient.setQueryData(쿼리키, 업데이트할 데이터)  // 캐싱된 데이터를 업데이트. 에러가 발생할 것을 대비해서 previesTodos 원본을 건드리지 않아야 함.
        queryClient.setQueryData(['todos'], [newTodo, ...previousTodos])
      }
      return previousTodos // onError에서 인자값으로 받을 수 있음.

      // 캐싱 데이터 갖고 와서 맨 앞에 넣어줌.
      // previousTodos?.unshift({
      //   id: Date.now().toString(), // unix 타임으로부터 현재 몇 ms 지났는가...unique 값 만들 수 있다. (임시 데이터)
      //   title: title,
      //   done: false,
      //   createdAt: '',
      //   updatedAt: '',
      //   order: 0
      // })
    },
    // 정상적으로 회신 받으면 실행됨
    onSuccess: (/* mutationFn의 리턴값을 인자로 받을 수 있다. */) => {
      // 서버에서 전체 데이터 다시 가져옴. (캐싱된거 가져오면 안되고, 항상 새로 가져와야함.)
      // queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: (
      _error,
      _title, // onMutate 로 들어오는 인자값
      previousTodos /* onMutate에서 반환한 값을 받을 수 있다. */
    ) => {
      // 캐싱 데이터를 이전 데이터로 다시 원복시켜줌.
      queryClient.setQueryData(['todos'], previousTodos)

      // 이미 낙관적 업데이트로 리스트에 넣어버린 데이터를 다시 삭제해야 함.
      // const previousTodos = queryClient.getQueryData<Todo[]>(['todos']) // 캐싱된 데이터만 가져옴.
      // previousTodos?.shift() // 맨 앞 데이터 삭제
    },
    onSettled: () => {}
  })
}

// todo 내용 수정
export function useUpdateTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (todo: Todo) => {
      const res = await fetch(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
        {
          method: 'PUT', // 전체 수정
          headers,
          // body: JSON.stringify(수정할 TODO 객체)
          body: JSON.stringify(todo)
        }
      )
      return await res.json()
    },
    onMutate: () => {},
    onSuccess: () => {
      // 캐시 되어 있는 것 무효화 하고 새로 가져와서 화면 업데이트
      queryClient.invalidateQueries({
        queryKey: ['todos']
      })
    },
    onError: () => {},
    onSettled: () => {}
  })
}

export function useDeleteTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (todo: Todo) => {
      await fetch(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
        {
          method: 'DELETE',
          headers
        }
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos']
      })
    }
  })
}
