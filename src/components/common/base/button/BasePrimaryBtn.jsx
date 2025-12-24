/**
 * 기본 버튼 컴포넌트
 *
 * @param {object} props - 컴포넌트 props
 * @param {string} props.text - 버튼 라벨
 * @param {() => void} props.onClick - 버튼 클릭 핸들러
 * @param {"full"|"half"} [props.width="full"] - 버튼 너비
 * @param {"primary"|"secondary"} [props.variant="primary"] - 버튼 타입
 * @param {boolean} [props.disabled=false] - 비활성화 여부
 * @param {string} [props.className=""] - 추가 커스텀 클래스
 *
 * @returns {JSX.Element} 버튼 UI
 */
const BasePrimaryBtn = ({
  text,
  onClick,
  width = "full",
  variant = "primary",
  disabled = false,
  className = "",
  type = "button",
}) => {
  const widthCls = width === "half" ? "w-1/2" : "w-full";
  const disabledCls = disabled ? "bg-gray-300 cursor-not-allowed" : "";

  // variant별 스타일 정의
  const variants = {
    primary: disabled
      ? "bg-gray-300 text-white border-0 cursor-not-allowed"
      : "bg-main text-white border-0",
    secondary: "bg-white text-black border border-[#aaa]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center items-center h-12 rounded-lg transition ${widthCls} ${variants[variant]} ${disabledCls} ${className}`}
    >
      {text}
    </button>
  );
};

export default BasePrimaryBtn;
