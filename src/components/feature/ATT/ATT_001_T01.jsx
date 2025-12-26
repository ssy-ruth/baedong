import { useState } from "react";
import dayjs from "dayjs";
import Calendar from "@/components/feature/ATT/Calendar";
import AttendanceSummary from "@/components/feature/ATT/AttendanceSummary";
import ClassAttendanceList from "@/components/feature/ATT/ClassAttendanceList";
import MonthlyAttendanceChart from "@/components/feature/ATT/MonthlyAttendanceChart";
import LongAbsenceList from "@/components/feature/ATT/LongAbsenceList";

/* ================================
 * 📅 일별 출석 (날짜 선택 시)
 * ================================ */

const dailySummaryMock = {
  teacher: 13,
  leader: 10,
  student: 45,
  total: 68,
};

const dailyClassAttendanceMock = [
  {
    classId: 1,
    className: "홍길동T - 1학년 여",
    attend: ["홍길동", "김영희", "이순신"],
    absent: ["박철수", "최영"],
  },
  {
    classId: 2,
    className: "임꺽정T - 1학년 남",
    attend: ["김민수", "이민호", "정우성"],
    absent: ["장동건", "현빈"],
  },
];

/* ================================
 * 📊 월별 출석 통계 (날짜 미선택 시)
 * ================================ */

const monthlyAttendanceStatsMock = [
  { date: "2025-08-03", attendCount: 52 },
  { date: "2025-08-10", attendCount: 58 },
  { date: "2025-08-17", attendCount: 60 },
  { date: "2025-08-24", attendCount: 55 },
  { date: "2025-08-31", attendCount: 62 },
];

/* ================================
 * 🚫 장기 결석생
 * ================================ */

const longTermAbsentMock = [
  {
    memberId: 1,
    name: "홍길동",
    className: "1학년 남",
    absentWeeks: 4,
  },
  {
    memberId: 2,
    name: "김영희",
    className: "2학년 여",
    absentWeeks: 6,
  },
  {
    memberId: 3,
    name: "이순신",
    className: "3학년 남",
    absentWeeks: 8,
  },
];

const ATT001T01 = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeClassId, setActiveClassId] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  /** 날짜 선택 토글 */
  const handleDateSelect = (date) => {
    setSelectedDate((prev) => (prev === date ? null : date));
    setActiveClassId(null);
  };

  /** 반 아코디언 토글 */
  const handleToggleClass = (id) => {
    setActiveClassId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Calendar
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        onMonthChange={(month) => {
          setCurrentMonth(month);
          setSelectedDate(null);
        }}
      />

      {/* 📊 월별 통계 */}
      {!selectedDate && (
        <>
          <MonthlyAttendanceChart
            title={`${currentMonth.format("M")}월 출석 현황`}
            data={monthlyAttendanceStatsMock}
          />
          <LongAbsenceList items={longTermAbsentMock} />
        </>
      )}

      {/* 📅 일별 출석 */}
      {selectedDate && (
        <>
          <AttendanceSummary summary={dailySummaryMock} date={selectedDate} />
          <ClassAttendanceList
            classList={dailyClassAttendanceMock}
            activeClassId={activeClassId}
            onToggleClass={handleToggleClass}
          />
        </>
      )}
    </div>
  );
};

export default ATT001T01;
