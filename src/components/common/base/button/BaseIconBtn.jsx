/**
 * IconBtn 컴포넌트
 *
 * @param {object} props - 컴포넌트 props
 * @param {JSX.Element} props.icon - 버튼 안에 표시할 아이콘 요소
 * @param {() => void} props.onClick - 버튼 클릭 시 실행할 함수
 * @param {boolean} [props.hasBorder=true] - 버튼에 테두리를 표시할지 여부
 *
 * @returns {JSX.Element} 아이콘이 들어간 버튼 UI
 */
const BaseIconBtn = ({ icon, onClick, hasBorder = true, type }) => {
  return (
    <div
      className={`flex items-center justify-center w-8 h-8 px-1 rounded-[4px] ${
        hasBorder ? "border border-main" : ""
      }`}
    >
      <button type={type} onClick={onClick}>
        {icon}
      </button>
    </div>
  );
};
export default BaseIconBtn;
