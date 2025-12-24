import React from "react";

/**
 * 앱의 전체 페이지에 적용될 공통 레이아웃 컴포넌트
 * @param {object} props
 * @param {React.ReactNode} props.children - 레이아웃 내부에 표시될 페이지 컨텐츠
 */
const Layout = ({ children }) => {
  return (
    <div
      id="layout-root"
      //h-screen을 h-dvh로 변경
      className="relative mx-auto w-full min-w-[340px] max-w-[430px] h-dvh border border-gray-100 bg-gray-100 overflow-y-auto no-scrollbar"
    >
      <main className="min-h-dvh">{children}</main>
      <div id="dialog-root" />
    </div>
  );
};

export default Layout;
