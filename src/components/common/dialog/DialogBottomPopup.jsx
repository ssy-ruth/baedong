import React, { useEffect, useRef } from "react";
import useLayerStore from "@/stores/useLayerStore";

/**
 * 바텀시트 팝업 컴포넌트
 *
 * @param {object} props - 컴포넌트 props
 * @param {number} props.layerIndex - 레이어 스택에서 현재 팝업의 인덱스
 * @param {function} [props.callbackFunc] - 팝업이 닫힐 때 호출되는 콜백 함수
 * @param {object} [props.data] - LayerUtils에서 내려주는 data
 * @param {React.ReactNode} props.children - 팝업 내부에 렌더링할 컴포넌트
 */
const DialogBottomPopup = ({ layerIndex, callbackFunc, data, children }) => {
  const { layerList, removeLayerList } = useLayerStore();
  const lastIndex = layerList.length - 1;
  const dialogRef = useRef(null);

  const dialogClose = (result) => {
    removeLayerList(layerIndex);
    callbackFunc?.(result);
  };

  useEffect(() => {
    const layout = document.getElementById("layout-root");
    if (layout) {
      const prev = layout.style.overflow;
      layout.style.overflow = "hidden";
      return () => {
        layout.style.overflow = prev || "auto";
      };
    }
  }, []);

  return (
    <div
      ref={dialogRef}
      className={`fixed mx-auto w-full max-w-[430px] inset-0 bg-black/50 flex justify-center items-end z-[1000] overflow-hidden 
        ${
          layerIndex === lastIndex
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
      aria-hidden={layerIndex === lastIndex ? "false" : "true"}
    >
      {/* 슬라이드 업 애니메이션 */}
      <div className="bg-white w-full rounded-t-[20px] box-border animate-slide-up">
        {React.isValidElement(children) &&
          React.cloneElement(children, { dialogClose, data })}
      </div>

      {/* keyframes 정의 */}
      <style>
        {`
          @keyframes slide-up {
            0% {
              transform: translateY(100%);
            }
            100% {
              transform: translateY(0);
            }
          }
          .animate-slide-up {
            animation: slide-up 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default DialogBottomPopup;
