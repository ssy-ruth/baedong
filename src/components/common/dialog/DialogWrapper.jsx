import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// 다이얼로그를 감싸는 컴포넌트
const DialogWrapper = ({ children }) => {
  let lastFocusElement = null;
  const wrapperRef = useRef();

  useEffect(() => {
    lastFocusElement = document.activeElement;
    // console.log(wrapperRef.current.children[0]);
    wrapperRef.current?.firstElementChild?.focus?.();

    return () => {
      if (lastFocusElement) {
        lastFocusElement.focus();
      }
    };
  }, []);

  const portalRoot = document.getElementById("dialog-root");
  const content = <div ref={wrapperRef}>{children}</div>;

  // Layout 내부의 #dialog-root로 포털
  return portalRoot ? createPortal(content, portalRoot) : content;
};

export default DialogWrapper;
