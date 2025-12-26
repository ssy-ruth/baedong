import { useState } from "react";
import dayjs from "dayjs";
import Next from "@/assets/common/icon-next.svg";
import Prev from "@/assets/common/icon-prev.svg";
import CalendarDay from "@/components/feature/ATT/CalendarDay";

/**
 * @typedef {Object} CalendarProps
 * @property {string[]} [approvedDates] - 승인된 날짜 목록 (YYYY-MM-DD 형식)
 * @property {string[]} [pendingDates] - 미승인된 날짜 목록 (YYYY-MM-DD 형식)
 * @property {string} [selectedDate] - 부모에서 전달하는 선택된 날짜
 * @property {(dateString: string) => void} [onDateSelect] - 날짜 선택 시 호출되는 콜백
 * @property {(month: import("dayjs").Dayjs) => void} [onMonthChange] - 월 변경 시 호출되는 콜백 (dayjs 객체 전달)
 */

/**
 * 캘린더 컴포넌트
 * @param {CalendarProps} props
 */
const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const DAY_COLORS = ["text-red-500", "", "", "", "", "", "text-blue-500"];
const Calendar = ({
  approvedDates = [],
  pendingDates = [],
  selectedDate,
  onDateSelect,
  onMonthChange,
}) => {
  const today = dayjs();
  const [currentMonth, setCurrentMonth] = useState(today.month());
  const [currentYear, setCurrentYear] = useState(today.year());

  const handleMonthChange = (num) => {
    const newMonth = dayjs()
      .year(currentYear)
      .month(currentMonth)
      .add(num, "month");
    setCurrentMonth(newMonth.month());
    setCurrentYear(newMonth.year());

    onMonthChange?.(newMonth);
  };

  /** 달력 데이터 생성 */
  const generateCalendarData = () => {
    const firstDay = dayjs().year(currentYear).month(currentMonth).date(1);
    const firstWeekday = firstDay.day();
    const weeks = [];
    let date = 1 - firstWeekday;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        week.push(dayjs().year(currentYear).month(currentMonth).date(date));
        date++;
      }
      if (week.some((d) => d.month() === currentMonth)) weeks.push(week);
    }
    return weeks;
  };

  const calendarData = generateCalendarData();

  /** 각 날짜 버튼의 상태 계산 */
  const getDayProps = (day, weekdayIndex, isLastWeek) => {
    const dayString = day.format("YYYY-MM-DD");
    const isToday = day.isSame(today, "day") && day.month() === currentMonth;
    const isSelected = dayString === selectedDate;
    const isCurrentMonth = day.month() === currentMonth;
    const borderClass = isLastWeek && !isCurrentMonth ? "" : "border-b";
    const colorClass = DAY_COLORS[weekdayIndex];

    return {
      dayString,
      isToday,
      isSelected,
      isCurrentMonth,
      borderClass,
      colorClass,
    };
  };

  return (
    <div className="relative bg-white pt-6 px-4 text-center">
      {/* 달력 헤더 */}
      <div className="flex justify-center items-center gap-5 mb-4 text-[22px] font-bold">
        <span>
          {currentYear}년 {currentMonth + 1}월
        </span>
        <div className="absolute right-6 p-[14px] top-3 flex gap-2">
          <button onClick={() => handleMonthChange(-1)}>
            <img src={Prev} alt="이전 달" className="w-7 h-7" />
          </button>
          <button onClick={() => handleMonthChange(1)}>
            <img src={Next} alt="다음 달" className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* 달력 */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-sm text-gray-600">
            {WEEKDAYS.map((day, idx) => (
              <th key={idx} className={`font-light py-2 ${DAY_COLORS[idx]}`}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarData.map((week, weekIndex) => {
            const isLastWeek = weekIndex === calendarData.length - 1;

            return (
              <tr key={weekIndex}>
                {week.map((day, dayIndex) => {
                  const {
                    dayString,
                    isToday,
                    isSelected,
                    isCurrentMonth,
                    borderClass,
                    colorClass,
                  } = getDayProps(day, dayIndex, isLastWeek);

                  if (!isCurrentMonth) return <td key={dayIndex} />;

                  return (
                    <td
                      key={dayIndex}
                      className={`h-[58px] align-top pt-[2px] ${borderClass}`}
                    >
                      <CalendarDay
                        dayString={dayString}
                        dateNum={day.date()}
                        isToday={isToday}
                        isSelected={isSelected}
                        colorClass={colorClass}
                        isApproved={approvedDates.includes(dayString)}
                        isPending={pendingDates.includes(dayString)}
                        onSelect={onDateSelect}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
