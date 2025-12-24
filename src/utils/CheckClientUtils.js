import PropertyUtils from "@/utils/PropertyUtils";

// 사용자의 환경을 체크하는 공통 Util
const CheckClientUtils = {
  // 현재 OS 체크함수
  checkOS: () => {
    const userAgent = navigator.userAgent;

    if (!userAgent) return;

    const varUA = userAgent.toLowerCase();

    if (varUA?.indexOf("android") > -1) {
      return "Aos";
    } else if (
      varUA.indexOf("iphone") > -1 ||
      varUA.indexOf("ipad") > -1 ||
      varUA.indexOf("ipod") > -1
    ) {
      return "Ios";
    } else {
      return "Other";
    }
  },
  // 현재 os가 Aos인지 확인하는 함수
  isAos: () => {
    return PropertyUtils.getProps("nowOS") === "Aos";
  },
  // 현재 os가 Ios인지 확인하는 함수
  isIos: () => {
    return PropertyUtils.getProps("nowOS") === "Ios";
  },
  // 현재 os가 Web인지 확인하는 함수
  isPc: () => {
    return PropertyUtils.getProps("nowOS") === "Other";
  },
};

export default CheckClientUtils;
