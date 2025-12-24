import useCoreStore from "@/stores/useCoreStore";

// 전역 프로퍼티를 관리하는 공통 Util
const PropertyUtils = {
  // 속성을 가져오는 함수
  getProps: (key) => {
    const { property } = useCoreStore.getState();
    console.log("getProps", property, key, property.property[key]);

    return property.property[key];
  },
  // 속성값을 세팅하는 함수
  setProps: (newProperty) => {
    const { property, setProperty } = useCoreStore.getState();

    setProperty({
      ...property,
      ...newProperty,
    });
  },
};

export default PropertyUtils;
