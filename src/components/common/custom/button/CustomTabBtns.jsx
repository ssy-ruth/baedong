import BaseTabBtn from "@/components/common/base/button/BaseTabBtn";

/**
 * TabBtns - 여러 개 탭 버튼 그룹
 *
 * @param {object} props
 * @param {"two"|"three"} props.variant - 탭 개수 (2개/3개)
 * @param {string[]} props.labels - 탭에 표시할 텍스트 배열
 * @param {string} props.active - 현재 선택된 탭 라벨
 * @param {(label: string) => void} props.onChange - 탭 클릭 시 실행할 핸들러
 */

const CustomTabBtns = ({ variant = "two", labels, active, onChange }) => {
  const options = variant === "two" ? labels.slice(0, 2) : labels.slice(0, 3);

  return (
    <div className="flex w-full justify-around gap-2">
      {options.map((label, idx) => (
        <BaseTabBtn
          key={idx}
          label={label}
          active={active === label}
          onClick={() => onChange(label)}
        />
      ))}
    </div>
  );
};
export default CustomTabBtns;
