import accordionBtn from "@/assets/common/icon-prev.svg";

const ClassAttendanceItem = ({ data, isActive, onToggle }) => {
  const arrowClasses = `
    w-5 transition-transform duration-300
    ${isActive ? "rotate-[90deg]" : "rotate-[-90deg]"}
  `;

  const contentClasses = `
    overflow-hidden transition-[max-height,padding] duration-500 ease-in-out
    ${isActive ? "max-h-40 py-2" : "max-h-0"}
  `;

  return (
    <li className="border-b border-gray-200">
      {/* 헤더 */}
      <div
        className="flex justify-between items-center px-3 py-3 cursor-pointer"
        onClick={() => onToggle(data.classId)}
      >
        <div>
          <p className="text-sm font-semibold">{data.className}</p>
          <p className="text-xs text-gray-500">
            출석: {data.attend.length}명 | 결석: {data.absent.length}명
          </p>
        </div>
        <img src={accordionBtn} className={arrowClasses} />
      </div>

      {/* 상세 */}
      <div className={contentClasses + " px-3 text-sm bg-gray-50"}>
        <p>
          <span className="font-semibold">출석:</span> {data.attend.join(", ")}
        </p>
        <p className="mt-1">
          <span className="font-semibold">결석:</span> {data.absent.join(", ")}
        </p>
      </div>
    </li>
  );
};

export default ClassAttendanceItem;
