import { create } from "zustand";

// 히스토리 관리용 Store
const CoreStore = (set) => ({
  loading: 0,
  property: {},
  // 로딩 상태값 +1 하는 함수
  showLoading: () => set((state) => ({ ...state, loading: state.loading + 1 })),
  // 로딩 상태값 -1 하는 함수
  hideLoading: () =>
    set((state) => {
      const tempNum = state.loading - 1;

      if (tempNum < 0) {
        return { ...state, loading: 0 };
      } else {
        return { ...state, loading: tempNum };
      }
    }),
  // 전역 프로퍼티 세팅 함수
  setProperty: (property) => set((state) => ({ ...state, property: property })),
});

const useCoreStore = create(CoreStore);

export default useCoreStore;
