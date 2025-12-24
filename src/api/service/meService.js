const { default: ApiUtils } = require("@/utils/ApiUtils");
/**
 * @description (서비스 로직) 마이페이지 정보 가져오는 함수
 * @returns {Promise<object>} - 마이페이지 처리된 결과
 */
const meService = async () => {
  try {
    const response = await ApiUtils.sendPost(`/users/me`);
    return response;
  } catch (error) {
    console.error("내 정보 조회 실패:", error);
    throw error;
  }
};
export default meService;
