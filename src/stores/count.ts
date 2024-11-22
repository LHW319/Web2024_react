import { create } from 'zustand'
import {
  combine,
  subscribeWithSelector,
  persist,
  createJSONStorage
} from 'zustand/middleware'

// persist 사용 - 페이지 새로고침하여 component 새로 로딩되어도 내부에서 사용하는 staterk 리셋되지 않고 남아있음.
// state가 local storage에서 관리됨.
// 액션(함수, 즉 increase, decrease)는 저장 X
// localStorage에서 다시 가져왔을떄는 더이상 반응형 데이터가 아님.
// store에서 관리하는 state는 다 반응형 데이터
export const useCouteStore = create(
  persist(
    // zustand에서 관리하는 상태를 local storage 등에 저장('countStore' 으로 저장됨.)
    subscribeWithSelector(
      combine(
        {
          count: 0,
          double: 0
        },
        (set, get) => {
          function increase() {
            set(state => ({
              count: state.count + 1,
              double: state.count * 2
            }))
          }
          function decrease() {
            set(state => ({
              count: state.count - 1,
              double: state.count * 2
            }))
          }
          return {
            increase,
            decrease
          }
        }
      )
    ),
    // persist 가 어떤 이름으로 저장될지 명시 (이 이름으로 localStorage에 저장됨.)
    {
      name: 'countStore'
      //   storage: createJSONStorage(() => sessionStorage)  // sessionStorage 사용하게 설정\
      // partialize 옵션 사용하면 state 중 특정 state만 저장하는 것 가능
    }
  )
)

////////////////////////////////구독 사용/////////////////////////////

// export const useCouteStore = create(
//   subscribeWithSelector(
//     combine(
//       {
//         count: 0,
//         double: 0
//       },
//       (set, get) => {
//         function increase() {
//           set(state => ({
//             count: state.count + 1,
//             double: state.count * 2
//           }))
//         }
//         function decrease() {
//           set(state => ({
//             count: state.count - 1,
//             double: state.count * 2
//           }))
//         }
//         return {
//           increase,
//           decrease
//         }
//       }
//     )
//   )
// )

// double을 매번 업데이트 해주지 않고, 상태 구독 사용
//useCouteStore.subscribe(선택자, 콜백)
useCouteStore.subscribe(
  state => {
    // 구독하려고 하는 데이터 반환 (double 입장에서는 count를 구독해야 count 변경될 때마다 double 갱신 가능(콜백 함수 실행 가능))
    return state.count
  },
  // 실행할 콜백 - 변경된 구독 데이터(count)의 값을 인자로 받는다.
  count => {
    // zustancd의 액션에서 사용하는 set 과 같은 개념의 함수
    useCouteStore.setState({
      double: count * 2
    })
  }
)

//////////////////////////////////////////////////////////////////////////////

// combine 적용 후 액션에서 다른 액션 호출 시 => 액션 분리
// export const useCouteStore = create(
//   combine(
//     {
//       count: 0,
//       double: 0
//     },
//     (set, get) => {
//       function increase() {
//         set(state => ({
//           count: state.count + 1,
//         }))
//         //   const state = get() // state 중 액션에 대한 타입이 지정되어 있지 않다!
//         //   state.updateDouble()
//         updateDouble()
//       }
//       //   function updateDouble() {
//       //     // count가 변경될 때마다 호출되어야 함.
//       //     set(state => ({
//       //       double: state.count * 2
//       //     }))
//       //   }
//       function decrease() {
//         set(state => ({
//           count: state.count - 1,
//         }))
//         updateDouble()
//       }
//       return {
//         increase,
//         decrease
//         updateDouble
//       }
//     }
//   )
// )

// combine 사용
// export const useCouteStore = create(
//   combine(
//     {
//       count: 0,
//       double: 0
//     },
//     (set, get) => ({
//       count: 0,
//       double: 0,
//       increase: () => {
//         set(state => ({
//           count: state.count + 1
//         }))
//         const state = get() // state 중 액션에 대한 타입이 지정되어 있지 않다!
//         state.increaseDouble()
//       },
//       increaseDouble: () => {
//         // count가 변경될 때마다 호출되어야 함.
//         set(state => ({
//           double: state.count * 2
//         }))
//       }
//     })
//   )
// )

// export const useCouteStore = create<{
//   count: number
//   double: number
//   increase: () => void
//   increaseDouble: () => void
// }>
// ((set, get) => ({
//   count: 0,
//   double: 0,
//   increase: () => {
//     set(state => ({
//       count: state.count + 1
//     }))

//     // increaseDouble() 호출하고 싶으면?
//     // 특정 액션이  다른 액션을 호출해야 하면 get으로 가져와서 액션을 꺼내서 호출하면 됨.
//     const state = get()
//     state.increaseDouble()
//   },
//   increaseDouble: () => {
//     // count가 변경될 때마다 호출되어야 함.
//     set(state => ({
//       double: state.count * 2
//     }))
//   }
// }))
