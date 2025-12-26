import { useEffect, useState } from "react";

import useCore from "@/hooks/useCore";
import Header from "@/components/common/layout/Header";
import CustomTabBtns from "@/components/common/custom/button/CustomTabBtns";

import ATT001T01 from "@/components/feature/ATT/ATT_001_T01";
import ATT001T02 from "@/components/feature/ATT/ATT_001_T02";

/*
파일명: HOM_001_P01.jsx
URL : /
화면명: 홈(출석체크) 화면
작성자: 신서연
********* 수정이력 ********
   날짜      변경내용
-------------------------------
2025-12-24  최초작성
*/

const ACTIVE_TAB = "activeTab";

const HOM001P01 = () => {
  const tabLabels = ["전체 출석", "우리반 출석"];
  const [activeTab, setActiveTab] = useState(() => {
    return sessionStorage.getItem(ACTIVE_TAB) || tabLabels[0];
  });
  const { goBack } = useCore();

  const onChange = (label) => {
    if (activeTab !== label) {
      setActiveTab(label);
      sessionStorage.setItem(ACTIVE_TAB, label);
    }
  };
  return (
    <div>
      <Header variant="full" title="출석 체크" />
      <div className="relative bg-white py-3">
        <CustomTabBtns
          variant="three"
          labels={tabLabels}
          active={activeTab}
          onChange={onChange}
        />
      </div>
      <section>
        {activeTab === tabLabels[0] && <ATT001T01 />}
        {activeTab === tabLabels[1] && <ATT001T02 />}
      </section>
    </div>
  );
};

export default HOM001P01;
