import DialogAlert from "@/components/common/dialog/DialogAlert";
import DialogConfirm from "@/components/common/dialog/DialogConfirm";
import useLayerStore from "@/stores/useLayerStore";
import DialogBottomPopup from "@/components/common/dialog/DialogBottomPopup";
import DialogCenterPopup from "@/components/common/dialog/DialogCenterPopup";
import DialogFullPopup from "@/components/common/dialog/DialogFullPopup";

const LayerUtils = {
  // 얼럿창 띄우기
  showAlert: (props) => {
    return new Promise((resolve) => {
      const callbackFunc = (result) => {
        resolve(result);
      };

      const { addLayerList } = useLayerStore.getState();

      addLayerList({
        layerComponent: DialogAlert,
        callbackFunc,
        layerProps: props,
      });
    });
  },
  // 컨펌창 띄우기
  showConfirm: (props) => {
    return new Promise((resolve) => {
      const callbackFunc = (result) => {
        resolve(result);
      };

      const { addLayerList } = useLayerStore.getState();

      addLayerList({
        layerComponent: DialogConfirm,
        callbackFunc,
        layerProps: props,
      });
    });
  },
  // 센터 팝업 띄우기
  showCenterPopup: (ContentsComponent, data) => {
    return new Promise((resolve) => {
      const callbackFunc = (result) => {
        resolve(result);
      };

      const { addLayerList } = useLayerStore.getState();

      const PopupComponent = (layerProps) => {
        return (
          <DialogCenterPopup {...layerProps}>
            <ContentsComponent {...layerProps} />
          </DialogCenterPopup>
        );
      };

      addLayerList({
        layerComponent: PopupComponent,
        callbackFunc: callbackFunc,
        layerProps: {
          data,
        },
      });
    });
  },
  // 바텀 팝업 띄우기
  showBottomPopup: (ContentsComponent, data) => {
    return new Promise((resolve) => {
      const callbackFunc = (result) => {
        resolve(result);
      };

      const { addLayerList } = useLayerStore.getState();

      const PopupComponent = (layerProps) => {
        return (
          <DialogBottomPopup {...layerProps} data={data}>
            <ContentsComponent {...layerProps} data={data} />
          </DialogBottomPopup>
        );
      };

      addLayerList({
        layerComponent: PopupComponent,
        callbackFunc,
        layerProps: {
          data,
        },
      });
    });
  },
  // 풀 팝업 띄우기
  showFullPopup: (ContentsComponent, { title, data, isMenu = false }) => {
    return new Promise((resolve) => {
      const callbackFunc = (result) => {
        resolve(result);
      };

      const { addLayerList } = useLayerStore.getState();

      const PopupComponent = (layerProps) => {
        return (
          <DialogFullPopup {...layerProps}>
            <ContentsComponent {...layerProps} />
          </DialogFullPopup>
        );
      };

      addLayerList({
        layerComponent: PopupComponent,
        callbackFunc: callbackFunc,
        layerProps: {
          title,
          data,
          isMenu,
        },
      });
    });
  },
  // 다이얼로그 띄우기(풀, 바텀, 센터)
  showDialog: (data) => {
    const dialogFunc =
      data?.dialogType === "full"
        ? LayerUtils.showFullPopup
        : data?.dialogType === "center"
        ? LayerUtils.showCenterPopup
        : LayerUtils.showBottomPopup;

    return dialogFunc(data?.ContentsComponent, data?.data, data?.closeBtnYn);
  },
};

export default LayerUtils;
