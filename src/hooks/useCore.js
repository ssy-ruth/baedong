import { useNavigate } from "react-router-dom";
import useHistoryStore from "@/stores/useHistoryStore";
import menuDataJson from "@/routes/MenuInfo.json";

// 앱의 Core한 로직을 실행하기 위한 공통 Hook
const useCore = () => {
  const navigate = useNavigate();
  const {
    historyList,
    nowPageParams,
    addHistoryList,
    removeHistoryList,
    clearHistoryList,
    removeLastHistoryList,
    setNowPageParams,
  } = useHistoryStore();

  /**
   * 앞으로 페이지 이동 함수
   * @param menuId (string) - 이동할 페이지 menuId
   * @param params (object) - 이동할 페이지에 전달 할 파라미터 정보
   * @param options (num) - 페이지 이동시 특정 동작을 위한 옵션(-1 : 히스토리를 남기지 않고 이동)
   */
  const goForward = (menuId, params, options) => {
    if (options !== -1) {
      addHistoryList({
        url: window.location.pathname,
        params: nowPageParams || {},
        preParams: {},
      });
    }

    setNowPageParams({
      params: params || {},
      preParams: {},
    });

    const targetUrl = getMenuUrl(menuId);
    console.log(`네비게이션 시도: ${menuId} -> ${targetUrl}`); // 디버깅용

    // 탭 정보가 있으면 sessionStorage에 저장
    if (params?.tab) {
      sessionStorage.setItem("activeTab", params.tab);
    }

    navigate(targetUrl);
    //navigate(getMenuUrl(menuId));
  };

  /**
   * 뒤로 페이지 이동 함수
   * @param num (num) - 뒤로갈 페이지의 갯수
   * @param preParams  - 뒤로갈 페이지에 전달할 파라미터 정보
   */
  const goBack = (num = 1, preParams) => {
    let lastUrl = "";

    if (historyList.length >= num) {
      // 바로 직전 num번째 요소를 가져옴
      const prev = historyList[historyList.length - num];

      if (prev?.url) {
        lastUrl = prev.url;
        setNowPageParams({
          params: prev.params || {},
          preParams,
        });
      }

      removeHistoryList(num);
    } else {
      clearHistoryList();
      setNowPageParams({ params: {}, preParams });
    }

    navigate(lastUrl || "/");
  };

  /**
   * 현재 페이지의 파라미터 정보를 얻는 함수
   */
  const getPageParams = () => {
    return nowPageParams;
  };

  const getMenuUrl = (menuId) => {
    let menuUrl = "";

    for (let i = 0; i < menuDataJson.container.length; i++) {
      for (let j = 0; j < menuDataJson.container[i].urlList.length; j++) {
        if (menuDataJson.container[i].urlList[j].menuId === menuId) {
          menuUrl = menuDataJson.container[i].urlList[j].url;
        }
      }
    }

    return menuUrl;
  };

  return {
    goForward,
    goBack,
    getPageParams,
    getMenuUrl,
  };
};

export default useCore;
