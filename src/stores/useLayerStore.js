import { create } from "zustand";

// 레이어(풀, 바텀, 센터) 관리용 Store
const LayerStore = (set) => ({
  layerList: [],
  // 레이어를 여는 함수
  addLayerList: (action) =>
    set((state) => ({ layerList: [...state.layerList, action] })),
  // 원하는 인덱스의 레이어를 닫는 함수
  removeLayerList: (num) =>
    set((state) => {
      const tempList = [...state.layerList];
      tempList.splice(num, 1);

      return { layerList: tempList };
    }),
  // 마지막 레이어를 닫는 함수
  closeLastLayerList: () =>
    set((state) => {
      const tempList = [...state.layerList];
      tempList.pop();
      return { layerList: tempList };
    }),
  // 모든 레이어를 닫는 함수
  clearLayerList: () => set((state) => ({ layerList: [] })),
});

const useLayerStore = create(LayerStore);

export default useLayerStore;
