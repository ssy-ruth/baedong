import dayjs from "dayjs";

const AttendanceSummary = ({ summary, date, showEdit = false, onEdit }) => {
  // ✅ summary 없으면 렌더하지 않음
  if (!summary) return null;

  return (
    <div className="border-b px-4 py-3 bg-white mt-2 flex items-start justify-between">
      <div>
        <h3 className="text-sm font-semibold mb-1">
          {date ? dayjs(date).format("YYYY년 MM월 DD일 출석") : "전체 출석"}
        </h3>

        <p className="text-xs text-gray-500">
          교사: {summary.teacher}명 | 리더: {summary.leader}명 | 학생:{" "}
          {summary.student}명
        </p>
        <p className="text-sm font-semibold mt-1">총 {summary.total}명</p>
      </div>

      {showEdit && (
        <button
          onClick={onEdit}
          className="bg-blue-600 text-white text-sm px-3 py-1 rounded flex items-center gap-1"
        >
          편집
        </button>
      )}
    </div>
  );
};

export default AttendanceSummary;
