const AttendanceSummary = ({ summary }) => {
  return (
    <div className="border-b px-4 py-3 bg-white">
      <h3 className="text-sm font-semibold mb-1">전체 출석</h3>
      <p className="text-xs text-gray-500">
        교사: {summary.teacher}명 | 리더: {summary.leader}명 | 학생:{" "}
        {summary.student}명
      </p>
      <p className="text-sm font-semibold mt-1">총 {summary.total}명</p>
    </div>
  );
};

export default AttendanceSummary;
