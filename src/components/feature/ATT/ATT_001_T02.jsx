import { useState } from "react";
import dayjs from "dayjs";
import Calendar from "@/components/feature/ATT/Calendar";
import AttendanceSummary from "@/components/feature/ATT/AttendanceSummary";
import MonthlyAttendanceChart from "@/components/feature/ATT/MonthlyAttendanceChart";
import LongAbsenceList from "@/components/feature/ATT/LongAbsenceList";
import AttendanceEditor from "@/components/feature/ATT/AttendanceEditor";

/* ================= Mock Data ================= */

const monthlyAttendanceStatsMock = [
  { date: "2025-12-03", attendCount: 52 },
  { date: "2025-12-10", attendCount: 58 },
  { date: "2025-12-17", attendCount: 60 },
];

const longTermAbsentMock = [
  { id: 1, name: "홍길동", absentWeeks: 4 },
  { id: 2, name: "김영희", absentWeeks: 6 },
];

const dailyAttendanceMock = {
  "2025-12-24": {
    summary: {
      teacher: 1,
      leader: 1,
      student: 3,
      total: 5,
    },
    attend: ["홍길동", "김철수", "이순신"],
    absent: ["김영희", "박민수"],
    memo: "김영희 병결",
  },
};

const ATT001T02 = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [attendance, setAttendance] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  /** 날짜 선택 토글 */
  const handleDateSelect = (date) => {
    const formatted = dayjs(date).format("YYYY-MM-DD");

    setSelectedDate((prev) => {
      if (prev === formatted) {
        setAttendance(null);
        setIsEditMode(false);
        return null;
      }

      setAttendance(dailyAttendanceMock[formatted] ?? null);
      setIsEditMode(false);
      return formatted;
    });
  };

  const handleSave = () => {
    // TODO: API 저장
    setIsEditMode(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 📅 달력 (편집 중엔 숨김) */}
      {!isEditMode && (
        <Calendar
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          onMonthChange={(month) => {
            setCurrentMonth(month);
            setSelectedDate(null);
          }}
        />
      )}

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

      {/* ❌ 출석 정보 없음 */}
      {selectedDate && !attendance && (
        <div className="p-6 text-center text-gray-500">
          출석 정보가 없습니다.
        </div>
      )}

      {/* ✅ 출석 정보 있음 */}
      {selectedDate && attendance && (
        <>
          {/* 🔹 조회 모드 */}
          {!isEditMode && (
            <AttendanceSummary
              summary={attendance.summary}
              date={selectedDate}
              showEdit
              onEdit={() => setIsEditMode(true)}
            />
          )}

          {/* ✏️ 편집 모드 헤더 */}
          {isEditMode && (
            <div className="bg-white p-4 flex justify-between items-center mb-3">
              <h2 className="text-base font-bold">
                {dayjs(selectedDate).format("YYYY년 MM월 DD일")}
              </h2>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-1.5 rounded text-sm"
              >
                편집 완료
              </button>
            </div>
          )}

          {/* 출석/결석 리스트 */}
          <AttendanceEditor
            data={attendance}
            isEditMode={isEditMode}
            onChange={setAttendance}
          />
        </>
      )}
    </div>
  );
};

export default ATT001T02;
