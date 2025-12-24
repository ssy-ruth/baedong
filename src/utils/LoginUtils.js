import ApiUtils from "@/utils/ApiUtils";
import LayerUtils from "@/utils/LayerUtils";

export const loginService = async ({ empNum, password, rememberId }) => {
  try {
    await ApiUtils.sendPost("/users/login", { empNum, password });

    // LocalStorage 저장/삭제
    if (rememberId) {
      localStorage.setItem("savedUserId", empNum);
      localStorage.setItem("rememberIdChecked", "true");
    } else {
      localStorage.removeItem("savedUserId");
      localStorage.removeItem("rememberIdChecked");
    }

    return true;
  } catch (err) {
    await LayerUtils.showAlert({
      headline: err.message || "로그인에 실패했습니다. 다시 시도해주세요.",
    });
    return false;
  }
};
