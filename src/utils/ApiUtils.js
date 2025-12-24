import axios from "axios";
import LayerUtils from "@/utils/LayerUtils";
import springProperty from "@/config/springProperty";

const ApiUtils = {
  //post 방식 통신을 위한 함수
  sendPost: (url, params, options = {}) => {
    return new Promise((resolve, reject) => {
      try {
        const finalUrl = ApiUtils.buildUrl(url);
        const config = ApiUtils.createRequestConfig(options?.headers);

        axios
          .post(finalUrl, params, config)
          .then((response) => {
            ApiUtils.afterProcess(url, resolve, reject, response, options);
          })
          .catch((error) => {
            ApiUtils.afterError(url, error, reject, options);
          });
      } catch (err) {
        ApiUtils.afterError(url, err, reject, options);
        throw err;
      }
    });
  },

  // URL 조립
  buildUrl: (url) => {
    const isAbsolute = /^https?:\/\//i.test(url);
    if (isAbsolute) return url;

    const mode = process.env.REACT_APP_ApiDomain || springProperty.mode;

    if (mode === "spring") {
      const base = springProperty.apiDomain.replace(/\/+$/, "");
      const path = String(url).replace(/^\/+/, "");
      return `${base}/${path}`;
    }

    // msw 모드
    if (mode === "msw") {
      return url.startsWith("/") ? url : `/${url}`;
    }
  },

  afterError: async (url, error, reject, options) => {
    const isAuthCheck = url.includes("/users/me"); // 로그인 체크 API 여부
    console.log("❌ API Error:", url, error);

    if (error.response) {
      const { status, data } = error.response;
      const message = data?.message || "일시적인 오류가 발생했습니다.";

      // /users/me 요청일 땐 alert 생략
      if (!isAuthCheck) {
        await LayerUtils.showAlert({ headline: message });
      }

      if (status === 401 || status === 403) {
        // /users/me일 땐 AuthProvider에서 리다이렉트 처리하므로 중복 방지
        if (!isAuthCheck) {
          window.location.href = "/";
        }
      }

      reject(data);
    } else if (error.request) {
      if (!isAuthCheck) {
        await LayerUtils.showAlert({
          headline: "서버 응답이 없습니다. 네트워크를 확인해주세요.",
        });
      }
      reject(error);
    } else {
      if (!isAuthCheck) {
        await LayerUtils.showAlert({
          headline: `요청 오류: ${error.message}`,
        });
      }
      reject(error);
    }
  },

  afterProcess: async (url, resolve, reject, response) => {
    const data = response.data;
    if (response.status !== 200 && response.status !== 204) {
      await LayerUtils.showAlert({
        headline: "일시적인 서비스 오류입니다.",
      });
      reject(data);
    } else {
      resolve(data);
    }
  },

  createRequestConfig: (headers) => ({
    withCredentials: true,
    headers: {
      ...headers,
    },
  }),
};

export default ApiUtils;
