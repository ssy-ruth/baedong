import { useEffect } from "react";
import useHeaderStore from "@/stores/useHeaderStore";
import BackBtn from "@/assets/common/backBtn.svg";
import CloseBtn from "@/assets/common/closeBtn.svg";
import BaseIconBtn from "@/components/common/base/button/BaseIconBtn";

/**
 * 공통 헤더 컴포넌트
 * @param {object} props
 * @param {"full"|"basic"|"close"} props.variant - 헤더 종류
 * @param {string} props.title - 타이틀
 * @param {function} [props.onClose] - 닫기(X) 버튼 동작
 */

/**
 * variant: "full" | "basic" | "close"
 *  - full  : ← + 타이틀 + 우측(씨앗/열매 아이콘 + 카운트)
 *  - basic : ← + 타이틀 (우측 없음)
 *  - close : ✕ + 타이틀 (모달/풀팝업 등)
 */

const Header = ({
  variant = "full",
  title,
  onClose,
  onClickSeed,
  onClickFruit,
}) => {
  const seed = useHeaderStore((state) => state.seed);
  const fruit = useHeaderStore((state) => state.fruit);
  const fetchUserSummary = useHeaderStore((state) => state.fetchUserSummary);

  useEffect(() => {
    if (variant === "full") fetchUserSummary();
  }, [fetchUserSummary, variant]);

  return (
    <header
      className="flex items-center w-full h-14 bg-main text-white sticky top-0 z-50"
      role="banner"
    >
      <div className="w-24 flex justify-start px-3">
        {variant === "close" ? (
          <BaseIconBtn
            type="button"
            icon={<img src={CloseBtn} alt="닫기 버튼" />}
            onClick={onClose}
            hasBorder={false}
          />
        ) : (
          <BaseIconBtn
            type="button"
            icon={<img src={BackBtn} alt="뒤로가기 버튼" />}
            onClick={onClose}
            hasBorder={false}
          />
        )}
      </div>

      <h1 className="flex-1 text-center text-[17px] font-extrabold tracking-tight">
        {title}
      </h1>
    </header>
  );
};

export default Header;
