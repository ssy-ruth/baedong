/**
 * TabBtn - 단일 탭 버튼
 *
 * @param {object} props
 * @param {string} props.label - 탭에 표시할 텍스트
 * @param {boolean} props.active - 현재 활성 상태 여부
 * @param {() => void} props.onClick - 클릭 핸들러
 */
const BaseTabBtn = ({ label, active = true, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-1 flex-col items-center justify-center px-2 py-1 font-semibold text-base transition-colors ${
        active ? "text-main" : "text-gray-400"
      }`}
    >
      <span className="relative inline-block">{label}</span>
      <span
        className={`absolute left-1/2 -translate-x-1/2 -bottom-3 h-0.5 bg-main transition-all duration-200 ${
          active ? "w-full" : "w-0"
        }`}
      />
    </button>
  );
};

export default BaseTabBtn;
