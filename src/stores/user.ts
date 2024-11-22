import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// immer 사용
export const useUserStore = create(
  immer(
    combine(
      {
        user: {
          name: ' Neo',
          age: 22,
          isValid: true,
          address: {
            city: 'Suwon',
            emails: ['', '']
          }
        }
      },
      set => ({
        setUserEmail(email: string) {
          set(state => {
            state.user.address.emails[0] = email
          })
        }
      })
    )
  )
)

// export const useUserStore = create(
//     combine({
//         user: {
//             name:' Neo',
//             age: 22,
//             isValid: true,
//             emails: []
//         }
//     }, (set) => ({
//         setUserAge(age: number){
//             set(state => ({
//                 user: {
//                     ...state.user,  // 데이터가 중첩되면 set 할 때 복잡해짐 -> 다른 미들웨어 사용 필요!! => immer!!
//                     age
//                 }
//             }))
//         }
//     }))
// )
