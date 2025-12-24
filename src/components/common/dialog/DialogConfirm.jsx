import { useEffect, useRef } from "react";
import useLayerStore from "@/stores/useLayerStore";

/**
 * DialogConfirm
 * @param {object}   props
 * @param {number}   props.layerIndex   레이어 스택 인덱스
 * @param {Function} props.callbackFunc 확인/취소/닫힘 시 결과 콜백
 * @param {string}   props.headline     다이얼로그 상단 굵은 제목
 * @param {string}   props.subline      다이얼로그 부제목/설명
 */

const DialogConfirm = ({ layerIndex, callbackFunc, headline, subline }) => {
  const { layerList, removeLayerList } = useLayerStore();
  const lastIndex = layerList.length - 1;

  const confirmRef = useRef();

  const dialogClose = (result) => {
    removeLayerList(layerIndex);
    callbackFunc && callbackFunc(result);
  };

  //strict 모드 때문에 마운트->언마운트->마운트 돼서 만든 useEffect
  useEffect(() => {
    let firstMount = true;

    return () => {
      if (!firstMount) {
        callbackFunc && callbackFunc();
      }
      firstMount = false;
    };
  }, []);

  // useEffect(() => {
  //   return () => {
  //     if (isNotClosed) {
  //       callbackFunc && callbackFunc();
  //     }
  //   };
  // }, []);

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
      <div className="w-[82%] max-w-[360px] bg-white border border-gray-200 rounded-[20px] px-8 py-8">
        <div className="text-center">
          {headline && (
            <p className="text-lg font-semibold text-gray-900">{headline}</p>
          )}
          {subline && <p className="mt-3 text-sm text-gray-800">{subline}</p>}
        </div>
        <div className="flex gap-2">
          <button
            ref={confirmRef}
            type="button"
            onClick={() => dialogClose(false)}
            className={`mt-6 w-full rounded-full py-2.5 border border-gray-500 text-gray-500 font-semibold outline-none`}
          >
            취소
          </button>
          <button
            ref={confirmRef}
            type="button"
            onClick={() => dialogClose(true)}
            className={`mt-6 w-full rounded-full py-2.5 bg-main text-white font-semibold outline-none`}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogConfirm;
