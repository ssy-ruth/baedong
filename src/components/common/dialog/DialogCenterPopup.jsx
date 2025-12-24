import React, { useEffect, useRef } from "react";
import useLayerStore from "@/stores/useLayerStore";

const modalOverlay = {
  position: "absolute",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  width: "100%",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "1000",
};

const modalContent = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  background: "white",
  width: "80%",
  height: "80%" /* 화면의 높이의 절반까지만 늘어나도록 설정 */,
  overflowY: "auto" /* 내용이 넘칠 경우 스크롤 허용 */,
  padding: "20px",
  boxSizing: "border-box",
};

// 센터 팝업을 감싸는 컴포넌트
function DialogCenterPopup({ layerIndex, callbackFunc, children }) {
  const { layerList, removeLayerList } = useLayerStore();
  const lastIndex = layerList.length - 1;
  // 팝업 닫힘 여부 플래그
  let isNotClosed = true;
  const dialogRef = useRef();

  const dialogClose = (result) => {
    isNotClosed = false;

    removeLayerList(layerIndex);

    callbackFunc && callbackFunc(result);
  };

  useEffect(() => {
    return () => {
      if (isNotClosed) {
        callbackFunc && callbackFunc();
      }
    };
  }, []);

  return (
    <div
      ref={dialogRef}
      style={modalOverlay}
      aria-hidden={layerIndex === lastIndex ? "false" : "true"}
    >
      <div style={modalContent}>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { dialogClose });
        })}
      </div>
    </div>
  );
}

export default DialogCenterPopup;
