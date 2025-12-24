import React, { useEffect, useRef } from "react";
import useLayerStore from "@/stores/useLayerStore";
import Header from "@/components/common/layout/Header";

const DialogFullPopup = ({
  layerIndex,
  callbackFunc,
  children,
  title = "",
  variant = "close",
  isMenu = false,
}) => {
  const { layerList, removeLayerList } = useLayerStore();
  const lastIndex = layerList.length - 1;

  let isNotClosed = true;
  const dialogRef = useRef(null);

  const dialogClose = (result) => {
    isNotClosed = false;
    removeLayerList(layerIndex);
    callbackFunc && callbackFunc(result);
  };

  //strict 모드 때문에 마운트->언마운트->마운트 돼서 만든 useEffect
  useEffect(() => {
    let firstMount = true;

    return () => {
      if (isNotClosed && !firstMount) {
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
      ref={dialogRef}
      className={`fixed w-full min-w-[370px] max-w-[430px] mx-auto inset-0 z-[1000] ${
        layerIndex === lastIndex ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={layerIndex === lastIndex ? "false" : "true"}
    >
      <div className="flex h-full w-full flex-col bg-white border border-gray-200">
        {!isMenu && (
          <Header
            variant={variant}
            title={title}
            onClose={() => dialogClose()}
          />
        )}

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {React.Children.map(children, (child) =>
            React.cloneElement(child, { dialogClose })
          )}
        </div>
      </div>
    </div>
  );
};

export default DialogFullPopup;
