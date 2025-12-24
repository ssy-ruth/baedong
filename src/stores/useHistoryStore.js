import { create } from "zustand";

// 히스토리 관리용 Store
const HistoryStore = (set) => ({
  historyList: [],
  nowPageParams: {},
  // 히스토리 적재(history - {url : string, params : any, preParams : any})
  addHistoryList: (history) =>
    set((state) => ({
      ...state,
      historyList: [...state.historyList, history],
    })),
  // 히스토리 삭제(원하는 만큼)
  removeHistoryList: (num) =>
    set((state) => ({
      ...state,
      historyList: state.historyList.slice(0, state.historyList.length - num),
    })),
  // 마지막 히스토리 삭제
  removeLastHistoryList: () =>
    set((state) => ({
      ...state,
      historyList: state.historyList.slice(0, state.historyList.length - 1),
    })),
  // 모든 히스토리 삭제
  clearHistoryList: () => set((state) => ({ ...state, historyList: [] })),
  // 현재 페이지 파라미터 세팅
  setNowPageParams: (params) =>
    set((state) => ({ ...state, nowPageParams: params })),
});

const useHistoryStore = create(HistoryStore);

export default useHistoryStore;
