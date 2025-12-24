import { useRef } from "react";
import useLayerStore from "@/stores/useLayerStore";

/**
 * DialogAlert
 * @param {object}   props
 * @param {number}   props.layerIndex   레이어 스택 인덱스
 * @param {Function} props.callbackFunc 확인 클릭/닫힘 시 결과 콜백
 * @param {string}   props.headline     상단 굵은 첫 줄
 * @param {string}   props.subline      두 번째 줄
 */

// 얼럿을 감싸는 컴포넌트
const DialogAlert = ({ layerIndex, callbackFunc, headline, subline }) => {
  const { layerList, removeLayerList } = useLayerStore();
  const lastIndex = layerList.length - 1;
  // 팝업 닫힘 여부 플래그
  const isClosed = useRef(false);
  const confirmRef = useRef();

  const dialogClose = (result) => {
    if (isClosed.current) return;
    isClosed.current = true;
    removeLayerList(layerIndex);
    callbackFunc && callbackFunc(result);
  };

  return (
    <div
      className={`fixed max-w-[430px] inset-0 z-[1050] flex items-center justify-center mx-auto
                  ${
                    layerIndex === lastIndex
                      ? "pointer-events-auto"
                      : "pointer-events-none"
                  }
                  backdrop-blur-sm bg-black/10`}
      aria-hidden={layerIndex === lastIndex ? "false" : "true"}
      role="dialog"
    >
      <div className="w-[82%] max-w-[360px] bg-white border border-gray-200 rounded-[20px] px-7 py-9">
        <div className="text-center">
          {headline && (
            <p className="text-17 font-semibold text-gray-900">{headline}</p>
          )}
          {subline && <p className="mt-3 text-sm text-gray-800">{subline}</p>}
        </div>
        <button
          ref={confirmRef}
          type="button"
          onClick={() =>
            dialogClose({
              resultType: "dialog_confirm",
            })
          }
          className={`mt-6 w-full rounded-full py-2.5 bg-main text-white font-semibold outline-none`}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default DialogAlert;
