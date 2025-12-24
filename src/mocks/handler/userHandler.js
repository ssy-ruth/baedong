import { http, HttpResponse } from "msw";
import meData from "@/mocks/data/user/meDummy.json";
import selectNameDummy from "@/mocks/data/user/selectNameDummy.json";
import selectPositionDummy from "@/mocks/data/user/selectPositionDummy.json";
import searchNameDummy from "@/mocks/data/user/searchNameDummy.json";
import searchDeptDummy from "@/mocks/data/user/searchDeptDummy.json";
import loginDummy from "@/mocks/data/user/loginDummy.json";
import initNameDummy from "@/mocks/data/user/initNameDummy.json";
import initSelectDummy from "@/mocks/data/user/initSelectDummy.json";
import homeHeaderDummy from "@/mocks/data/user/homeHeaderDummy.json";
import commonHeaderDummy from "@/mocks/data/user/commonHeaderDummy.json";

export const handlers = [
  // 마이페이지
  http.post("/user/me", async () => {
    await sleep(500);
    return HttpResponse.json(meData);
  }),

  // 생일자 조회
  http.post("/user/birthday", () => {
    return HttpResponse.json({
      statusCode: 200,
      code: "GET_BIRTHDAY_SUCCESS",
      data: ["김핑거", "박수달", "이주주"],
    });
  }),

  // 로그인
  http.post("/auth/login", async ({ request }) => {
    const body = await request.json();
    const { id, password } = body;

    const user = loginDummy.find((u) => u.id === id);

    if (!user) {
      return HttpResponse.json(
        { message: "유저를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    if (user.password !== password) {
      return HttpResponse.json(
        { message: "비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    return HttpResponse.json(
      {
        message: "로그인에 성공했습니다.",
        user: { id: user.id, name: user.name },
        token: "mock-token-12345",
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token="mock-token-12345"; Path=/; HttpOnly`,
        },
      }
    );
  }),

  // 로그아웃
  http.post("/auth/logout", () => {
    return HttpResponse.json(
      {
        message: "로그아웃에 성공했습니다.",
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=""; Path=/; HttpOnly`,
        },
      }
    );
  }),

  // 직원검색
  http.post("/user/select", async ({ request }) => {
    const body = await request.json();
    const { category, keyword } = body;
    if (!keyword) {
      return HttpResponse.json(initSelectDummy);
    }
    let data;
    if (category === "name") {
      data = selectNameDummy;
    } else {
      data = selectPositionDummy;
    }
    await sleep(500);
    return HttpResponse.json(data);
  }),

  // 임직원 검색
  http.post("/user/search", async ({ request }) => {
    const { category, keyword, deptId } = await request.json();
    // 이름 검색
    if (category === "name") {
      const data = keyword ? searchNameDummy : initNameDummy;
      await sleep(500);
      return HttpResponse.json(data);
    }

    // 부서 검색
    const data = deptId ? searchDeptDummy : initNameDummy;
    await sleep(500);
    return HttpResponse.json(data);
  }),

  // 홈 헤더 데이터
  http.post("/user/header/summary", async () => {
    await sleep(500);
    return HttpResponse.json(homeHeaderDummy);
  }),

  // 공통 헤더 데이터
  http.post("/user/header/balance", async () => {
    await sleep(500);
    return HttpResponse.json(commonHeaderDummy);
  }),
];

async function sleep(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
