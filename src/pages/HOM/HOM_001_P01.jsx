import { useEffect, useState } from "react";

import dayjs from "dayjs";
import useCore from "@/hooks/useCore";
import ApiUtils from "@/utils/ApiUtils";
import LayerUtils from "@/utils/LayerUtils";

/*
파일명: HOM_001_P01.jsx
URL : /
화면명: 홈 화면
작성자: 신서연
********* 수정이력 ********
   날짜      변경내용
-------------------------------
2025-12-24  최초작성
*/

const formatDay = (today, day) =>
  `${today.format("YYYY-MM")}-${String(day).padStart(2, "0")}`;

const HOM001P01 = () => {
  return (
    <div className="relative min-h-dvh flex flex-col pb-28">
      <div className="bg-white"></div>
    </div>
  );
};

export default HOM001P01;
