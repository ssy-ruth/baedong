import React from "react";

/**
 * 날짜 버튼 + 승인/미승인 배지 컴포넌트
 * @param {Object} props
 * @param {string} props.dayString - YYYY-MM-DD
 * @param {number} props.dateNum - 날짜 숫자
 * @param {boolean} props.isToday
 * @param {boolean} props.isSelected
 * @param {string} props.colorClass
 * @param {boolean} props.isApproved
 * @param {boolean} props.isPending
 * @param {(dayString:string)=>void} props.onSelect
 */
const CalendarDay = ({
  dayString,
  dateNum,
  isToday,
  isSelected,
  colorClass,
  isApproved,
  isPending,
  onSelect,
}) => {
  const baseClass =
    "w-8 h-8 text-base flex items-center justify-center rounded-lg";

  const selectedClass = "bg-[#215BA0] text-white";
  const todayClass = "border border-[#215BA0] text-[#215BA0]";

  return (
    <div className="relative flex flex-col items-center">
      <button
        onClick={() => onSelect(dayString)}
        className={`
          ${baseClass}
          ${isSelected ? selectedClass : colorClass}
          ${!isSelected && isToday ? todayClass : ""}
        `}
      >
        {dateNum}
      </button>

      {isPending && (
        <span className="absolute -bottom-[21px] text-xs text-[#FF6C6C] bg-red-100 px-1 h-5 rounded">
          미승인
        </span>
      )}

      {isApproved && (
        <span className="absolute -bottom-[21px] text-xs text-[#3D8AFF] bg-blue-100 px-1 h-5 rounded">
          승인
        </span>
      )}
    </div>
  );
};

export default CalendarDay;
