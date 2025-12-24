import DialogWrapper from "@/components/common/dialog/DialogWrapper";
import useLayerStore from "@/stores/useLayerStore";

/**
 * DialogFullPopup
 * 전체 화면을 덮는 풀팝업 다이얼로그 컴포넌트
 *
 * @param {object}   props
 * @param {number}   props.layerIndex   레이어 스택 인덱스
 * @param {Function} props.callbackFunc 팝업 닫힘 시 호출되는 콜백
 * @param {ReactNode} props.children    팝업 내부에 렌더링할 자식 컴포넌트
 */

const DialogComponent = () => {
  const { layerList } = useLayerStore();

  return (
    <>
      {layerList?.map(
        (item, index) =>
          item && (
            <DialogWrapper key={"dialog-" + index}>
              <item.layerComponent
                layerIndex={index}
                callbackFunc={item.callbackFunc}
                {...item.layerProps}
              />
            </DialogWrapper>
          )
      )}
    </>
  );
};

export default DialogComponent;
