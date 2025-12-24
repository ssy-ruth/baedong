import ApiUtils from "@/utils/ApiUtils";
import { create } from "zustand";

/**
 * @description
 * 사용자 보유 씨앗과 열매, 미확인 알림 존재 여부를 관리하는 Zustand 전역 스토어
 * - seed: 보유한 씨앗 수
 * - fruit: 보유한 열매 수
 * - hasUnreadNoti: 읽지 않은 알림 존재 여부
 * - setSeed(value): seed 값 업데이트
 * - setFruit(value): fruit 값 업데이트
 * - setHasUnreadNoti(value): 알림 존재 여부 업데이트
 * - fetchUserSummary(): API로 사용자 요약 정보 가져오기
 */
const useHeaderStore = create((set) => ({
  seed: 0,
  fruit: 0,
  hasUnreadNoti: false,

  setSeed: (value) => set({ seed: value }),
  setFruit: (value) => set({ fruit: value }),
  setHasUnreadNoti: (value) => set({ hasUnreadNoti: value }),

  fetchUserSummary: async () => {
    try {
      const response = await ApiUtils.sendPost("/users/summary");
      const data = response.data;

      const newState = {
        seed: Number(data.seedCount) || 0,
        fruit: Number(data.fruitCount) || 0,
        hasUnreadNoti: Boolean(data.hasUnreadNoti) || false,
      };

      set(newState);
    } catch (err) {
      console.error("헤더 정보 불러오기 실패:", err);
    }
  },
}));

export default useHeaderStore;
